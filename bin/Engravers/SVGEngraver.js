import * as SMuFL from '../Schema/SMuFL.js';
import { Note, Rest, Chord } from '../Schema/Music.js'; // FIX
import log from '../Utilities/Logger.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
const STAFF_PLACE_MIDDLE_LINE = 4;
const STAFF_PLACE_TOP_LINE = 9;
const STAFF_PLACE_BOTTOM_LINE = 0;
const STAFF_PLACE_SPAN_OCTAVE = 7;
const STEP_NAMES = 'cdefgab';
export default class SVGEngraver {
    constructor(width, height) {
        this.headPosition = { x: 0, y: 0 };
        this.state = {
            beams: [],
            clefSign: 'G'
        };
        this.refs = {};
        this.createInvisibleSVG();
        this.meta = SMuFL.load('Bravura');
        this.width = width;
        this.height = height;
        let viewport = SVG.create('svg')
            .addClass('viewport')
            .size(width, height);
        this.score = viewport.appendSVG()
            .move(5, 5);
        this.score
            .appendStyle(`
            @font-face {
                font-family: "Bravura";
                src: url(./Fonts/bravura/woff/Bravura.woff) format("woff");
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
                stroke-width: ${this.defaults.staffLineThickness * STAFF_SPACE}px;
                stroke: #000;
            }
            
            rect.stem {
            }
            
            polygon.beam {
                fill: red;
            }
            
            line.ledgerLine {
                stroke-width: ${this.defaults.legerLineThickness * STAFF_SPACE}px;
            }
            
            line.barLineSingle {
                stroke-linecap: square;
            }
            `);
    }
    static create(width, height) {
        return new SVGEngraver(width, height);
    }
    createInvisibleSVG() {
        this.invisibleSVG = SVG.create('svg')
            .attr('style', 'position: absolute; z-index: -100000; visibility: hidden;');
        document.body.appendChild(this.invisibleSVG.element);
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
        switch (clefSign) {
            case 'G':
                clefGlyphName = 'gClef';
                break;
            default:
                throw new Error('unknown clef type');
        }
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        this.engraveGlyph(clefGlyphName, 0);
        this.state.clefSign = clefSign;
        this.moveHead(4);
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
            let line = SVG.createLine([width, 0])
                .addClass('ledgerLine')
                .translate(-this.defaults.legerLineExtension / 2);
            return this.engraveElement(line);
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
    createMark(mark) {
        if (mark instanceof Chord) {
            return this.createChord(mark);
        }
        else if (mark instanceof Rest) {
            return this.createRest(mark);
        }
        throw new Error();
    }
    createChord(chord) {
        log('createChord', chord);
        // ensureNonEmptyChord
        let chordHasNoNotes = chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }
        let chordSVG = this.drawSVG(chord.id, 'chord');
        chord.notes.forEach((noteRest, i) => {
            if (noteRest instanceof Note) {
                let note = noteRest;
                let noteSVG = this.createNote(note);
                // checkAdjacentNotes
                let lastNote = chord.notes[i - 1] ? chord.notes[i - 1] : note;
                let isNotThirds = note.getIntervalTo(chord.lowestNote) % 3 !== 0;
                let isSecond = note.getIntervalTo(lastNote) === 2;
                let isAdjacent = isNotThirds && isSecond;
                if (isAdjacent) {
                    noteSVG.translate(noteSVG.width);
                }
                chordSVG.appendElement(noteSVG);
            }
        });
        log(true);
        return chordSVG;
    }
    createNote(note) {
        log('createNote', note);
        let noteSVG = this.drawSVG(note.id, 'note');
        let noteHeadSVG = this.drawNoteHead(note.type);
        noteSVG.appendElement(noteHeadSVG);
        log(true);
        return noteSVG;
    }
    drawSVG(id, type) {
        let element = SVG.create('svg')
            .addClass(`id-${id}`)
            .addClass(type);
        this.refs[id] = element;
        this.invisibleSVG.appendElement(element);
        return element;
    }
    drawNoteHead(type) {
        let noteheadGlyphNames = {
            'whole': 'noteWhole',
            'half': 'noteheadHalf',
            'quarter': 'noteheadBlack',
            'eighth': 'noteheadBlack',
            '16th': 'noteheadBlack',
            '32nd': 'noteheadBlack'
        };
        let noteheadGlyphName = noteheadGlyphNames[type];
        let glyphNameNotFound = (!noteheadGlyphName);
        if (glyphNameNotFound) {
            throw new Error('unknown note type');
        }
        return this.drawGlyph(noteheadGlyphName);
    }
    drawGlyph(glyphName) {
        let codePoints = this.codePoints[glyphName];
        let glyphCodePointsNotFound = (codePoints === undefined);
        if (glyphCodePointsNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }
        return SVG.createText(codePoints.codepoint)
            .addClass('glyph');
    }
    createRest(rest) {
        return this.drawSVG(rest.id, 'rest');
    }
    engraveChord(chord) {
        let notes = chord.notes;
        if (notes.length < 1) {
            throw new Error('empty chord');
        }
        let startingStaffPlace = 30;
        if (this.state.clefSign === 'F') {
            startingStaffPlace = 18;
        }
        let staffPlaceFromOctaveAndStep = (octave, step) => {
            return octave * 7 + STEP_NAMES.indexOf(step) - startingStaffPlace;
        };
        let lowestNote = notes[0];
        let lowestStaffPlace = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace = lowestStaffPlace;
        let noteWidthFromBBox = (bbox) => {
            return bbox['bBoxNE'][0] - bbox['bBoxSW'][0];
        };
        let noteWidth;
        switch (lowestNote.type) {
            case 'whole':
                noteWidth = noteWidthFromBBox(this.bboxes['noteWhole']);
                break;
            case 'half':
                noteWidth = noteWidthFromBBox(this.bboxes['noteheadHalf']);
                break;
            case 'quarter':
            case 'eighth':
            case '16th':
            case '32nd':
                noteWidth = noteWidthFromBBox(this.bboxes['noteheadBlack']);
                break;
            default:
                throw new Error('unknown note type');
        }
        let displacement = noteWidth - this.defaults.stemThickness;
        for (let i = 0; i < notes.length; ++i) {
            if (notes[i] instanceof Rest) {
                return;
            }
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
                this.engraveLedgerLine(noteWidth + this.defaults.legerLineExtension, staffPlace);
            }
            lastStaffPlace = staffPlace;
        }
        let stemNeeded = (lowestNote.type !== 'whole');
        let highestNote = notes[notes.length - 1];
        if (stemNeeded) {
            let noteAnchors;
            switch (lowestNote.type) {
                case 'whole':
                    noteAnchors = this.anchors['noteWhole'];
                    break;
                case 'half':
                case 'quarter':
                case 'eighth':
                case '16th':
                case '32nd':
                    noteAnchors = this.anchors['noteheadHalf'];
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
                    x: noteAnchors['stemUpSE'][0] - this.defaults.stemThickness,
                    y: -noteAnchors['stemUpSE'][1]
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
                    x: noteAnchors['stemDownNW'][0],
                    y: -noteAnchors['stemDownNW'][1]
                };
            }
            this.engraveStem(stemStaffPlaceBottom, stemStaffPlaceTop, stemOffsets);
            let beamsNeeded = (lowestNote.beams !== undefined);
            let flagNeeded = (['eighth', '16th', '32nd', '64th'].indexOf(lowestNote.type) !== -1) && !beamsNeeded;
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
                let flagAnchor = this.anchors[flagType];
                let flagOffsets;
                if (flagAnchor && flagAnchor['stemUpNW']) {
                    if (stemPointsUp) {
                        flagOffsets = {
                            x: stemOffsets.x + flagAnchor['stemUpNW'][0] - this.defaults.stemThickness,
                            y: stemOffsets.y + flagAnchor['stemUpNW'][1]
                        };
                    }
                    else {
                        flagOffsets = {
                            x: stemOffsets.x + flagAnchor['stemUpNW'][0] + this.defaults.stemThickness,
                            y: stemOffsets.y + flagAnchor['stemUpNW'][1]
                        };
                    }
                }
                else {
                    flagOffsets = stemOffsets;
                }
                this.engraveFlag(flagType, stemStaffPlaceTop, flagOffsets);
            }
            else if (beamsNeeded) {
                for (let beam of lowestNote.beams) {
                    switch (beam.type) {
                        case "begin":
                            this.state.beams[beam.number] = [this.headPosition.x, stemPointsUp ? stemStaffPlaceTop : stemStaffPlaceBottom];
                            break;
                        case "end":
                            let beamOffsets = { x: stemOffsets.x, y: 0 };
                            let leftNote = this.state.beams[beam.number];
                            let rightNote = [this.headPosition.x, stemPointsUp ? stemStaffPlaceTop : stemStaffPlaceBottom];
                            if (beam.number <= 2) {
                                let beamSpacing = (this.defaults.beamThickness + this.defaults.beamSpacing) * (beam.number - 1);
                                beamOffsets.y += stemPointsUp ? beamSpacing : -beamSpacing;
                                beamOffsets.y -= stemPointsUp ? 0 : this.defaults.beamThickness;
                            }
                            this.temporarilyMoveHeadTo(leftNote[0], leftNote[1], () => {
                                let beamWidth = rightNote[0] - leftNote[0];
                                this.engraveBeam(leftNote[1], rightNote[1], beamWidth, beamOffsets);
                            });
                            break;
                    }
                }
            }
        }
        let basicSpacing = 1.5;
        let extraSpacing = ['32nd', '16th', 'eighth', 'quarter', 'half', 'whole'].indexOf(lowestNote.type);
        this.moveHead(basicSpacing + extraSpacing);
    }
    engraveFlag(flagType, staffPlace, offsets) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        return this.engraveGlyph(flagType, offsets.x);
    }
    engraveBeam(staffPlaceLeft, staffPlaceRight, width, offsets) {
        console.log('aaa');
        console.log(staffPlaceLeft, staffPlaceRight);
        staffPlaceLeft = this.topMarginFromStaffPlace(staffPlaceLeft);
        staffPlaceRight = this.topMarginFromStaffPlace(staffPlaceRight);
        console.log(staffPlaceLeft, staffPlaceRight);
        this.moveHead(undefined, staffPlaceLeft);
        let pointNW = [0, 0];
        let pointNE = [width, staffPlaceRight - staffPlaceLeft];
        let pointSW = [0, staffPlaceRight - staffPlaceLeft + this.defaults.beamThickness];
        let pointSE = [width, this.defaults.beamThickness];
        let beam = SVG.createPolygon([pointNW, pointNE, pointSE, pointSW])
            .addClass("beam")
            .translate(offsets.x, offsets.y);
        return this.engraveElement(beam);
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
        let stem = SVG.createRect(this.defaults.stemThickness, height)
            .addClass('stem')
            .translate(offsets.x, offsets.y);
        return this.engraveElement(stem);
    }
    engraveNoteHead(noteHeadType, offsetX, staffPlace) {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));
        let glyphName = {
            'whole': 'noteWhole',
            'half': 'noteheadHalf',
            'quarter': 'noteheadBlack',
            'eighth': 'noteheadBlack',
            '16th': 'noteheadBlack',
            '32nd': 'noteheadBlack'
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
        this.moveHead(4);
        return this;
    }
    engraveGlyph(glyphName, offsetX) {
        let codePoints = this.codePoints[glyphName];
        let glyphNameNotFound = (codePoints === undefined);
        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }
        let glyphText = SVG.createText(codePoints.codepoint)
            .addClass('glyph')
            .translate(offsetX);
        return this.engraveElement(glyphText);
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
    temporarilyMoveHeadTo(x, y, callback) {
        let originalHeadPosition = this.headPosition;
        this.headPosition = { x: x, y: y };
        callback();
        this.headPosition = originalHeadPosition;
    }
    resetHead() {
        this.headPosition = { x: 0, y: 0 };
    }
    print() {
        return this.score.viewport.element;
    }
    get defaults() {
        return this.meta.engravingDefaults;
    }
    get anchors() {
        return this.meta.glyphsWithAnchors;
    }
    get bboxes() {
        return this.meta.glyphBBoxes;
    }
    get codePoints() {
        return this.meta.glyphnames;
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
    static createPolygon(points) {
        points = points.map(p => [p[0] * STAFF_SPACE, p[1] * STAFF_SPACE]);
        return SVG.create('polygon')
            .attr('points', points.map(p => p.join(',')).join(' '));
    }
    constructor(el) {
        if (el instanceof SVGGraphicsElement) {
            this.childElement = el;
        }
        else {
            this.childElement = document.createElementNS('http://www.w3.org/2000/svg', el);
        }
    }
    // ATTRIBUTE GETTERS
    get element() {
        return this.childElement;
    }
    get width() {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions
        return this.bbox.width;
    }
    get viewport() {
        const viewport = this.childElement.viewportElement;
        return viewport === null ? this : (new SVG(viewport));
    }
    get bbox() {
        if (!document.body.contains(this.element)) {
            throw Error("element must be rendered to have a bounding box.");
        }
        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }
        throw Error("element does not have a bounding box.");
    }
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
        this.childElement.appendChild(child.element);
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
        if (!SVG.transfomer) {
            SVG.transfomer = SVG.create("svg").element;
        }
        let transform = SVG.transfomer.createSVGTransform();
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
        this.childElement.appendChild(child.element);
        return child;
    }
    attr(k, v) {
        this.childElement.setAttribute(k, `${v}`);
        return this;
    }
    addClass(className) {
        this.childElement.classList.add(className);
        return this;
    }
    textContent(text) {
        this.childElement.textContent = text;
        return this;
    }
}
class Glyph {
    constructor() {
        if (!Glyph.invisibleSVG) {
            Glyph.invisibleSVG = Glyph.createElement('svg');
            document.body.appendChild(Glyph.invisibleSVG);
        }
        this.meta = SMuFL.load('Bravura');
        this.draw();
    }
    get width() {
        return this.bbox.width;
    }
    get bbox() {
        if (!document.body.contains(this.element)) {
            throw Error("element must be rendered to have a bounding box.");
        }
        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }
        throw Error("element does not have a bounding box.");
    }
    append(glyph) {
        this.element.appendChild(glyph.element);
    }
    draw() {
        this.element = Glyph.createElement('svg');
    }
    static createElement(name) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);
        return element;
    }
}
class CharGlyph extends Glyph {
    constructor(charName) {
        super();
        this.charName = charName;
    }
    draw() {
        let textElement = Glyph.createElement('text');
        let codePoints = this.meta.glyphnames[this.charName];
        if (!codePoints.codepoint) {
            throw new Error();
        }
        this.element.appendChild(textElement);
    }
}
class NoteGlyph extends Glyph {
    constructor(note) {
        super();
        this.note = note;
        this.draw();
    }
    draw() {
        this.drawNoteHead();
    }
    drawNoteHead() {
        let noteheadGlyphNames = {
            'whole': 'noteWhole',
            'half': 'noteheadHalf',
            'quarter': 'noteheadBlack',
            'eighth': 'noteheadBlack',
            '16th': 'noteheadBlack',
            '32nd': 'noteheadBlack'
        };
        let noteheadGlyphName = noteheadGlyphNames[this.note.type];
        let glyphNameNotFound = (!noteheadGlyphName);
        if (glyphNameNotFound) {
            throw new Error('unknown note type');
        }
        let charGlyph = new CharGlyph(noteheadGlyphName);
        this.append(charGlyph);
    }
}
//# sourceMappingURL=SVGEngraver.js.map