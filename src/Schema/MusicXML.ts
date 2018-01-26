import SVGEngraver from "../Engravers/SVGEngraver.js";

export default class MusicXML {
    private music: DOM;
    private engraver: SVGEngraver;

    get element(): Element {
        return this.engraver.print();
    }

    constructor(dataString: string) {
        this.engraver = new SVGEngraver(600, 400);

        // element must be rendered to get item bounding box

        let element = this.engraver.print();
        document.body.appendChild(element);

        const $music = DOM.parse(dataString);

        const $scoreParts = $music.qq("score-partwise part-list score-part");

        let scoreParts: {[i: string]: string} = {};
        $scoreParts.each(($scorePart) => {
            const partName = $scorePart.q('part-name').value;

            if ($scorePart.id === "") {
                throw new Error("score-part does not have an ID");
            } else {
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

    private typesetMeasure($measure: DOM): void {
        this.engraver.engraveStaves(50);

        let measureAttr: {[key: string]: any} = {};

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

        this.engraver.engraveClef(measureAttr.clefSign,
                        (measureAttr.clefLine-1) * 2);
        this.engraver.moveHead(8);
        this.engraver.engraveTimeSignature(measureAttr.timeBeats, measureAttr.timeBeatType);
        this.engraver.moveHead(8);

        let staffBottomPitch = 34;

        if (measureAttr.clefSign === "f") {
            staffBottomPitch = 31;
        }

        const stepNames = ["c", null, "d", null, "e", "f", null, "g", null, "a", null, "b"];

        $measure.qq("note")
                .group(node => node.has("chord"))
                .forEach(($chord) => {
                    $chord.each(($note) => {
                        let noteAttr: {[k: string]: any} = {
                            pitchStep: $note.q("pitch step").value.toLowerCase(),
                            pitchOctave: $note.q("pitch octave").numericValue,
                            duration: $note.q("duration").numericValue,
                            type: $note.q("type").value
                        };

                        let staffPlace = noteAttr.pitchOctave*8+stepNames.indexOf(noteAttr.pitchStep)-staffBottomPitch;
                        let noteHead = this.engraver.engraveNoteHead(noteAttr.type, staffPlace);

                        if (staffPlace < 0 || staffPlace > 9) {
                            this.engraver.engraveLedgerLine(-(16-noteHead.actualWidth) / 2, staffPlace);
                        }
                    });

                    this.engraver.moveHead(8);
                });

        this.engraver.resetHead();
        this.engraver.moveHead(50);
        this.engraver.engraveBarLineSingle();
    }

    private typesetChord($chord: DOMCollection) {

    }
}

class DOM {
    private currentNode: Element | Document;

    static parse(dataString: string): DOM {
        return new DOM(dataString);
    }

    static wrap(node: Element): DOM {
        return new DOM(node);
    }

    private constructor(x: string | Element) {
        if (x instanceof Element) {
            this.currentNode = x;
        } else {
            this.currentNode = (new DOMParser()).parseFromString(x, "application/xml");
        }
    }

    get element(): Element | Document {
        return this.currentNode;
    }

    get id(): string {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;

            if (id === "") {
                throw new Error("empty id");
            }

            return id;
        }

        throw new Error("document does not have ids");
    }

    get value(): string {
        let value = this.currentNode.textContent;

        if (value === null) {
            throw new Error("no text content value found");
        }

        return value;
    }

    get numericValue(): number {
        let numValue = Number(this.value);

        if (Number.isNaN(numValue)) {
            throw new Error("value is not a number");
        }

        return numValue;
    }

    get name(): string {
        return this.currentNode.nodeName.toLowerCase();
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

    has(childNodeName: string): boolean {
        try {
            this.q(childNodeName);
        } catch (e) {
            return false;
        }

        return true;
    }

    eachChild(callback: (node: DOM) => void): void {
        DOMCollection.wrap(this.currentNode.childNodes)
                     .each(callback);
    }
}

class DOMCollection {
    private currentNodes: DOM[] = [];

    static wrap(nodes: NodeList): DOMCollection {
        return new DOMCollection(nodes);
    }

    private constructor(nodes: NodeList | DOM[]) {
        if (nodes instanceof NodeList) {
            nodes.forEach((node) => this.currentNodes.push(DOM.wrap(<Element> node)));
        } else {
            this.currentNodes = nodes;
        }
    }

    each(callback: (node: DOM) => void) {
        for (let value of this.currentNodes) {
            callback(value);
        }
    }

    group(callback: (node: DOM) => boolean): DOMCollection[] {
        let groups: DOMCollection[] = [];
        let currentGroup: DOM[] = [];

        this.each((node) => {
            if (callback(node)) {
                currentGroup.push(node);
            } else {
                let currentGroupNeedsFlush = currentGroup.length > 0;

                if (currentGroupNeedsFlush) {
                    groups.push(new DOMCollection(currentGroup));
                    currentGroup = [];
                }

                groups.push(new DOMCollection([node]));
            }
        })

        return groups;
    }
}