import glyphTable from "../GlyphTable.js";
import Note from "../Schema/Note.js";
import Engraver from "../Engraver.js";

const EM = 32;
const STAFF_SPACE = 0.25 * EM;
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
            .move(50, 50);

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
                stroke-width: ${nn(engravingDefaults.ledgerLineThickness*STAFF_SPACE)}px;
            }
            
            line.stem {
                stroke-width: ${nn(engravingDefaults.stemThickness*STAFF_SPACE)}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
            `);
    }

    engraveBarLineSingle(): SVGEngraver {
        const barLine = this.score.appendSVG()
                                  .move(this.headPosition.x, this.headPosition.y)
                                      .appendLine([0, 0], [0, 32])
                                      .addClass("barLineSingle");

        return this;
    }

    engraveStaves(width: number): SVGEngraver {
        for (let i = 0; i < 10; i += 2) {
            this.moveHead(undefined, i);
            this.engraveStaffLine(width, i)
                .addClass("staffLine");
        }

        return this;
    }

    engraveStaffLine(width: number, staffPlace: number): SVG {
        return this.score.appendSVG()
                   .size(32, 32)
                   .move(this.headPosition.x, this.headPosition.y)
                   .appendLine([0, 0], [width*4, 0]);
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

        let y = this.staffSpaceFromStaffPlace(staffPlace);

        this.moveHead(undefined, y);
        this.engraveGlyph(clefGlyphName, 0);

        this.currentState.clefSign = clefSign;

        return this;
    }

    engraveLedgerLine(width: number, fromStaffPlace: number): void {
        let engraveOffsetLine = (staffPlace: number) => {
            this.engraveStaffLine(width, staffPlace)
                .addClass("ledgerLine")
                .translate(-width/2);
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

        let staffBottomPitch = 34;

        if (this.currentState.clefSign === "f") {
            staffBottomPitch = 31;
        }

        let staffPlaceFromOctaveAndStep = (octave: number, step: string): number => {
            return octave*8 + STEP_NAMES.indexOf(step) - staffBottomPitch;
        };

        let lowestNote: Note = notes[0];
        let lowestStaffPlace: number = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace: number = lowestStaffPlace;

        let noteWidthFromBBox = (bbox: {[type: string]: [number, number]}) => {
            return nn(bbox["bBoxNE"][0]) - nn(bbox["bBoxSW"][0]);
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
            let staffPlace = staffPlaceFromOctaveAndStep(note.pitchOctave, note.pitchStep) ;

            let isNotThird = Math.abs(staffPlace - lowestStaffPlace) % 2 !== 0;
            let isSecond = Math.abs(staffPlace - lastStaffPlace) === 1;
            let isAdjacentNote = isSecond && isNotThird; // thirds stays in line

            let noteHead: SVG;

            if (isAdjacentNote) {
                noteHead = this.engraveNoteHead(note.type, displacement, staffPlace);
            } else {
                noteHead = this.engraveNoteHead(note.type, 0, staffPlace);
            }

            let ledgerNeeded = (staffPlace < 0 || staffPlace > 9);

            if (ledgerNeeded) {
                this.engraveLedgerLine(noteWidth + nn(this.meta["engravingDefaults"]["ledgerLineExtension"]), staffPlace);
            }
        }
    }

    engraveStem(offset: number, staffPlaceTop: number, staffPlaceBottom: number): SVG {
        const staffSpace = this.staffSpaceFromStaffPlace(staffPlaceTop);

        this.moveHead(undefined, staffSpace);

        return this.score.appendSVG()
                         .move(this.headPosition.x, this.headPosition.y)
                         .size(32, 32)
                             .appendLine([0, 0], [0, (staffPlaceTop-staffPlaceBottom)*4])
                             .addClass("stem")
                             .translate(offset);
    }

    engraveNoteHead(noteHeadType: string, offset: number, staffPlace: number): SVG {
        const y = this.staffSpaceFromStaffPlace(staffPlace);
        this.moveHead(undefined, y);

        let glyphNote: SVG;
        switch (noteHeadType) {
            case "whole":
                glyphNote = this.engraveGlyph("noteheadWhole", offset);
                break;
            default:
                glyphNote = this.engraveGlyph("noteheadBlack", offset);
                break;
        }

        return glyphNote;
    }

    engraveTimeSignature(bpm: number, beatUnit: number): SVGEngraver {
        this.moveHead(undefined, 2);
        this.engraveGlyph(`timeSig${bpm}`, 0);
        this.moveHead(undefined, 6);
        this.engraveGlyph(`timeSig${beatUnit}`, 0);

        return this;
    }

    engraveGlyph(glyphName: string, offset: number): SVG {
        const glyphChar = glyphTable[glyphName];

        let glyphNameNotFound = (glyphChar === undefined);

        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }

        const glyphText = this.score.appendSVG()
                                    .size(32, 128)
                                    .move(this.headPosition.x, this.headPosition.y)
                                        .appendText(glyphChar)
                                        .translate(offset*STAFF_SPACE)
                                        .addClass("glyph");

        return glyphText.viewport;
    }

    moveHead(steps?: number, verticalStep?: number): void {
        if (steps !== undefined) {
            this.headPosition.x += steps*4;
        }

        if (verticalStep !== undefined) {
            this.headPosition.y = verticalStep*4;
        }
    }

    resetHead(): void {
        this.headPosition = {x: 0, y: 0};
    }

    print(): SVGGraphicsElement {
        return this.score.viewport.element;
    }

    private staffSpaceFromStaffPlace(staffPlace: number) {
        return 8-staffPlace;
    }
}

class SVG {
    private _element: SVGGraphicsElement;

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

    get actualWidth(): number {
        return this.bbox.width;
    }

    get viewport(): SVG {
        const viewport = this._element.viewportElement;

        return viewport === null ? this : (new SVG(viewport));
    }

    get bbox(): BoundingBox {
        if (!document.body.contains(this._element)) {
            throw Error("element must be rendered to have a bounding box.")
        }

        if (this._element instanceof SVGGraphicsElement) {
            return this._element.getBBox();
        }

        throw Error("element does not have a bounding box.");
    }

    // CHILDREN ELEMENT APPENDERS

    appendSVG(): SVG {
        return this.appendChild("svg");
    }

    appendText(text: string): SVG {
        return this.appendChild("text").textContent(text);
    }

    appendStyle(style: string): SVG {
        return this.appendChild("defs")
            .appendChild("style")
            .textContent(style);
    }

    appendLine(startingPoint: [number, number], endingPoint: [number, number]): SVG {
        return this.appendChild("line")
                   .attr("x1", startingPoint[0])
                   .attr("y1", startingPoint[1])
                   .attr("x2", endingPoint[0])
                   .attr("y2", endingPoint[1]);
    }

    appendRect(width: number, height: number): SVG {
        return this.appendChild("rect")
                   .size(width, height);
    }

    // PROPERTY MANIPULATORS

    id(id: string): SVG {
        return this.attr("id", id);
    }

    move(x?: number, y?: number): SVG {
        if (x) {
            this.attr("x", x);
        }

        if (y) {
            this.attr("y", y);
        }

        return this;
    }

    translate(x?: number, y?: number): SVG {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome

        if (this.element instanceof SVGSVGElement) {
            throw new Error("transform does not work on SVGSVGElement");
        }

        const transform = (<SVGSVGElement> this.viewport.element).createSVGTransform();
        transform.setTranslate(x ? x : 0, y ? y : 0);

        this.element.transform.baseVal.appendItem(transform);

        return this;
    }

    size(width: number, height: number): SVG {
        return this.attr("width", width)
                   .attr("height", height);
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

    // LAYOUT HELPERS

    alignCenter(): SVG {
        const leftPadding = (this.viewport.width - this.actualWidth) / 2;

        return this.translate(leftPadding);
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