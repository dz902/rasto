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
            
            line.staffLine, line.barLineSingle, line.ledgerLine, line.stem {
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

    public engraveLedgerLine(offset: number, fromStaffPlace: number): void {
        const nearestEvenStaffPlace = fromStaffPlace > 0 ? (fromStaffPlace) & ~1 : (fromStaffPlace+1) & ~1;

        const engraveLine = (staffPlace: number) => {
            const y = this.yFromStaffPlace(staffPlace);

            this.score.appendSVG()
                      .size(32, 32)
                      .move(this.headPosition.x, y)
                          .appendRect(16, 1)
                          .addClass("ledgerLine")
                          .translate(offset);
        };

        let ledgerLineIsBelowStaff = (fromStaffPlace < 0);
        if (ledgerLineIsBelowStaff) {
            for (let i = nearestEvenStaffPlace; i < 0; i += 2) {
                engraveLine(i);
            }
        } else {
            for (let i = nearestEvenStaffPlace; i > 0; i -= 2) {
                engraveLine(i);
            }
        }
    }

    public engraveChord(notes: [Note], staffPlace: number): void {
        // engrave
    }

    public engraveNote(noteType: string, staffPlace: number): void {
        switch (noteType) {
            case "whole":
                this.engraveNoteHead("whole", staffPlace);
                break;
            default:
                this.engraveStem("down", staffPlace);
                this.engraveNoteHead("black", staffPlace);
        }
    }

    private engraveStem(direction: string, staffPlace: number): void {
        const y = this.yFromStaffPlace(staffPlace);

        const translate = {
            x: direction === "up" ? 1.18*8-1 : 0,
            y: direction === "up" ?  -3.5*8 : 0
        };

        this.score.appendSVG()
                  .size(32, 32)
                  .move(this.headPosition.x, y)
                      .appendRect(1, 3.5*8)
                      .addClass("stem")
                      .translate(translate.x, translate.y);
    }

    private engraveNoteHead(noteHeadType: string, staffPlace: number): void {
        const y = this.yFromStaffPlace(staffPlace);
        this.moveHead(undefined, y);

        let glyphNote;
        switch (noteHeadType) {
            case "whole":
                glyphNote = this.engraveGlyph("noteheadWhole", false);
                break;
            default:
                glyphNote = this.engraveGlyph("noteheadBlack", false);
                break;
        }

        let ledgerLineNeeded = (staffPlace < 0 || staffPlace > 9);
        if (ledgerLineNeeded) {
            this.engraveLedgerLine(-1 * (16-glyphNote.actualWidth) / 2, staffPlace);
        }
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

        const glyphText = this.score.appendSVG()
                                    .size(32, 128)
                                    .move(this.headPosition.x, this.headPosition.y)
                                        .appendText(glyphChar)
                                        .addClass("glyph");

        if (advanceHead) {
            this.moveHead(glyphText.viewport.width);
        }

        return glyphText.viewport;
    }

    public moveHead(advancement?: number, verticalPosition?: number): void {
        if (advancement !== undefined) {
            this.headPosition.x += advancement;
        }

        if (verticalPosition !== undefined) {
            this.headPosition.y = verticalPosition;
        }
    }

    public print(): SVGGraphicsElement {
        return this.score.viewport.element;
    }

    private yFromStaffPlace(staffPlace: number) {
        return 32 - 4 * staffPlace;
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

    public appendRect(width: number, height: number): SVG {
        return this.appendChild("rect")
                   .size(width, height);
    }

    // PROPERTY MANIPULATORS

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

    public translate(x?: number, y?: number): SVG {
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

    // LAYOUT HELPERS

    public alignCenter(): SVG {
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
