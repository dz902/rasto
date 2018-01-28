import glyphTable from "../GlyphTable.js";
import Note from "../Schema/Note.js";
import Engraver from "../Engraver.js";

const EM = 32;
const STAFF_SPACE = 0.25 * EM;
const STAFF_PLACE_MIDDLE_LINE = 4;
const STAFF_PLACE_TOP_LINE = 9;
const STAFF_PLACE_BOTTOM_LINE = 0;
const STAFF_PLACE_SPAN_OCTAVE = 7;
const STEP_NAMES = "cdefgab";

export default class SVGEngraver implements Engraver {
    private headPosition: {x: number, y: number } = {x: 0, y: 0};
    private score: SVG;
    private width: number;
    private height: number;
    private meta: any;
    private currentState: any = {};

    static create(width: number, height: number): Promise<SVGEngraver> {
        return fetch("./fonts/bravura/bravura_metadata.json")
                   .then(response => response.json())
                   .then((meta) => new SVGEngraver(width, height, meta));
    }

    private constructor(width: number, height: number, meta: any) {
        this.width = width;
        this.height = height;
        this.meta = meta;

        const viewport = SVG.make()
            .size(width, height);

        this.score = viewport.appendSVG()
            .move(5, 5);

        let engravingDefaults = meta.engravingDefaults;

        this.score
            .appendStyle(`
            @font-face {
                font-family: "Bravura";
                src: url(./fonts/bravura/woff/Bravura.woff) format("woff");
            }

            svg.viewport {
                overflow: hidden;
            }

            svg, symbol {
                overflow: visible;
            }

            text.glyph {
                font-family: Bravura;
                font-size: 32px;
            }
            
            line.staffLine, line.barLineSingle, line.ledgerLine, line.stem {
                stroke-width: ${nn(engravingDefaults.staffLineThickness*STAFF_SPACE)}px;
                stroke: #000;
            }
            
            line.ledgerLine {
                stroke-width: ${nn(engravingDefaults["legerLineThickness"]*STAFF_SPACE)}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
            `);
    }

    engraveBarLineSingle(): SVG {
        let line = SVG.createLine([0, 4])
                      .addClass("barLineSingle");

        return this.engraveElement(line);
    }

    engraveStaves(width: number): SVGEngraver {
        for (let i = 0; i < 5; ++i) {
            this.moveHead(undefined, i);
            this.engraveStaffLine(width);
        }

        return this;
    }

    engraveClef(clefSign: string, staffPlace: number): SVGEngraver {
        let clefGlyphName: string = "";

        switch (clefSign.toLowerCase()) {
            case "g":
                clefGlyphName = "gClef";
                break;
            default:
                throw new Error("unknown clef type");
        }

        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        this.engraveGlyph(clefGlyphName, 0);

        this.currentState.clefSign = clefSign;

        return this;
    }

    engraveStaffLine(width: number): SVG {
        let line = SVG.createLine([width, 0])
                      .addClass("staffLine");

        return this.engraveElement(line);
    }

    engraveLedgerLine(width: number, fromStaffPlace: number): void {
        let engraveOffsetLine = (staffPlace: number) => {
            this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));

