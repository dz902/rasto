import SVGEngraver from '../Engravers/SVGEngraver.js';
import has = Reflect.has;

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

        this.engraver.engraveClef(measureAttr.clefSign, (measureAttr.clefLine - 1) * 2);
        this.engraver.engraveTimeSignature(measureAttr.timeBeats, measureAttr.timeBeatType);

        let beams = [];

        $measure.qq('note')
                .group(node => node.has('chord'))
                .forEach(($chord) => {
                    let notes: Note[] = [];

                    $chord.each(($note, i) => {
                        if ($note.has('rest')) {
                            return;
                        }

                        let note: Note = {
                            pitchStep: $note.q('pitch step').value.toLowerCase(),
                            pitchOctave: nn($note.q('pitch octave').value),
                            duration: nn($note.q('duration').value),
                            type: $note.q('type').value
                        };

                        $note.has('beam', ($beams) => {
                            note.beams = [];

                            $beams.each(($beam) => {
                                let beam: Beam = {
                                    number: nn($beam.attributes['number']),
                                    type: ensureBeamType($beam.value)
                                };

                                note.beams!.push(beam);
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

    private typesetChord($chord: DOMCollection) {

    }
}

class DOM {
    private currentNode: Element | Document;
    private noteAttributes: Attributes;

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
            return "";
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

function nn(value: any): number {
    let numValue = Number(value);

    if (Number.isNaN(numValue)) {
        throw new Error('value is not a number');
    }

    return numValue;
}

export interface Note {
    pitchOctave: number;
    pitchStep: string;
    duration: number;
    type: string;
    beams?: Beam[];
}

export interface Beam {
    number: number;
    type: BeamType;
}

type BeamType = 'begin' | 'continue' | 'end';

function ensureBeamType(type: string): BeamType {
    if (isBeamType(type)) {
        return type;
    } else {
        throw new Error(`type ${type} is not valid beam type`);
    }
}

function isBeamType(type: string): type is BeamType {
    return ['begin', 'continue', 'end'].indexOf(type) !== -1;
}


export interface Attributes {
    [k: string]: string;
}