import glyphTable from "../GlyphTable.js";
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
const STEP_NAMES = "cdefgab";
export default class SVGEngraver {
    constructor(width, height, meta) {
        this.headPosition = { x: 0, y: 0 };
        this.currentState = {};
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
                stroke-width: ${nn(engravingDefaults.staffLineThickness * STAFF_SPACE)}px;
                stroke: #000;
            }
            
            line.ledgerLine {
                stroke-width: ${nn(engravingDefaults.ledgerLineThickness * STAFF_SPACE)}px;
            }
            
            line.stem {
                stroke-width: ${nn(engravingDefaults.stemThickness * STAFF_SPACE)}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
            `);
    }
    static create(width, height) {
        return fetch("./fonts/bravura/bravura_metadata.json")
            .then(response => response.json())
            .then((meta) => new SVGEngraver(width, height, meta));
    }
    engraveBarLineSingle() {
        const barLine = this.score.appendSVG()
            .move(this.headPosition.x, this.headPosition.y)
            .appendLine([0, 0], [0, 32])
            .addClass("barLineSingle");
        return this;
    }
    engraveStaves(width) {
        for (let i = 0; i < 10; i += 2) {
            this.moveHead(undefined, i / 2);
            this.engraveStaffLine(width)
                .addClass("staffLine");
        }
        return this;
    }
    engraveClef(clefSign, staffPlace) {
        let clefGlyphName = "";
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
    engraveStaffLine(width) {
        return this.score.appendSVG()
            .move(this.headPosition.x, this.headPosition.y)
            .appendLine([0, 0], [width * STAFF_SPACE, 0]);
    }
    engraveLedgerLine(width, fromStaffPlace) {
        let engraveOffsetLine = (staffPlace) => {
            this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
            this.engraveStaffLine(width)
                .addClass("ledgerLine")
                .translate(nn(-this.meta["engravingDefaults"]["ledgerLineExtension"] / 2 * STAFF_SPACE));
        };
        let nearestEvenStaffPlace = fromStaffPlace > 0 ? (fromStaffPlace) & ~1 : (fromStaffPlace + 1) & ~1;
        let ledgerLineIsBelowStaff = (fromStaffPlace < 0);
        if (ledgerLineIsBelowStaff) {
            for (let i = nearestEvenStaffPlace; i < 0; i += 2) {
                engraveOffsetLine(i);
            }
        }
        else {
            for (let i = nearestEvenStaffPlace; i > 9; i -= 2) {
                engraveOffsetLine(i);
            }
        }
    }
    engraveChord(notes) {
        if (notes.length < 1) {
            throw new Error("empty chord");
        }
        let staffBottomPlace = 34;
        if (this.currentState.clefSign === "f") {
            staffBottomPlace = 31;
        }
        let staffPlaceFromOctaveAndStep = (octave, step) => {
            return octave * 8 + STEP_NAMES.indexOf(step) - staffBottomPlace;
        };
        let lowestNote = notes[0];
        let lowestStaffPlace = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace = lowestStaffPlace;
        let noteWidthFromBBox = (bbox) => {
            return nn(bbox["bBoxNE"][0] - bbox["bBoxSW"][0]);
        };
        let bboxes = this.meta["glyphBBoxes"];
        let noteWidth;
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
            let noteHead;
            if (isAdjacentNote) {
                noteHead = this.engraveNoteHead(note.type, displacement, staffPlace);
            }
            else {
                noteHead = this.engraveNoteHead(note.type, 0, staffPlace);
            }
            let ledgerNeeded = (staffPlace < 0 || staffPlace > 9);
            if (ledgerNeeded) {
                this.engraveLedgerLine(nn(noteWidth + this.meta["engravingDefaults"]["ledgerLineExtension"]), staffPlace);
            }
            lastStaffPlace = staffPlace;
        }
    }
    engraveStem(offset, staffPlaceTop, staffPlaceBottom) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlaceTop));
        return this.score.appendSVG()
            .move(this.headPosition.x, this.headPosition.y)
            .size(32, 32)
            .appendLine([0, 0], [0, (staffPlaceTop - staffPlaceBottom) * 4])
            .addClass("stem")
            .translate(offset);
    }
    engraveNoteHead(noteHeadType, offset, staffPlace) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        let glyphNote;
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
    engraveTimeSignature(bpm, beatUnit) {
        this.moveHead(undefined, 1);
        this.engraveGlyph(`timeSig${bpm}`, 0);
        this.moveHead(undefined, 3);
        this.engraveGlyph(`timeSig${beatUnit}`, 0);
        return this;
    }
    engraveGlyph(glyphName, offset) {
        const glyphChar = glyphTable[glyphName];
        let glyphNameNotFound = (glyphChar === undefined);
        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }
        const glyphText = this.score.appendSVG()
            .size(32, 128)
            .move(this.headPosition.x, this.headPosition.y)
            .appendText(glyphChar)
            .translate(offset * STAFF_SPACE)
            .addClass("glyph");
        return glyphText.viewport;
    }
    moveHead(xx, y) {
        if (xx !== undefined) {
            this.headPosition.x += xx * STAFF_SPACE;
        }
        if (y !== undefined) {
            this.headPosition.y = y * STAFF_SPACE;
        }
    }
    resetHead() {
        this.headPosition = { x: 0, y: 0 };
    }
    print() {
        return this.score.viewport.element;
    }
    topMarginFromStaffPlace(staffPlace) {
        return 4 - staffPlace / 2;
    }
}
class SVG {
    static make() {
        const svg = new SVG("svg");
        return svg.addClass("viewport");
    }
    constructor(el) {
        if (el instanceof SVGGraphicsElement) {
            this._element = el;
        }
        else {
            this._element = document.createElementNS("http://www.w3.org/2000/svg", el);
        }
    }
    // ATTRIBUTE GETTERS
    get element() {
        return this._element;
    }
    get width() {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions
        return Number(this._element.getAttribute("width"));
    }
    get actualWidth() {
        return this.bbox.width;
    }
    get viewport() {
        const viewport = this._element.viewportElement;
        return viewport === null ? this : (new SVG(viewport));
    }
    get bbox() {
        if (!document.body.contains(this._element)) {
            throw Error("element must be rendered to have a bounding box.");
        }
        if (this._element instanceof SVGGraphicsElement) {
            return this._element.getBBox();
        }
        throw Error("element does not have a bounding box.");
    }
    // CHILDREN ELEMENT APPENDERS
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
    appendRect(width, height) {
        return this.appendChild("rect")
            .size(width, height);
    }
    // PROPERTY MANIPULATORS
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
    translate(x, y) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        if (this.element instanceof SVGSVGElement) {
            throw new Error("transform does not work on SVGSVGElement");
        }
        const transform = this.viewport.element.createSVGTransform();
        transform.setTranslate(x ? x : 0, y ? y : 0);
        this.element.transform.baseVal.appendItem(transform);
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
    // LAYOUT HELPERS
    alignCenter() {
        const leftPadding = (this.viewport.width - this.actualWidth) / 2;
        return this.translate(leftPadding);
    }
}
function nn(value) {
    let n = Number(value);
    if (Number.isNaN(n)) {
        throw new Error("value is not a number");
    }
    return n;
}
//# sourceMappingURL=SVGEngraver.js.map