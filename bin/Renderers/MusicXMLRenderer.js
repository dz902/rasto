import SVGEngraver from '../Engravers/SVGEngraver.js';
export class MusicXMLRenderer {
    static render(xmlString) {
        let engraver = SVGEngraver.create(600, 400);
        // element must be rendered to get item bounding box
        let element = engraver.print();
        document.body.appendChild(element);
        let musicXML = new MusicXMLRenderer(xmlString, engraver);
        document.body.removeChild(element);
        return musicXML;
    }
    get element() {
        return this.engraver.print();
    }
    constructor(dataString, engraver) {
        this.engraver = engraver;
        const $music = DOM.parse(dataString);
        const $scoreParts = $music.qq('score-partwise part-list score-part');
        let scoreParts = {};
        $scoreParts.each(($scorePart) => {
            const partName = $scorePart.q('part-name').value;
            if ($scorePart.id === '') {
                throw new Error('score-part does not have an ID');
            }
            else {
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
    typesetMeasure($measure) {
        this.engraver.engraveStaves(50);
        let measureAttr = {};
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
        this.engraver.engraveClef(measureAttr.clefSign, (measureAttr.clefLine - 1) * 2);
        this.engraver.engraveTimeSignature(measureAttr.timeBeats, measureAttr.timeBeatType);
        let beams = [];
        $measure.qq('note')
            .group(node => node.has('chord'))
            .forEach(($chord) => {
            let notes = [];
            $chord.each(($note, i) => {
                if ($note.has('rest')) {
                    return;
                }
                let note = {
                    pitchStep: $note.q('pitch step').value.toLowerCase(),
                    pitchOctave: nn($note.q('pitch octave').value),
                    duration: nn($note.q('duration').value),
                    type: $note.q('type').value
                };
                $note.has('beam', ($beams) => {
                    note.beams = [];
                    $beams.each(($beam) => {
                        let beam = {
                            number: nn($beam.attributes['number']),
                            type: ensureBeamType($beam.value)
                        };
                        note.beams.push(beam);
                    });
                });
                notes.push(note);
            });
            this.engraver.engraveChord(notes);
        });
        this.engraver.resetHead();
        this.engraver.moveHead(50);
        this.engraver.engraveBarLineSingle();
    }
    typesetChord($chord) {
    }
}
class DOM {
    static parse(dataString) {
        return new DOM(dataString);
    }
    static wrap(node) {
        return new DOM(node);
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
            return "";
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
        if (!this.noteAttributes) {
            this.noteAttributes = {};
            for (let i = 0; i < this.currentNode.attributes.length; ++i) {
                let attribute = this.currentNode.attributes.item(i);
                this.noteAttributes[attribute.name] = attribute.value;
            }
        }
        return this.noteAttributes;
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
        DOMCollection.wrap(this.currentNode.childNodes)
            .each(callback);
    }
}
class DOMCollection {
    constructor(nodes) {
        this.currentNodes = [];
        if (nodes instanceof NodeList) {
            nodes.forEach((node) => this.currentNodes.push(DOM.wrap(node)));
        }
        else {
            this.currentNodes = nodes;
        }
    }
    item(id) {
        return this.currentNodes[id];
    }
    each(callback) {
        for (let i = 0; i < this.currentNodes.length; ++i) {
            callback(this.currentNodes[i], i);
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
    static wrap(nodes) {
        return new DOMCollection(nodes);
    }
    static use(nodes) {
        return new DOMCollection(nodes);
    }
}
function nn(value) {
    let numValue = Number(value);
    if (Number.isNaN(numValue)) {
        throw new Error('value is not a number');
    }
    return numValue;
}
function ensureBeamType(type) {
    if (isBeamType(type)) {
        return type;
    }
    else {
        throw new Error(`type ${type} is not valid beam type`);
    }
}
function isBeamType(type) {
    return ['begin', 'continue', 'end'].indexOf(type) !== -1;
}
//# sourceMappingURL=MusicXMLRenderer.js.map