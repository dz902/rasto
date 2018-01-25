import glyphTable from "../GlyphTable.js";
export default class SVGEngraver {
    constructor(width, height) {
        this.headPosition = { x: 0, y: 0 };
        this.width = width;
        this.height = height;
        this.viewport = SVG.make()
            .size(width, height);
        this.score = this.viewport.appendSVG()
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
    engraveBarLineSingle() {
        const barLine = this.score.appendLine([0, 0], [0, 32])
            .addClass("barLineSingle");
        this.moveHead(2);
        return this;
    }
    engraveStaves() {
        for (let i = 0; i < 5; ++i) {
            this.score.appendLine([0, i * 8], [this.width, i * 8])
                .addClass("staffLine");
        }
        return this;
    }
    engraveClef(clefType, staffPlace) {
        const y = this.yFromStaffPlace(staffPlace);
        this.moveHead(undefined, y);
        this.engraveGlyph(clefType);
        return this;
    }
    engraveNote(noteType, staffPlace) {
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
    engraveLedgerLine(fromStaffPlace) {
        const nearestEvenStaffPlace = fromStaffPlace > 0 ? (fromStaffPlace) & ~1 : (fromStaffPlace + 1) & ~1;
        let ledgerLineIsBelowStaff = (fromStaffPlace < 0);
        if (ledgerLineIsBelowStaff) {
            for (let i = nearestEvenStaffPlace; i < 0; i += 2) {
                const y = this.yFromStaffPlace(i);
                this.score.appendLine([this.headPosition.x, y], [this.headPosition.x + 16, y])
                    .addClass("ledgerLine");
            }
        }
        else {
            for (let i = nearestEvenStaffPlace; i > 0; i -= 2) {
                const y = this.yFromStaffPlace(i);
                this.score.appendLine([this.headPosition.x, y], [this.headPosition.x + 16, y])
                    .addClass("ledgerLine");
            }
        }
    }
    engraveChord(notes, staffPlace) {
        // engrave
    }
    engraveNoteHead(noteHeadType) {
    }
    engraveTimeSignature(bpm, beatUnit) {
        this.moveHead(undefined, 4 * 2);
        this.engraveGlyph(`timeSig${bpm}`, false);
        this.moveHead(undefined, 4 * 6);
        this.engraveGlyph(`timeSig${beatUnit}`);
        return this;
    }
    engraveGlyph(glyphName, advanceHead = true) {
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
        if (advanceHead) {
            this.moveHead(glyphSVG.width);
        }
        return glyphSVG;
    }
    moveHead(advancement, verticalPosition) {
        if (advancement !== undefined) {
            this.headPosition.x += advancement;
        }
        if (verticalPosition !== undefined) {
            this.headPosition.y = verticalPosition;
        }
    }
    print() {
        return this.viewport.element;
    }
    yFromStaffPlace(staffPlace) {
        return 32 - 4 * staffPlace;
    }
}
class SVG {
    static make() {
        const svg = new SVG("svg");
        return svg.addClass("viewport");
    }
    constructor(elementName) {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    }
    get element() {
        return this._element;
    }
    get width() {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions
        return Number(this._element.getAttribute("width"));
    }
    // CHILDREN ELEMENT APPENDER
    appendSVG() {
        return this.appendChild("svg");
    }
    appendText(text) {
        return this.appendChild("text").textContent(text);
    }
    appendStyle(style) {
        return this.appendChild("defs")
            .appendChild("style")
            .textContent(style);
    }
    appendLine(startingPoint, endingPoint) {
        return this.appendChild("line")
            .attr("x1", startingPoint[0])
            .attr("y1", startingPoint[1])
            .attr("x2", endingPoint[0])
            .attr("y2", endingPoint[1]);
    }
    // PROPERTY MANIPULATOR
    id(id) {
        return this.attr("id", id);
    }
    move(x, y) {
        if (x) {
            this.attr("x", x);
        }
        if (y) {
            this.attr("y", y);
        }
        return this;
    }
    size(width, height) {
        return this.attr("width", width)
            .attr("height", height);
    }
    appendChild(elementName) {
        const child = new SVG(elementName);
        this._element.appendChild(child.element);
        return child;
    }
    attr(k, v) {
        this._element.setAttribute(k, `${v}`);
        return this;
    }
    addClass(className) {
        this._element.classList.add(className);
        return this;
    }
    textContent(text) {
        this._element.textContent = text;
        return this;
    }
    bbox() {
        if (!document.body.contains(this._element)) {
            throw Error("element must be rendered to have a bounding box.");
        }
        if (this._element instanceof SVGGraphicsElement) {
            return this._element.getBBox();
        }
        throw Error("element does not have a bounding box.");
    }
}
//# sourceMappingURL=SVGEngraver.js.map