            this.engraveStaffLine(width)
                .addClass("ledgerLine")
                .translate(nn(-this.meta["engravingDefaults"]["legerLineExtension"]/2));
        }

        let nearestEvenStaffPlace = fromStaffPlace > 0 ? (fromStaffPlace) & ~1 : (fromStaffPlace+1) & ~1;
        let ledgerLineIsBelowStaff = (fromStaffPlace < 0);

        if (ledgerLineIsBelowStaff) {
            for (let i = nearestEvenStaffPlace; i < 0; i += 2) {
                engraveOffsetLine(i);
            }
        } else {
            for (let i = nearestEvenStaffPlace; i > 9; i -= 2) {
                engraveOffsetLine(i);
            }
        }
    }

    engraveChord(notes: Note[]): void {
        if (notes.length < 1) {
            throw new Error("empty chord");
        }

        let staffBottomPlace = 30;

        if (this.currentState.clefSign === "f") {
            staffBottomPlace = 18;
        }

        let staffPlaceFromOctaveAndStep = (octave: number, step: string): number => {
            return octave*7 + STEP_NAMES.indexOf(step) - staffBottomPlace;
        };

        let lowestNote: Note = notes[0];
        let lowestStaffPlace: number = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace: number = lowestStaffPlace;

        let noteWidthFromBBox = (bbox: {[type: string]: [number, number]}) => {
            return nn(bbox["bBoxNE"][0] - bbox["bBoxSW"][0]);
        }

        let bboxes = this.meta["glyphBBoxes"];
        let noteWidth: number;

        switch (lowestNote.type) {
            case "whole":
                noteWidth = noteWidthFromBBox(bboxes["noteWhole"]);
                break;
            case "half":
                noteWidth = noteWidthFromBBox(bboxes["noteheadHalf"]);
                break;
            case "quarter":
                noteWidth = noteWidthFromBBox(bboxes["noteheadBlack"]);
                break;
            default:
                throw new Error("unknown note type");
        }

        let displacement = noteWidth;

        for (let i = 0; i < notes.length; ++i) {
            let note = notes[i];
            let staffPlace = staffPlaceFromOctaveAndStep(note.pitchOctave, note.pitchStep);

            let isNotThird = Math.abs(staffPlace - lowestStaffPlace + 1) % 3 !== 0;
            let isSecond = Math.abs(staffPlace - lastStaffPlace) === 1;
            let isAdjacentNote = isSecond && isNotThird; // thirds stays in line

            let noteHead: SVG;

            if (isAdjacentNote) {
                noteHead = this.engraveNoteHead(note.type, displacement, staffPlace);
            } else {
                noteHead = this.engraveNoteHead(note.type, 0, staffPlace);
            }

            let ledgerNeeded = (staffPlace < STAFF_PLACE_BOTTOM_LINE || staffPlace > STAFF_PLACE_TOP_LINE);

            if (ledgerNeeded) {
                this.engraveLedgerLine(nn(noteWidth + this.meta["engravingDefaults"]["legerLineExtension"]), staffPlace);
            }

            lastStaffPlace = staffPlace;
        }

        let stemNeeded = (lowestNote.type !== "whole");
        let highestNote = notes[notes.length-1];

        if (stemNeeded) {
            let noteAnchors = this.meta["glyphsWithAnchors"];

            switch (lowestNote.type) {
                case "whole":
                    noteAnchors = noteAnchors["noteWhole"];
                    break;
                case "half":
                    noteAnchors = noteAnchors["noteheadHalf"];
                    break;
                default:
                    throw new Error("unknown note type");
            }

            let staffPlaceTop: number, staffPlaceBottom: number, offsets: {x: number, y: number};
            let highestStaffPlace = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);
            let onlyLedgerNotes = (highestStaffPlace < STAFF_PLACE_BOTTOM_LINE && lowestStaffPlace < STAFF_PLACE_BOTTOM_LINE) ||
                                  (highestStaffPlace > STAFF_PLACE_TOP_LINE && lowestStaffPlace > STAFF_PLACE_TOP_LINE);


            let stemPointsUp = (highestStaffPlace < STAFF_PLACE_MIDDLE_LINE) ||
                               (highestStaffPlace-STAFF_PLACE_MIDDLE_LINE < STAFF_PLACE_MIDDLE_LINE-lowestStaffPlace);

            if (stemPointsUp) {
                if (onlyLedgerNotes) {
                    staffPlaceTop = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                } else {
                    staffPlaceTop = highestStaffPlace + STAFF_PLACE_SPAN_OCTAVE;
                }

                staffPlaceBottom = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);

                offsets = {
                    x: nn(noteAnchors["stemUpSE"][0]),
                    y: nn(-noteAnchors["stemUpSE"][1])
                };
            } else {
                if (onlyLedgerNotes) {
                    staffPlaceBottom = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                } else {
                    staffPlaceBottom = lowestStaffPlace - STAFF_PLACE_SPAN_OCTAVE;
                }

                staffPlaceTop = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);

                offsets = {
                    x: nn(noteAnchors["stemDownNW"][0])+nn(this.meta["engravingDefaults"]["stemThickness"]),
                    y: nn(noteAnchors["stemDownNW"][1])
                }
            }

            this.engraveStem(staffPlaceBottom, staffPlaceTop, offsets);
        }
    }

    engraveStem(staffPlaceBottom: number, staffPlaceTop: number, offsets: { x: number; y: number }): SVG {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlaceTop));

        // y offset is compensated to make sure stem touches the right line as desired

        this.moveHead(undefined, this.headPosition.y-offsets.y);

        let stem = SVG.createRect(nn(this.meta["engravingDefaults"]["stemThickness"]),
                                  (Math.abs(staffPlaceTop-staffPlaceBottom)/2+offsets.y))
                      .addClass("stem");

        return this.engraveElement(stem)
                   .translate(offsets.x-nn(this.meta["engravingDefaults"]["stemThickness"]), offsets.y);
    }

    engraveNoteHead(noteHeadType: string, offsetX: number, staffPlace: number): SVG {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));

        let glyphName: {[k: string]: string } = {
            "whole": "noteWhole",
            "half": "noteheadHalf",
            "quarter": "noteheadBlack"
        };

        let glyphNameNotFound = (!glyphName[noteHeadType]);

        if (glyphNameNotFound) {
            throw new Error("unknown note type");
        }

        return this.engraveGlyph(glyphName[noteHeadType], offsetX);
    }

    engraveTimeSignature(bpm: number, beatUnit: number): SVGEngraver {
        this.moveHead(undefined, 1);
        this.engraveGlyph(`timeSig${bpm}`, 0);
        this.moveHead(undefined, 3);
        this.engraveGlyph(`timeSig${beatUnit}`, 0);

        return this;
    }

    engraveGlyph(glyphName: string, offsetX: number): SVG {
        const glyphChar = glyphTable[glyphName];

        let glyphNameNotFound = (glyphChar === undefined);

        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }

        let glyphText = SVG.createText(glyphChar)
                           .addClass("glyph");
        let glyph = this.engraveElement(glyphText)
                        .translate(offsetX);

        return glyph;
    }

    engraveElement(element: SVG): SVG {
        let svg = this.score.appendSVG()
                            .move(this.headPosition.x, this.headPosition.y);

        let child = svg.appendElement(element);

        return child;
    }

    moveHead(xx?: number, y?: number): void {
        if (xx !== undefined) {
            this.headPosition.x += xx;
        }

        if (y !== undefined) {
            this.headPosition.y = y;
        }
    }

    resetHead(): void {
        this.headPosition = {x: 0, y: 0};
    }

    print(): SVGGraphicsElement {
        return this.score.viewport.element;
    }

    private topMarginFromStaffPlace(staffPlace: number) {
        return 4 - staffPlace/2;
    }
}

