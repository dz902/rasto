import glyphTable from '../GlyphTable.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
const STAFF_PLACE_MIDDLE_LINE = 4;
const STAFF_PLACE_TOP_LINE = 9;
const STAFF_PLACE_BOTTOM_LINE = 0;
const STAFF_PLACE_SPAN_OCTAVE = 7;
const STEP_NAMES = 'cdefgab';
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
            
            line.staffLine, line.barLineSingle, line.ledgerLine {
                stroke-width: ${nn(engravingDefaults.staffLineThickness * STAFF_SPACE)}px;
                stroke: #000;
            }
            
            rect.stem {
                fill: red;
            }
            
            line.ledgerLine {
                stroke-width: ${nn(engravingDefaults['legerLineThickness'] * STAFF_SPACE)}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
            `);
    }
    static create(width, height) {
        return fetch('./fonts/bravura/bravura_metadata.json')
            .then(response => response.json())
            .then((meta) => new SVGEngraver(width, height, meta));
    }
    engraveBarLineSingle() {
        let line = SVG.createLine([0, 4])
            .addClass('barLineSingle');
        return this.engraveElement(line);
    }
    engraveStaves(width) {
        for (let i = 0; i < 5; ++i) {
            this.moveHead(undefined, i);
            this.engraveStaffLine(width);
        }
        return this;
    }
    engraveClef(clefSign, staffPlace) {
        let clefGlyphName = '';
        switch (clefSign.toLowerCase()) {
            case 'g':
                clefGlyphName = 'gClef';
                break;
            default:
                throw new Error('unknown clef type');
        }
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        this.engraveGlyph(clefGlyphName, 0);
        this.currentState.clefSign = clefSign;
        return this;
    }
    engraveStaffLine(width) {
        let line = SVG.createLine([width, 0])
            .addClass('staffLine');
        return this.engraveElement(line);
    }
    engraveLedgerLine(width, fromStaffPlace) {
        let engraveOffsetLine = (staffPlace) => {
            this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
            this.engraveStaffLine(width)
                .addClass('ledgerLine')
                .translate(nn(-this.meta['engravingDefaults']['legerLineExtension'] / 2));
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
            throw new Error('empty chord');
        }
        let startingStaffPlace = 30;
        if (this.currentState.clefSign === 'f') {
            startingStaffPlace = 18;
        }
        let staffPlaceFromOctaveAndStep = (octave, step) => {
            return octave * 7 + STEP_NAMES.indexOf(step) - startingStaffPlace;
        };
        let lowestNote = notes[0];
        let lowestStaffPlace = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace = lowestStaffPlace;
        let noteWidthFromBBox = (bbox) => {
            return nn(bbox['bBoxNE'][0] - bbox['bBoxSW'][0]);
        };
        let bboxes = this.meta['glyphBBoxes'];
        let noteWidth;
        switch (lowestNote.type) {
            case 'whole':
                noteWidth = noteWidthFromBBox(bboxes['noteWhole']);
                break;
            case 'half':
                noteWidth = noteWidthFromBBox(bboxes['noteheadHalf']);
                break;
            case 'quarter':
            case 'eighth':
            case '16th':
            case '32th':
                noteWidth = noteWidthFromBBox(bboxes['noteheadBlack']);
                break;
            default:
                throw new Error('unknown note type');
        }
        let displacement = noteWidth - nn(this.meta['engravingDefaults']['stemThickness']);
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
            let ledgerNeeded = (staffPlace < STAFF_PLACE_BOTTOM_LINE || staffPlace > STAFF_PLACE_TOP_LINE);
            if (ledgerNeeded) {
                this.engraveLedgerLine(nn(noteWidth + this.meta['engravingDefaults']['legerLineExtension']), staffPlace);
            }
            lastStaffPlace = staffPlace;
        }
        let stemNeeded = (lowestNote.type !== 'whole');
        let highestNote = notes[notes.length - 1];
        if (stemNeeded) {
            let noteAnchors = this.meta['glyphsWithAnchors'];
            switch (lowestNote.type) {
                case 'whole':
                    noteAnchors = noteAnchors['noteWhole'];
                    break;
                case 'half':
                case 'quarter':
                case 'eighth':
                case '16th':
                case '32th':
                    noteAnchors = noteAnchors['noteheadHalf'];
                    break;
                default:
                    throw new Error('unknown note type');
            }
            let stemStaffPlaceTop, stemStaffPlaceBottom, stemOffsets;
            let highestStaffPlace = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);
            let onlyLedgerNotes = (highestStaffPlace < STAFF_PLACE_BOTTOM_LINE && lowestStaffPlace < STAFF_PLACE_BOTTOM_LINE) ||
                (highestStaffPlace > STAFF_PLACE_TOP_LINE && lowestStaffPlace > STAFF_PLACE_TOP_LINE);
            let stemPointsUp = (highestStaffPlace < STAFF_PLACE_MIDDLE_LINE) ||
                (highestStaffPlace - STAFF_PLACE_MIDDLE_LINE < STAFF_PLACE_MIDDLE_LINE - lowestStaffPlace);
            if (stemPointsUp) {
                if (onlyLedgerNotes) {
                    stemStaffPlaceTop = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                }
                else {
                    stemStaffPlaceTop = highestStaffPlace + STAFF_PLACE_SPAN_OCTAVE;
                }
                stemStaffPlaceBottom = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
                stemOffsets = {
                    x: nn(noteAnchors['stemUpSE'][0]),
                    y: nn(-noteAnchors['stemUpSE'][1])
                };
            }
            else {
                if (onlyLedgerNotes) {
                    stemStaffPlaceBottom = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                }
                else {
                    stemStaffPlaceBottom = lowestStaffPlace - STAFF_PLACE_SPAN_OCTAVE;
                }
                stemStaffPlaceTop = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);
                stemOffsets = {
                    x: nn(noteAnchors['stemDownNW'][0]) + nn(this.meta['engravingDefaults']['stemThickness']),
                    y: nn(-noteAnchors['stemDownNW'][1])
                };
            }
            this.engraveStem(stemStaffPlaceBottom, stemStaffPlaceTop, stemOffsets);
            let flagNeeded = (['eighth', '16th', '32th', '64th'].indexOf(lowestNote.type) !== -1);
            if (flagNeeded) {
                let flagType;
                switch (lowestNote.type) {
                    case 'eighth':
                        flagType = 'flag8th';
                        break;
                    default:
                        flagType = 'flag' + lowestNote.type;
                }
                if (stemPointsUp) {
                    flagType += 'Up';
                }
                else {
                    flagType += 'Down';
                }
                let flagAnchor = this.meta['glyphsWithAnchors'][flagType];
                let flagOffsets = {
                    x: stemOffsets.x + nn(flagAnchor['stemUpNW'][0]) - nn(this.meta['engravingDefaults']['stemThickness']),
                    y: stemOffsets.y + nn(flagAnchor['stemUpNW'][1])
                };
                flagOffsets.x;
                this.engraveFlag(flagType, stemStaffPlaceTop, flagOffsets);
            }
        }
    }
    engraveFlag(flagType, staffPlace, offsets) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        return this.engraveGlyph(flagType, offsets.x);
    }
    engraveStem(staffPlaceBottom, staffPlaceTop, offsets) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlaceTop));
        // y offset is compensated to make sure stem touches the right line as desired
        let height = Math.abs(staffPlaceTop - staffPlaceBottom) / 2;
        let movingUp = offsets.y < 0;
        if (movingUp) {
            height += offsets.y;
            offsets.y = 0;
        }
        else {
            height -= offsets.y;
        }
        let stem = SVG.createRect(nn(this.meta['engravingDefaults']['stemThickness']), height)
            .addClass('stem');
        return this.engraveElement(stem)
            .translate(offsets.x - nn(this.meta['engravingDefaults']['stemThickness']), offsets.y);
    }
    engraveNoteHead(noteHeadType, offsetX, staffPlace) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        let glyphName = {
            'whole': 'noteWhole',
            'half': 'noteheadHalf',
            'quarter': 'noteheadBlack',
            'eighth': 'noteheadBlack',
            '16th': 'noteheadBlack',
            '32th': 'noteheadBlack'
        };
        let glyphNameNotFound = (!glyphName[noteHeadType]);
        if (glyphNameNotFound) {
            throw new Error('unknown note type');
        }
        return this.engraveGlyph(glyphName[noteHeadType], offsetX);
    }
    engraveTimeSignature(bpm, beatUnit) {
        this.moveHead(undefined, 1);
        this.engraveGlyph(`timeSig${bpm}`, 0);
        this.moveHead(undefined, 3);
        this.engraveGlyph(`timeSig${beatUnit}`, 0);
        return this;
    }
    engraveGlyph(glyphName, offsetX) {
        const glyphChar = glyphTable[glyphName];
        let glyphNameNotFound = (glyphChar === undefined);
        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }
        let glyphText = SVG.createText(glyphChar)
            .addClass('glyph');
        let glyph = this.engraveElement(glyphText)
            .translate(offsetX);
        return glyph;
    }
    engraveElement(element) {
        let svg = this.score.appendSVG()
            .move(this.headPosition.x, this.headPosition.y);
        let child = svg.appendElement(element);
        return child;
    }
    moveHead(xx, y) {
        if (xx !== undefined) {
            this.headPosition.x += xx;
        }
        if (y !== undefined) {
            this.headPosition.y = y;
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
    static create(elementName) {
        return new SVG(elementName);
    }
    static createText(text) {
        return SVG.create('text').textContent(text);
    }
    static createLine(endingPoint) {
        return SVG.create('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', endingPoint[0] * STAFF_SPACE)
            .attr('y2', endingPoint[1] * STAFF_SPACE);
    }
    static createRect(width, height) {
        return SVG.create('rect')
            .size(width, height);
    }
    static make() {
        const svg = new SVG('svg');
        return svg.addClass('viewport');
    }
    constructor(el) {
        if (el instanceof SVGGraphicsElement) {
            this._element = el;
        }
        else {
            this._element = document.createElementNS('http://www.w3.org/2000/svg', el);
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
        return Number(this._element.getAttribute('width'));
    }
    //
    // get actualWidth(): number {
    //     return this.bbox.width;
    // }
    get viewport() {
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
    appendSVG() {
        return this.appendChild('svg');
    }
    appendStyle(style) {
        return this.appendChild('defs')
            .appendChild('style')
            .textContent(style);
    }
    appendElement(child) {
        this._element.appendChild(child.element);
        return child;
    }
    // PROPERTY MANIPULATORS
    id(id) {
        return this.attr('id', id);
    }
    move(x, y) {
        if (x) {
            this.attr('x', x * STAFF_SPACE);
        }
        if (y) {
            this.attr('y', y * STAFF_SPACE);
        }
        return this;
    }
    translate(x, y) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        if (this.element instanceof SVGSVGElement) {
            throw new Error('transform does not work on SVGSVGElement');
        }
        let transform = this.element.viewportElement.createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);
        this.element.transform.baseVal.appendItem(transform);
        return this;
    }
    size(width, height) {
        return this.attr('width', width * STAFF_SPACE)
            .attr('height', height * STAFF_SPACE);
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
}
function nn(value) {
    let n = Number(value);
    if (Number.isNaN(n)) {
        throw new Error('value is not a number');
    }
    return n;
}
//# sourceMappingURL=SVGEngraver.js.map