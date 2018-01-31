import { SVGEngraver} from '../Engravers/SVGEngraver.js';
import { Attributes, Score, Part, Measure, Mark, Chord, Note, Rest, Beam } from '../Schema/Music.js';
import { ChordGlyph } from '../Engravers/SVGEngraver/Glyphs.js';

export class MusicXMLParser {
    private $music: DOM;
    private rawScore: Score;

    static parse(xmlString: string): Score {
        let parser = new MusicXMLParser(xmlString);

        return parser.rawScore;
    }

    get score(): Score {
        return this.rawScore;
    }

    private constructor(dataString: string) {
        this.$music = DOM.parse(dataString);

        this.parseScore();
        this.parseParts();
    }

    private parseScore(): void {
        this.rawScore = new Score();

        let $scoreParts = this.$music.qq('score-partwise part-list score-part');

        $scoreParts.each(($sp) => {
            let partName = $sp.q('part-name').value;

            if ($sp.id === '') {
                throw new Error('score-part does not have an ID');
            } else {
                let part = new Part($sp.id, partName);

                this.rawScore.parts.push(part);
            }
        });
    }

    private parseParts(): void {
        let $parts = this.$music.qq('score-partwise part');

        $parts.each(($part, i) => {
            $part.qq('measure')
                 .each(($measure) => {
                     let measure = this.extractMeasure($measure);

                     this.rawScore.parts[i!].measures.push(measure);
                 });
        });
    }

    private extractMeasure($measure: DOM): Measure {
        let measure: Measure = new Measure();

        $measure.qq('attributes, note')
                .each(($element) => {
                    if ($element.name === 'attributes') {
                        measure.addAttributes($measure.collectAttributes($element));

                        return;
                    }

                    let $note: DOM = $element;

                    let markIsRest = $note.has('rest');

                    if (markIsRest) {
                        measure.addMark(new Rest(measure.currentAttributes));
                    } else {
                        let markIsNotChordNote = !$note.has('chord');
                        let lastMark = measure.marks[measure.marks.length-1];
                        let lastMarkIsNotChord = !(lastMark instanceof Chord);

                        if (markIsNotChordNote || lastMarkIsNotChord) {
                            lastMark = new Chord($note.q('type').value, measure.currentAttributes);
                            measure.addMark(lastMark);
                        }

                        (<Chord> lastMark).notes.push(new Note($note.q('type').value,
                                                               $note.q('pitch octave').value,
                                                               $note.q('pitch step').value,
                                                               $note.q('duration').value));
                    }
                });

        return measure;
    }
}

class DOM {
    private currentNode: Element | Document;
    private rawAttributes: Attributes;

    static parse(dataString: string): DOM {
        return new DOM(dataString);
    }

    static wrap(element: Element): DOM {
        return new DOM(element);
    }

    private constructor(x: string | Element) {
        if (x instanceof Element) {
            this.currentNode = x;
        } else {
            this.currentNode = (new DOMParser()).parseFromString(x, 'application/xml');
        }
    }

    get element(): Element | Document {
        return this.currentNode;
    }

    get id(): string {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;

            if (id === '') {
                throw new Error('empty id');
            }

            return id;
        }

        throw new Error('document does not have ids');
    }

    get value(): string {
        let value = this.currentNode.textContent;

        if (value === null) {
            return '';
        }

        return value;
    }

    get name(): string {
        return this.currentNode.nodeName.toLowerCase();
    }

    get attributes(): Attributes {
        if (this.currentNode instanceof Document) {
            throw new Error('cannot get document attribute');
        }

        if (!this.rawAttributes) {
            this.rawAttributes = {};

            for (let i = 0; i < this.currentNode.attributes.length; ++i) {
                let attribute = this.currentNode.attributes.item(i);
                this.rawAttributes[attribute.name] = attribute.value;
            }
        }

        return this.rawAttributes;
    }

    q(selector: string): DOM {
        let result = this.currentNode.querySelector(selector);

        if (result === null) {
            throw new Error(`selector "${selector}" has no matches`);
        } else {
            return DOM.wrap(result);
        }
    }

    qq(selector: string): DOMCollection {
        let result = this.currentNode.querySelectorAll(selector);

        if (result.length === 0) {
            throw new Error(`selector "${selector}" has no matches`);
        }

        return DOMCollection.wrap(result);
    }

    has(childNodeName: string, callback?: (node: DOMCollection) => void): boolean {
        try {
            let node = this.qq(childNodeName);

            if (callback) {
                callback(node);
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    eachChild(callback: (node: DOM) => void): void {
        DOMCollection.wrap(this.currentNode.children)
                     .each(callback);
    }

    collectAttributes($attributes: DOM): Attributes {
        let collectNestedAttributes = ($a: DOM, prefix: string = ''): Attributes => {
            let attrs: Attributes = {};

            $a.eachChild(($nestedA) => {
                let prefixedName = prefix + ' ' + $nestedA.name;

                if ($nestedA.element.children.length > 0) {
                    attrs = {...attrs, ...collectNestedAttributes($nestedA, prefixedName)};
                } else {
                    prefixedName = prefixedName.trim()
                                               .split(/[\-\s\/]/)
                                               .map(v => v[0].toUpperCase() + v.substr(1).toLowerCase())
                                               .join('');
                    prefixedName = prefixedName[0].toLowerCase() + prefixedName.substr(1);

                    attrs[prefixedName] = $nestedA.value;
                }
            });

            return attrs;
        };

        return collectNestedAttributes($attributes);
    }
}


class DOMCollection {
    private currentElements: DOM[] = [];

    item(id: number): DOM {
        return this.currentElements[id];
    }

    each(callback: (element: DOM, index?: number) => void) {
        for (let i = 0; i < this.currentElements.length; ++i) {
            callback(this.item(i), i);
        }
    }

    group(callback: (node: DOM) => boolean): DOMCollection[] {
        let groups: DOMCollection[] = [];
        let currentGroup: DOM[] = [];

        let splitGroup = () => {
            let itemsInGroup = currentGroup.length > 0;

            if (itemsInGroup) {
                groups.push(DOMCollection.use(currentGroup));
                currentGroup = [];
            }
        };

        this.each((node) => {
            let nodeIsUngroupable = !callback(node);

            if (nodeIsUngroupable) {
                splitGroup();
            }

            currentGroup.push(node);
        });

        splitGroup();

        return groups;
    }

    static wrap(elements: HTMLCollection | NodeListOf<Element>): DOMCollection {
        return new DOMCollection(elements);
    }

    static use(elements: DOM[]): DOMCollection {
        return new DOMCollection(elements);
    }

    private constructor(elements: HTMLCollection | NodeListOf<Element> | DOM[]) {
        if (elements instanceof HTMLCollection || elements instanceof NodeList) {
            for (let i = 0; i < elements.length; ++i) {
                let element = elements[i];
                this.currentElements.push(DOM.wrap(<Element> element));
            }
        } else {
            this.currentElements = elements;
        }
    }
}
