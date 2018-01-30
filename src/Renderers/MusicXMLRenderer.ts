import { SVGEngraver, ChordGlyph } from '../Engravers/SVGEngraver.js';
import { Measure, Mark, Chord, Note, Rest, NoteRest, Beam } from '../Schema/Music.js';

export class MusicXMLRenderer {
    private music: DOM;
    private engraver: SVGEngraver;

    static render(xmlString: string): MusicXMLRenderer {
        let engraver = SVGEngraver.create(600, 400);

        // element must be rendered to get item bounding box

        let element = engraver.print();

        document.body.appendChild(element);

        let musicXML = new MusicXMLRenderer(xmlString, engraver);

        document.body.removeChild(element);

        return musicXML;
    }

    get element(): Element {
        return this.engraver.print();
    }

    private constructor(dataString: string, engraver: SVGEngraver) {
        this.engraver = engraver;

        const $music = DOM.parse(dataString);
        const $scoreParts = $music.qq('score-partwise part-list score-part');

        let scoreParts: { [i: string]: string } = {};
        $scoreParts.each(($scorePart) => {
            const partName = $scorePart.q('part-name').value;

            if ($scorePart.id === '') {
                throw new Error('score-part does not have an ID');
            } else {
                scoreParts[$scorePart.id] = partName;
            }
        });

        const $parts = $music.qq('score-partwise part');
        $parts.each(($part) => {
            $part.qq('measure')
                 .each(($measure) => {
                     this.typesetMeasure($measure);
                 });
        });

    }

    private typesetMeasure($measure: DOM): void {
        this.engraver.engraveStaves(50);

        let measureAttr: { [key: string]: any } = {};

        $measure.q('attributes')
                .eachChild(($attr) => {
                    switch ($attr.name) {
                        case 'divisions':
                            measureAttr.divisions = nn($attr.value);
                            break;
                        case 'time':
                            measureAttr.timeBeats = nn($attr.q('beats').value);
                            measureAttr.timeBeatType = nn($attr.q('beat-type').value);
                            break;
                        case 'clef':
                            measureAttr.clefSign = $attr.q('sign').value;
                            measureAttr.clefLine = nn($attr.q('line').value);
                            break;
                    }
                });

        let measureAttributes = $measure.collectAttributes();
        let measure: Measure = new Measure(measureAttributes['divisions'],
                                           measureAttributes['time/beats'],
                                           measureAttributes['time/beat-type'],
                                           measureAttributes['clef/sign'],
                                           measureAttributes['clef/line']);

        this.engraver.engraveClef(measure.clefSign, (measure.clefLine - 1) * 2);
        this.engraver.engraveTimeSignature(measure.timeBeats, measure.timeBeatType);

        $measure.qq('note')
                .each(($note) => {
                    let note: NoteRest;

                    if ($note.has('rest')) {
                        note = new Rest();
                    } else {
                        note = new Note($note.q('type').value,
                                        $note.q('pitch octave').value,
                                        $note.q('pitch step').value,
                                        $note.q('duration').value,
                                        $note.has('chord'));

                        $note.has('beam', ($beams) => {
                            $beams.each(($beam) => {
                                let beam: Beam = new Beam(
                                    $beam.attributes['number'],
                                    $beam.value
                                );

                                (note as Note).addBeam(beam);
                            });
                        });
                    }

                    measure.addNote(note);
                });

        measure.marks.forEach((mark: Mark) => {
            if (mark instanceof Chord) {
                let x = new ChordGlyph(mark);
                console.log(x);
                this.engraver.print().appendChild(x.element);
            }
        })

        this.engraver.resetHead();
        this.engraver.moveHead(50);
        this.engraver.engraveBarLineSingle();
    }
}

class DOM {
    private currentNode: Element | Document;
    private noteAttributes: Attributes;

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

        if (!this.noteAttributes) {
            this.noteAttributes = {};

            for (let i = 0; i < this.currentNode.attributes.length; ++i) {
                let attribute = this.currentNode.attributes.item(i);
                this.noteAttributes[attribute.name] = attribute.value;
            }
        }

        return this.noteAttributes;
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

    collectAttributes(): Attributes {
        let attrs: Attributes = {};

        let collectNestedAttributes = ($a: DOM, prefix: string = ''): void => {
            $a.eachChild(($nestedA) => {
                console.log($nestedA.element);
                if ($nestedA.element.children.length > 0) {
                    Object.assign(attrs, collectNestedAttributes($nestedA, $nestedA.name + '/'));
                } else {
                    attrs[prefix + $nestedA.name] = $nestedA.value;
                }
            });
        };

        collectNestedAttributes(this.q('attributes'));

        return attrs;
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

function nn(value: any): number {
    let numValue = Number(value);

    if (Number.isNaN(numValue)) {
        throw new Error('value is not a number');
    }

    return numValue;
}

export interface Attributes {
    [k: string]: string;
}