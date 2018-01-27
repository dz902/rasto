import SVGEngraver from "../Engravers/SVGEngraver.js";
export default class MusicXML {
    get element() {
        return this.engraver.print();
    }
    constructor(dataString) {
        this.engraver = new SVGEngraver(600, 400);
        // element must be rendered to get item bounding box
        let element = this.engraver.print();
        document.body.appendChild(element);
        const $music = DOM.parse(dataString);
        const $scoreParts = $music.qq("score-partwise part-list score-part");
        let scoreParts = {};
        $scoreParts.each(($scorePart) => {
            const partName = $scorePart.q('part-name').value;
            if ($scorePart.id === "") {
                throw new Error("score-part does not have an ID");
            }
            else {
                scoreParts[$scorePart.id] = partName;
            }
        });
        const $parts = $music.qq("score-partwise part");
        $parts.each(($part) => {
            $part.qq("measure")
                .each(($measure) => {
                this.typesetMeasure($measure);
            });
        });
        document.body.removeChild(element);
    }
    typesetMeasure($measure) {
        this.engraver.engraveStaves(50);
        let measureAttr = {};
        $measure.q("attributes")
            .eachChild(($attr) => {
            switch ($attr.name) {
                case "divisions":
                    measureAttr.divisions = $attr.numericValue;
                    break;
                case "time":
                    measureAttr.timeBeats = $attr.q("beats").numericValue;
                    measureAttr.timeBeatType = $attr.q("beat-type").numericValue;
                    break;
                case "clef":
                    measureAttr.clefSign = $attr.q("sign").value;
                    measureAttr.clefLine = $attr.q("line").numericValue;
                    break;
            }
        });
        this.engraver.engraveClef(measureAttr.clefSign, (measureAttr.clefLine - 1) * 2);
        this.engraver.moveHead(8);
        this.engraver.engraveTimeSignature(measureAttr.timeBeats, measureAttr.timeBeatType);
        this.engraver.moveHead(8);
        let staffBottomPitch = 34;
        if (measureAttr.clefSign === "f") {
            staffBottomPitch = 31;
        }
        const stepNames = "cdefgab";
        $measure.qq("note")
            .group(node => node.has("chord"))
            .forEach(($chord) => {
            let firstStaffPlace = 0;
            let lastStaffPlace = 0;
            let noteWidth = 0;
            let needsStem = false;
            let stemTopStaffPlace;
            let stemBottomStaffPlace;
            $chord.each(($note, i) => {
                let noteAttr = {
                    pitchStep: $note.q("pitch step").value.toLowerCase(),
                    pitchOctave: $note.q("pitch octave").numericValue,
                    duration: $note.q("duration").numericValue,
                    type: $note.q("type").value
                };
                let staffPlace = noteAttr.pitchOctave * 8 + stepNames.indexOf(noteAttr.pitchStep) - staffBottomPitch;
                let isAdjacentNote = Math.abs(staffPlace - firstStaffPlace) % 2 !== 0 && // thirds stays in line
                    Math.abs(staffPlace - lastStaffPlace) === 1;
                if (isAdjacentNote) {
                    this.engraver.engraveNoteHead(noteAttr.type, noteWidth, staffPlace);
                }
                else {
                    let noteHead = this.engraver.engraveNoteHead(noteAttr.type, 0, staffPlace);
                    noteWidth = noteHead.actualWidth;
                }
                if (staffPlace < 0 || staffPlace > 9) {
                    this.engraver.engraveLedgerLine(-(16 - noteWidth) / 2, staffPlace);
                }
                let isFirstNote = (i === 0);
                if (isFirstNote) {
                    needsStem = (noteAttr.type != "whole");
                    firstStaffPlace = staffPlace;
                }
                lastStaffPlace = staffPlace;
            });
            if (needsStem) {
                this.engraver.engraveStem(0, lastStaffPlace, firstStaffPlace);
            }
            this.engraver.moveHead(8);
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
            this.currentNode = (new DOMParser()).parseFromString(x, "application/xml");
        }
    }
    get element() {
        return this.currentNode;
    }
    get id() {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;
            if (id === "") {
                throw new Error("empty id");
            }
            return id;
        }
        throw new Error("document does not have ids");
    }
    get value() {
        let value = this.currentNode.textContent;
        if (value === null) {
            throw new Error("no text content value found");
        }
        return value;
    }
    get numericValue() {
        let numValue = Number(this.value);
        if (Number.isNaN(numValue)) {
            throw new Error("value is not a number");
        }
        return numValue;
    }
    get name() {
        return this.currentNode.nodeName.toLowerCase();
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
    has(childNodeName) {
        try {
            this.q(childNodeName);
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
//# sourceMappingURL=MusicXML.js.map