import { Score, Part, Measure, Note, Rest, Beam } from '../Schema/Music.js';
export class MusicXMLParser {
    static parse(xmlString) {
        let parser = new MusicXMLParser(xmlString);
        return parser.rawScore;
    }
    get score() {
        return this.rawScore;
    }
    constructor(dataString) {
        this.$music = DOM.parse(dataString);
        this.parseScore();
        this.parseParts();
    }
    parseScore() {
        this.rawScore = new Score();
        let $scoreParts = this.$music.qq('score-partwise part-list score-part');
        $scoreParts.each(($sp) => {
            let partName = $sp.q('part-name').value;
            if ($sp.id === '') {
                throw new Error('score-part does not have an ID');
            }
            else {
                let part = new Part($sp.id, partName);
                this.rawScore.parts.push(part);
            }
        });
    }
    parseParts() {
        let $parts = this.$music.qq('score-partwise part');
        $parts.each(($part, i) => {
            $part.qq('measure')
                .each(($measure) => {
                let measure = this.extractMeasure($measure);
                this.rawScore.parts[i].measures.push(measure);
            });
        });
    }
    extractMeasure($measure) {
        let measureAttributes = $measure.collectAttributes();
        let measure = new Measure(measureAttributes['divisions'], measureAttributes['time/beats'], measureAttributes['time/beat-type'], measureAttributes['clef/sign'], measureAttributes['clef/line']);
        $measure.qq('note')
            .each(($note) => {
            let note;
            if ($note.has('rest')) {
                note = new Rest();
            }
            else {
                note = new Note($note.q('type').value, $note.q('pitch octave').value, $note.q('pitch step').value, $note.q('duration').value, $note.has('chord'));
                $note.has('beam', ($beams) => {
                    $beams.each(($beam) => {
                        let beam = new Beam($beam.attributes['number'], $beam.value);
                        note.addBeam(beam);
                    });
                });
            }
            measure.addNote(note);
        });
        return measure;
    }
}
class DOM {
    static parse(dataString) {
        return new DOM(dataString);
    }
    static wrap(element) {
        return new DOM(element);
    }
    constructor(x) {
        if (x instanceof Element) {
            this.currentNode = x;
        }
        else {
            this.currentNode = (new DOMParser()).parseFromString(x, 'application/xml');
        }
    }
    get element() {
        return this.currentNode;
    }
    get id() {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;
            if (id === '') {
                throw new Error('empty id');
            }
            return id;
        }
        throw new Error('document does not have ids');
    }
    get value() {
        let value = this.currentNode.textContent;
        if (value === null) {
            return '';
        }
        return value;
    }
    get name() {
        return this.currentNode.nodeName.toLowerCase();
    }
    get attributes() {
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
    q(selector) {
        let result = this.currentNode.querySelector(selector);
        if (result === null) {
            throw new Error(`selector "${selector}" has no matches`);
        }
        else {
            return DOM.wrap(result);
        }
    }
    qq(selector) {
        let result = this.currentNode.querySelectorAll(selector);
        if (result.length === 0) {
            throw new Error(`selector "${selector}" has no matches`);
        }
        return DOMCollection.wrap(result);
    }
    has(childNodeName, callback) {
        try {
            let node = this.qq(childNodeName);
            if (callback) {
                callback(node);
            }
        }
        catch (e) {
            return false;
        }
        return true;
    }
    eachChild(callback) {
        DOMCollection.wrap(this.currentNode.children)
            .each(callback);
    }
    collectAttributes() {
        let attrs = {};
        let collectNestedAttributes = ($a, prefix = '') => {
            $a.eachChild(($nestedA) => {
                console.log($nestedA.element);
                if ($nestedA.element.children.length > 0) {
                    Object.assign(attrs, collectNestedAttributes($nestedA, $nestedA.name + '/'));
                }
                else {
                    attrs[prefix + $nestedA.name] = $nestedA.value;
                }
            });
        };
        collectNestedAttributes(this.q('attributes'));
        return attrs;
    }
}
class DOMCollection {
    constructor(elements) {
        this.currentElements = [];
        if (elements instanceof HTMLCollection || elements instanceof NodeList) {
            for (let i = 0; i < elements.length; ++i) {
                let element = elements[i];
                this.currentElements.push(DOM.wrap(element));
            }
        }
        else {
            this.currentElements = elements;
        }
    }
    item(id) {
        return this.currentElements[id];
    }
    each(callback) {
        for (let i = 0; i < this.currentElements.length; ++i) {
            callback(this.item(i), i);
        }
    }
    group(callback) {
        let groups = [];
        let currentGroup = [];
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
    static wrap(elements) {
        return new DOMCollection(elements);
    }
    static use(elements) {
        return new DOMCollection(elements);
    }
}
//# sourceMappingURL=MusicXMLParser.js.map