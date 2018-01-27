import SVGEngraver from "../Engravers/SVGEngraver.js";
import Note from "../Schema/Note.js";

export default class MusicXML {
    private music: DOM;
    private engraver: SVGEngraver;

    static render(xmlString: string): Promise<MusicXML> {
        return SVGEngraver
                   .create(600, 400)
                   .then((engraver) => {
                       // element must be rendered to get item bounding box

                       let element = engraver.print();

                       document.body.appendChild(element);

                       let musicXML = new MusicXML(xmlString, engraver);

                       document.body.removeChild(element);

                       return musicXML;
                   });
    }

    get element(): Element {
        return this.engraver.print();
    }

    private constructor(dataString: string, engraver: SVGEngraver) {
        this.engraver = engraver;

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

        const stepNames = "cdefgab";

        $measure.qq("note")
                .group(node => node.has("chord"))
                .forEach(($chord) => {
                    let firstStaffPlace: number = 0;
                    let lastStaffPlace: number = 0;
                    let noteWidth: number = 0;
                    let needsStem: boolean = false;
                    let stemTopStaffPlace: number;
                    let stemBottomStaffPlace: number;
                    let notes: Note[] = [];

                    $chord.each(($note, i) => {
                        let note: Note = {
                            pitchStep: $note.q("pitch step").value.toLowerCase(),
                            pitchOctave: $note.q("pitch octave").numericValue,
                            duration: $note.q("duration").numericValue,
                            type: $note.q("type").value
                        };

                        notes.push(note);

                        // let staffPlace = noteAttr.pitchOctave*8+stepNames.indexOf(noteAttr.pitchStep)-staffBottomPitch;
                        //
                        // let isAdjacentNote = Math.abs(staffPlace - firstStaffPlace) % 2 !== 0 &&  // thirds stays in line
                        //                      Math.abs(staffPlace - lastStaffPlace) === 1;
                        //
                        // if (isAdjacentNote) {
                        //     this.engraver.engraveNoteHead(noteAttr.type, noteWidth, staffPlace);
                        // } else {
                        //     let noteHead = this.engraver.engraveNoteHead(noteAttr.type, 0, staffPlace);
                        //     noteWidth = noteHead.actualWidth;
                        // }
                        //
                        // if (staffPlace < 0 || staffPlace > 9) {
                        //     this.engraver.engraveLedgerLine(-(16-noteWidth) / 2, staffPlace);
                        // }
                        //
                        // let isFirstNote = (i === 0);
                        //
                        // if (isFirstNote) {
                        //     needsStem = (noteAttr.type != "whole");
                        //     firstStaffPlace = staffPlace;
                        // }
                        //
                        // lastStaffPlace = staffPlace;
                    });

                    this.engraver.engraveChord(notes);

                    if (needsStem) {
                        this.engraver.engraveStem(0, lastStaffPlace, firstStaffPlace);
                    }

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

    item(id: number): DOM {
        return this.currentNodes[id];
    }

    each(callback: (node: DOM, index?: number) => void) {
        for (let i = 0; i < this.currentNodes.length; ++i) {
            callback(this.currentNodes[i], i);
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

    static wrap(nodes: NodeList): DOMCollection {
        return new DOMCollection(nodes);
    }

    static use(nodes: DOM[]): DOMCollection {
        return new DOMCollection(nodes);
    }

    private constructor(nodes: NodeList | DOM[]) {
        if (nodes instanceof NodeList) {
            nodes.forEach((node) => this.currentNodes.push(DOM.wrap(<Element> node)));
        } else {
            this.currentNodes = nodes;
        }
    }
}