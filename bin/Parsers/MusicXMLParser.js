"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Music_1 = require("../Schema/Music");
class MusicXMLParser {
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
        this.rawScore = new Music_1.Score();
        let $scoreParts = this.$music.qq('score-partwise part-list score-part');
        $scoreParts.each(($sp) => {
            let partName = $sp.q('part-name').value;
            if ($sp.id === '') {
                throw new Error('score-part does not have an ID');
            }
            else {
                let part = new Music_1.Part($sp.id, partName);
                this.rawScore.parts.push(part);
            }
        });
    }
    parseParts() {
        let $parts = this.$music.qq('score-partwise part');
        $parts.each(($part, i) => {
            let currentContext;
            $part.qq('measure')
                .each(($measure) => {
                let measure;
                measure = this.extractMeasure($measure, currentContext);
                this.rawScore.parts[i].measures.push(measure);
                if (measure.currentContext !== undefined) {
                    currentContext = measure.currentContext;
                }
            });
        });
    }
    extractMeasure($measure, currentContext) {
        let measure = new Music_1.Measure();
        $measure.qq('attributes, note')
            .each(($element) => {
            if ($element.name === 'attributes') {
                measure.setContext($element.collectAttributeElements());
                currentContext = measure.currentContext;
                return;
            }
            if (currentContext === undefined) {
                throw new Error();
            }
            let $note = $element;
            let markIsRest = $note.has('rest');
            if (markIsRest) {
                measure.addMark(new Music_1.Rest(currentContext));
            }
            else {
                let markIsNotChordNote = !$note.has('chord');
                let lastMark = measure.marks[measure.marks.length - 1];
                let lastMarkIsNotChord = !(lastMark instanceof Music_1.Chord);
                if (markIsNotChordNote || lastMarkIsNotChord) {
                    lastMark = new Music_1.Chord($note.q('type').value, currentContext);
                    measure.addMark(lastMark);
                }
                // processNote
                let noteAttributes = $note.collectAttributeElements();
                let note = new Music_1.Note(noteAttributes['type'], Music_1.ensureNumber(noteAttributes['pitchOctave']), noteAttributes['pitchStep'], Music_1.maybeThen(noteAttributes['pitchAlter'], Music_1.ensureNumber), Music_1.ensureNumber(noteAttributes['duration']));
                $note.has('beam', ($beams) => {
                    $beams.each(($beam) => {
                        note.addBeam(new Music_1.Beam($beam.attributes['number'], $beam.value));
                    });
                });
                $note.hasOne('accidental', ($accidental) => {
                    let accidentalType = $accidental.value.split(/-/).map(Music_1.toCamelCase).join('');
                    if (accidentalType === 'flatFlat') {
                        accidentalType = 'doubleFlat'; // bad naming taste for MusicXML
                    }
                    let accidental = new Music_1.Accidental(accidentalType);
                    note.addAccidental(accidental);
                });
                let chord = lastMark;
                chord.addNote(note);
            }
        });
        return measure;
    }
}
exports.MusicXMLParser = MusicXMLParser;
class DOM {
    constructor(x) {
        this.rawAttributes = {};
        if (x instanceof Element) {
            this.currentNode = x;
        }
        else {
            this.currentNode = (new DOMParser()).parseFromString(x, 'application/xml');
        }
    }
    static parse(dataString) {
        return new DOM(dataString);
    }
    static wrap(element) {
        return new DOM(element);
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
    hasOne(childNodeName, callback) {
        let hasExactlyOne = false;
        this.has(childNodeName, ($nodes) => {
            if ($nodes.length === 1) {
                hasExactlyOne = true;
                if (callback) {
                    callback($nodes.item(0));
                }
            }
        });
        return hasExactlyOne;
    }
    eachChild(callback) {
        DOMCollection.wrap(this.currentNode.children)
            .each(callback);
    }
    collectAttributeElements() {
        let $attributes = this;
        let collectNestedAttributes = ($a, prefix = '') => {
            let attrs = {};
            $a.eachChild(($nestedA) => {
                let prefixedName = prefix + ' ' + $nestedA.name;
                if ($nestedA.element.children.length > 0) {
                    attrs = Object.assign({}, attrs, collectNestedAttributes($nestedA, prefixedName));
                }
                else {
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
    static wrap(elements) {
        return new DOMCollection(elements);
    }
    static use(elements) {
        return new DOMCollection(elements);
    }
    get length() {
        return this.currentElements.length;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVzaWNYTUxQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvUGFyc2Vycy9NdXNpY1hNTFBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUd5QjtBQUV6QjtJQUlJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBaUI7UUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxZQUFvQixVQUFrQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUU1QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRXhFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNyQixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV4QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxZQUFJLENBQUMsR0FB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