class SVG {
    private _element: SVGGraphicsElement;

    static create(elementName: string): SVG {
        return new SVG(elementName);
    }

    static createText(text: string): SVG {
        return SVG.create("text").textContent(text);
    }

    static createLine(endingPoint: [number, number]): SVG {
        return SVG.create("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", endingPoint[0] * STAFF_SPACE)
            .attr("y2", endingPoint[1] * STAFF_SPACE);
    }

    static createRect(width: number, height: number): SVG {
        return SVG.create("rect")
                  .size(width, height);
    }

    static make(): SVG {
        const svg = new SVG("svg");

        return svg.addClass("viewport");
    }

    private constructor(el: string | SVGGraphicsElement) {
        if (el instanceof SVGGraphicsElement) {
            this._element = el;
        } else {
            this._element = <SVGGraphicsElement> document.createElementNS("http://www.w3.org/2000/svg", el);
        }
    }

    // ATTRIBUTE GETTERS

    get element(): SVGGraphicsElement {
        return this._element;
    }

    get width(): number {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions

        return Number(this._element.getAttribute("width"));
    }
    //
    // get actualWidth(): number {
    //     return this.bbox.width;
    // }

    get viewport(): SVG {
        const viewport = this._element.viewportElement;

        return viewport === null ? this : (new SVG(viewport));
    }

    // get bbox(): BoundingBox {
    //     if (!document.body.contains(this._element)) {
    //         throw Error("element must be rendered to have a bounding box.")
    //     }
    //
    //     if (this._element instanceof SVGGraphicsElement) {
    //         return this._element.getBBox();
    //     }
    //
    //     throw Error("element does not have a bounding box.");
    // }

    // CHILDREN ELEMENT APPENDERS

    appendSVG(): SVG {
        return this.appendChild("svg");
    }

    appendStyle(style: string): SVG {
        return this.appendChild("defs")
            .appendChild("style")
            .textContent(style);
    }

    appendElement(child: SVG): SVG {
        this._element.appendChild(child.element);

        return child;
    }

    // PROPERTY MANIPULATORS

    id(id: string): SVG {
        return this.attr("id", id);
    }

    move(x?: number, y?: number): SVG {
        if (x) {
            this.attr("x", x * STAFF_SPACE);
        }

        if (y) {
            this.attr("y", y * STAFF_SPACE);
        }

        return this;
    }

    translate(x?: number, y?: number): SVG {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome

        if (this.element instanceof SVGSVGElement) {
            throw new Error("transform does not work on SVGSVGElement");
        }

        let transform = (<SVGSVGElement> this.element.viewportElement).createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);

        this.element.transform.baseVal.appendItem(transform);

        return this;
    }

    size(width: number, height: number): SVG {
        return this.attr("width", width * STAFF_SPACE)
                   .attr("height", height * STAFF_SPACE);
    }

    appendChild(elementName: string): SVG {
        const child = new SVG(elementName);

        this._element.appendChild(child.element);

        return child;
    }

    attr(k: string, v: any): SVG {
        this._element.setAttribute(k, `${v}`);

        return this;
    }

    addClass(className: string): SVG {
        this._element.classList.add(className);

        return this;
    }

    textContent(text: string): SVG {
        this._element.textContent = text;

        return this;
    }
}

interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

function nn(value: any): number {
    let n: number = Number(value);

    if (Number.isNaN(n)) {
        throw new Error("value is not a number");
    }

    return n;
}