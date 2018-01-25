import glyphTable from "../GlyphTable.js";
import Note from "../Schema/Note.js";
import Engraver from "../Engraver.js";

export default class SVGEngraver implements Engraver {
    private headPosition: {x: number, y: number } = {x: 0, y: 0};
    private score: SVG;
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        const viewport = SVG.make()
                            .size(width, height);

        this.score = viewport.appendSVG()
                             .move(50, 50);

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
            
            line.staffLine, line.barLineSingle, line.ledgerLine {
                stroke-width: 1px;
                stroke: #000;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
        `);
    }

    public engraveBarLineSingle(): SVGEngraver {
        const barLine = this.score.appendLine([0, 0], [0, 32])
                                  .addClass("barLineSingle");

        this.moveHead(2);

        return this;
    }

    public engraveStaves(): SVGEngraver {
        for (let i = 0; i < 5; ++i) {
            this.score.appendLine([0, i*8], [this.width, i*8])
                      .addClass("staffLine");
        }

        return this;
    }

    public engraveClef(clefType: string, staffPlace: number): SVGEngraver {
        const y = this.yFromStaffPlace(staffPlace);

        this.moveHead(undefined, y);
        this.engraveGlyph(clefType);

        return this;
    }

    public engraveNote(noteType: string, staffPlace: number): void {
        const y = this.yFromStaffPlace(staffPlace);
        this.moveHead(undefined, y);

        let ledgerLineNeeded = (staffPlace < 0 || staffPlace > 9);
        if (ledgerLineNeeded) {
            this.engraveLedgerLine(staffPlace);
        }

        switch (noteType) {
            case "whole":
                this.engraveGlyph("noteheadWhole");
                break;
            case "half":
                this.engraveGlyph("noteheadBlack");
                break;
        }
    }

    public engraveLedgerLine(fromStaffPlace: number): void {
        const nearestEvenStaffPlace = fromStaffPlace > 0 ? (fromStaffPlace) & ~1 : (fromStaffPlace+1) & ~1;

        let ledgerLineIsBelowStaff = (fromStaffPlace < 0);
        if (ledgerLineIsBelowStaff) {
            for (let i = nearestEvenStaffPlace; i < 0; i += 2) {
                const y = this.yFromStaffPlace(i);

                this.score.appendLine([this.headPosition.x, y], [this.headPosition.x+16, y])
                          .addClass("ledgerLine");
            }
        } else {
            for (let i = nearestEvenStaffPlace; i > 0; i -= 2) {
                const y = this.yFromStaffPlace(i);

                this.score.appendLine([this.headPosition.x, y], [this.headPosition.x+16, y])
                          .addClass("ledgerLine");
            }
        }
    }

    public engraveChord(notes: [Note], staffPlace: number): void {
        // engrave
    }

    private engraveNoteHead(noteHeadType: string): void {

    }

    public engraveTimeSignature(bpm: number, beatUnit: number): SVGEngraver {
        this.moveHead(undefined, 4 * 2);
        this.engraveGlyph(`timeSig${bpm}`, false);
        this.moveHead(undefined, 4 * 6);
        this.engraveGlyph(`timeSig${beatUnit}`);

        return this;
    }

    public engraveGlyph(glyphName: string, advanceHead: boolean = true): SVG {
        const glyphChar = glyphTable[glyphName];

        let glyphNameNotFound = (glyphChar === undefined);
        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }

        const glyphSVG = this.score.appendSVG()
                                   .size(32, 128)
                                   .move(this.headPosition.x, this.headPosition.y);
        const glyphText = glyphSVG.appendText(glyphChar)
                                  .addClass("glyph");

        const leftPadding = (glyphSVG.width - glyphSVG.bbox.width) / 2;
        glyphText.move(leftPadding);

        if (advanceHead) {
            this.moveHead(glyphSVG.width);
        }

        return glyphSVG;
    }

    public moveHead(advancement?: number, verticalPosition?: number): void {
        if (advancement !== undefined) {
            this.headPosition.x += advancement;
        }

        if (verticalPosition !== undefined) {
            this.headPosition.y = verticalPosition;
        }
    }

    public print(): SVGElement {
        return this.score.viewport.element;
    }

    private yFromStaffPlace(staffPlace: number) {
        return 32 - 4 * staffPlace;
    }
}

class SVG {
    private _element: SVGElement;

    static make(): SVG {
        const svg = new SVG("svg");

        return svg.addClass("viewport");
    }

    private constructor(el: string | SVGElement) {
        if (el instanceof SVGElement) {
            this._element = el;
        } else {
            this._element = <SVGElement> document.createElementNS("http://www.w3.org/2000/svg", el);
        }
    }

    get element(): SVGElement {
        return this._element;
    }

    get width(): number {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions

        return Number(this._element.getAttribute("width"));
    }

    get viewport(): SVG {
        const viewport = this._element.viewportElement;

        return viewport === null ? this : (new SVG(viewport));
    }

    // CHILDREN ELEMENT APPENDER

    public appendSVG(): SVG {
        return this.appendChild("svg");
    }

    public appendText(text: string): SVG {
        return this.appendChild("text").textContent(text);
    }

    public appendStyle(style: string): SVG {
        return this.appendChild("defs")
            .appendChild("style")
            .textContent(style);
    }

    public appendLine(startingPoint: [number, number], endingPoint: [number, number]): SVG {
        return this.appendChild("line")
                   .attr("x1", startingPoint[0])
                   .attr("y1", startingPoint[1])
                   .attr("x2", endingPoint[0])
                   .attr("y2", endingPoint[1]);
    }

    // PROPERTY MANIPULATOR

    public id(id: string): SVG {
        return this.attr("id", id);
    }

    public move(x?: number, y?: number): SVG {
        if (x) {
            this.attr("x", x);
        }

        if (y) {
            this.attr("y", y);
        }

        return this;
    }

    public size(width: number, height: number): SVG {
        return this.attr("width", width)
                   .attr("height", height);
    }

    public appendChild(elementName: string): SVG {
        const child = new SVG(elementName);

        this._element.appendChild(child.element);

        return child;
    }

    public attr(k: string, v: any): SVG {
        this._element.setAttribute(k, `${v}`);

        return this;
    }

    public addClass(className: string): SVG {
        this._element.classList.add(className);

        return this;
    }

    public textContent(text: string): SVG {
        this._element.textContent = text;

        return this;
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
}

interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
