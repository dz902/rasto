import SVGEngraver from "../Engravers/SVGEngraver.js";

export default class MusicXML {
    private music: DOM;
    private engraver: SVGEngraver;

    get element(): Element {
        return this.engraver.print();
    }

    constructor(dataString: string) {
        this.engraver = new SVGEngraver(600, 400);

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
        let measureAttributes: {[key: string]: any} = {};

        $measure.q("attributes")
                .eachChild(($attr) => {
                    switch ($attr.name) {
                        case "divisions":
                            measureAttributes["divisions"] = $attr.numericValue;
                            break;
                        case "time":
                            measureAttributes["time/beats"] = $attr.q("beats").numericValue;
                            measureAttributes["time/beatType"] = $attr.q("beat-type").numericValue;
                            break;
                        case "clef":
                            measureAttributes["clef/sign"] = $attr.q("sign").value;
                            measureAttributes["clef/line"] = $attr.q("line").numericValue;
                            break;
                    }
                });

        this.engraver.engraveClef(measureAttributes["clef/sign"],
            (measureAttributes["clef/line"]-1) * 2);
        this.engraver.moveHead(32);
        this.engraver.engraveTimeSignature(measureAttributes["time/beats"], measureAttributes["time/beatType"]);
        this.engraver.moveHead(32);

        let chord: [DOM];

        $measure.qq("note")
                .group(node => node.has("chord"))
                .forEach(($chord) => {
                    $chord.each(($note) => {
                        console.log($note);
                    })
                });
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
                console.log(this.currentNode);
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

        return new DOMCollection(result);
    }

    has(childNodeName: string): boolean {
        try {
            this.q(childNodeName);
        } catch (e) {
            return false;
        }

        return true;
    }

    eachChild(callback: (node: DOM) => void) {
        this.currentNode.childNodes.forEach((value) => {
            callback(DOM.wrap(<Element> value));
        })
    }
}

class DOMCollection {
    private currentNodes: NodeList | DOM[];

    constructor(nodes: NodeList | DOM[]) {
        this.currentNodes = nodes;
    }

    each(callback: (node: DOM) => void) {
        for (let value of this.currentNodes) {
            callback(DOM.wrap(<Element> value));
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