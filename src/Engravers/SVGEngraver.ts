import * as SMuFL from '../Schema/SMuFL.js';
import { Mark, Note, Rest, NoteRest, Chord } from '../Schema/Music.js';  // FIX
import Engraver from '../Engraver.js';
import log from '../Utilities/Logger.js';

const EM = 32;
const STAFF_SPACE = 0.25 * EM;
const STAFF_PLACE_MIDDLE_LINE = 4;
const STAFF_PLACE_TOP_LINE = 9;
const STAFF_PLACE_BOTTOM_LINE = 0;
const STAFF_PLACE_SPAN_OCTAVE = 7;
const STEP_NAMES = 'cdefgab';

export class SVGEngraver implements Engraver {
    private invisibleSVG: SVG;
    private headPosition: { x: number, y: number } = { x: 0, y: 0 };
    private score: SVG;
    private width: number;
    private height: number;
    private meta: SMuFL.CombinedMeta;
    private state: EngravingState = {
        beams: [],
        clefSign: 'G'
    };
    private refs: { [id: string]: SVG } = {};

    static create(width: number, height: number): SVGEngraver {
        return new SVGEngraver(width, height);
    }

    private createInvisibleSVG(): void {
        this.invisibleSVG = SVG.create('svg')
                               .attr('style', 'position: absolute; z-index: -100000; visibility: hidden;');

        document.body.appendChild(this.invisibleSVG.element);
    }

    private constructor(width: number, height: number) {
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

    engraveBarLineSingle(): SVG {
        let line = SVG.createLine([0, 4])
                      .addClass('barLineSingle');

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
        let clefGlyphName: string = '';

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

    engraveStaffLine(width: number): SVG {
        let line = SVG.createLine([width, 0])
                      .addClass('staffLine');

        return this.engraveElement(line);
    }

    engraveLedgerLine(width: number, fromStaffPlace: number): void {
        let engraveOffsetLine = (staffPlace: number) => {
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
        } else {
            for (let i = nearestEvenStaffPlace; i > 9; i -= 2) {
                engraveOffsetLine(i);
            }
        }
    }

    createMark(mark: Mark): SVG {
        if (mark instanceof Chord) {
            return this.createChord(mark);
        } else if (mark instanceof Rest) {
            return this.createRest(mark);
        }

        throw new Error();
    }

    createChord(chord: Chord): SVG {
        log('createChord', chord);

        // ensureNonEmptyChord

        let chordHasNoNotes: boolean = chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }

        let chordSVG = this.drawSVG(chord.id, 'chord');

        chord.notes.forEach((noteRest: NoteRest, i: number) => {
            if (noteRest instanceof Note) {
                let note: Note = noteRest;
                let noteSVG = this.createNote(note);

                // checkAdjacentNotes

                let lastNote = chord.notes[i-1] ? chord.notes[i-1] : note;
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

    createNote(note: Note): SVG {
        log('createNote', note);

        let noteSVG = this.drawSVG(note.id, 'note');
        let noteHeadSVG = this.drawNoteHead(note.type);

        noteSVG.appendElement(noteHeadSVG);

        log(true)

        return noteSVG;
    }

    drawSVG(id: string, type: string) {
        let element = SVG.create('svg')
                         .addClass(`id-${id}`)
                         .addClass(type);

        this.refs[id] = element;

        this.invisibleSVG.appendElement(element);

        return element;
    }

    drawNoteHead(type: string): SVG {
        let noteheadGlyphNames: { [k: string]: string } = {
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

    drawGlyph(glyphName: string): SVG {
        let codePoints = this.codePoints[glyphName];
        let glyphCodePointsNotFound = (codePoints === undefined);

        if (glyphCodePointsNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }

        return SVG.createText(codePoints.codepoint)
                  .addClass('glyph');
    }

    createRest(rest: Rest): SVG {
        return this.drawSVG(rest.id, 'rest');
    }

    engraveChord(chord: Chord): void {
        let notes = chord.notes;

        if (notes.length < 1) {
            throw new Error('empty chord');
        }

        let startingStaffPlace = 30;

        if (this.state.clefSign === 'F') {
            startingStaffPlace = 18;
        }

        let staffPlaceFromOctaveAndStep = (octave: number, step: string): number => {
            return octave * 7 + STEP_NAMES.indexOf(step) - startingStaffPlace;
        };

        let lowestNote: Note = notes[0] as Note;

        let lowestStaffPlace: number = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);
        let lastStaffPlace: number = lowestStaffPlace;

        let noteWidthFromBBox = (bbox: SMuFL.GlyphBBox) => {
            return bbox['bBoxNE'][0] - bbox['bBoxSW'][0];
        };

        let noteWidth: number;

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

            let note = notes[i] as Note;


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
                this.engraveLedgerLine(noteWidth + this.defaults.legerLineExtension, staffPlace);
            }

            lastStaffPlace = staffPlace;
        }

        let stemNeeded = (lowestNote.type !== 'whole');
        let highestNote = notes[notes.length - 1] as Note;

        if (stemNeeded) {
            let noteAnchors: SMuFL.GlyphAnchors;

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

            let stemStaffPlaceTop: number, stemStaffPlaceBottom: number, stemOffsets: { x: number, y: number };
            let highestStaffPlace = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);
            let onlyLedgerNotes = (highestStaffPlace < STAFF_PLACE_BOTTOM_LINE && lowestStaffPlace < STAFF_PLACE_BOTTOM_LINE) ||
                (highestStaffPlace > STAFF_PLACE_TOP_LINE && lowestStaffPlace > STAFF_PLACE_TOP_LINE);


            let stemPointsUp = (highestStaffPlace < STAFF_PLACE_MIDDLE_LINE) ||
                (highestStaffPlace - STAFF_PLACE_MIDDLE_LINE < STAFF_PLACE_MIDDLE_LINE - lowestStaffPlace);

            if (stemPointsUp) {
                if (onlyLedgerNotes) {
                    stemStaffPlaceTop = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                } else {
                    stemStaffPlaceTop = highestStaffPlace + STAFF_PLACE_SPAN_OCTAVE;
                }

                stemStaffPlaceBottom = staffPlaceFromOctaveAndStep(lowestNote.pitchOctave, lowestNote.pitchStep);

                stemOffsets = {
                    x: noteAnchors['stemUpSE'][0] - this.defaults.stemThickness,
                    y: -noteAnchors['stemUpSE'][1]
                };
            } else {
                if (onlyLedgerNotes) {
                    stemStaffPlaceBottom = STAFF_PLACE_MIDDLE_LINE; // ledger note stem extends to middle line
                } else {
                    stemStaffPlaceBottom = lowestStaffPlace - STAFF_PLACE_SPAN_OCTAVE;
                }

                stemStaffPlaceTop = staffPlaceFromOctaveAndStep(highestNote.pitchOctave, highestNote.pitchStep);

                stemOffsets = {
                    x: noteAnchors['stemDownNW'][0],
                    y: -noteAnchors['stemDownNW'][1]
                }
            }

            this.engraveStem(stemStaffPlaceBottom, stemStaffPlaceTop, stemOffsets);

            let beamsNeeded = (lowestNote.beams !== undefined);
            let flagNeeded = (['eighth', '16th', '32nd', '64th'].indexOf(lowestNote.type) !== -1) && !beamsNeeded;

            if (flagNeeded) {
                let flagType: string;

                switch (lowestNote.type) {
                    case 'eighth':
                        flagType = 'flag8th';
                        break;
                    default:
                        flagType = 'flag' + lowestNote.type;
                }

                if (stemPointsUp) {
                    flagType += 'Up';
                } else {
                    flagType += 'Down';
                }

                let flagAnchor = this.anchors[flagType];


                let flagOffsets: Offsets;

                if (flagAnchor && flagAnchor['stemUpNW']) {
                    if (stemPointsUp) {
                        flagOffsets = {
                            x: stemOffsets.x + flagAnchor['stemUpNW'][0] - this.defaults.stemThickness,
                            y: stemOffsets.y + flagAnchor['stemUpNW'][1]
                        };
                    } else {
                        flagOffsets = {
                            x: stemOffsets.x + flagAnchor['stemUpNW'][0] + this.defaults.stemThickness,
                            y: stemOffsets.y + flagAnchor['stemUpNW'][1]
                        };
                    }
                } else {
                    flagOffsets = stemOffsets;
                }

                this.engraveFlag(flagType, stemStaffPlaceTop, flagOffsets);
            } else if (beamsNeeded) {
                for (let beam of lowestNote.beams!) {
                    switch (beam.type) {
                        case "begin":
                            this.state.beams[beam.number] = [this.headPosition.x, stemPointsUp ? stemStaffPlaceTop : stemStaffPlaceBottom];
                            break;
                        case "end":
                            let beamOffsets: Offsets = { x: stemOffsets.x, y: 0 };
                            let leftNote: Coordinates = this.state.beams[beam.number];
                            let rightNote: Coordinates = [this.headPosition.x, stemPointsUp ? stemStaffPlaceTop : stemStaffPlaceBottom];

                            if (beam.number <= 2) {
                                let beamSpacing = (this.defaults.beamThickness+this.defaults.beamSpacing)*(beam.number-1);
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

    engraveFlag(flagType: string, staffPlace: number, offsets: { x: number, y: number }): SVG {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));

        return this.engraveGlyph(flagType, offsets.x);
    }

    engraveBeam(staffPlaceLeft: number, staffPlaceRight: number, width: number, offsets: {x: number, y: number}): SVG {
        console.log('aaa');
        console.log(staffPlaceLeft, staffPlaceRight);

        staffPlaceLeft = this.topMarginFromStaffPlace(staffPlaceLeft);
        staffPlaceRight = this.topMarginFromStaffPlace(staffPlaceRight);

        console.log(staffPlaceLeft, staffPlaceRight);

        this.moveHead(undefined, staffPlaceLeft);

        let pointNW: Coordinates = [0, 0];
        let pointNE: Coordinates = [width, staffPlaceRight-staffPlaceLeft];
        let pointSW: Coordinates = [0, staffPlaceRight-staffPlaceLeft+this.defaults.beamThickness];
        let pointSE: Coordinates = [width, this.defaults.beamThickness];

        let beam = SVG.createPolygon([pointNW, pointNE, pointSE, pointSW])
                      .addClass("beam")
                      .translate(offsets.x, offsets.y);

        return this.engraveElement(beam);
    }

    engraveStem(staffPlaceBottom: number, staffPlaceTop: number, offsets: { x: number; y: number }): SVG {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlaceTop));

        // y offset is compensated to make sure stem touches the right line as desired

        let height = Math.abs(staffPlaceTop - staffPlaceBottom) / 2;
        let movingUp = offsets.y < 0;

        if (movingUp) {
            height += offsets.y;
            offsets.y = 0;
        } else {
            height -= offsets.y;
        }

        let stem = SVG.createRect(this.defaults.stemThickness, height)
                      .addClass('stem')
                      .translate(offsets.x, offsets.y);

        return this.engraveElement(stem);
    }

    engraveNoteHead(noteHeadType: string, offsetX: number, staffPlace: number): SVG {
        this.moveHead(undefined, this.topMarginFromStaffPlace(staffPlace));

        let glyphName: { [k: string]: string } = {
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

    engraveTimeSignature(bpm: number, beatUnit: number): SVGEngraver {
        this.moveHead(undefined, 1);
        this.engraveGlyph(`timeSig${bpm}`, 0);
        this.moveHead(undefined, 3);
        this.engraveGlyph(`timeSig${beatUnit}`, 0);
        this.moveHead(4);

        return this;
    }

    engraveGlyph(glyphName: string, offsetX: number): SVG {
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

    temporarilyMoveHeadTo(x: number, y: number, callback: () => void): void {
        let originalHeadPosition = this.headPosition;

        this.headPosition = {x: x, y: y};

        callback();

        this.headPosition = originalHeadPosition;
    }

    resetHead(): void {
        this.headPosition = { x: 0, y: 0 };
    }

    print(): SVGGraphicsElement {
        return this.score.viewport.element;
    }

    private get defaults(): SMuFL.EngravingDefaults {
        return this.meta.engravingDefaults;
    }

    private get anchors(): SMuFL.GlyphAnchorsList {
        return this.meta.glyphsWithAnchors;
    }

    private get bboxes(): SMuFL.GlyphBBoxList {
        return this.meta.glyphBBoxes;
    }

    private get codePoints(): SMuFL.GlyphCodePointList {
        return this.meta.glyphnames;
    }

    private topMarginFromStaffPlace(staffPlace: number) {
        return 4 - staffPlace / 2;
    }
}

class SVG {
    private childElement: SVGGraphicsElement;
    private static transfomer: SVGSVGElement; // awkward requirement for creating transform objects

    static create(elementName: string): SVG {
        return new SVG(elementName);
    }

    static createText(text: string): SVG {
        return SVG.create('text').textContent(text);
    }

    static createLine(endingPoint: Coordinates): SVG {
        return SVG.create('line')
                  .attr('x1', 0)
                  .attr('y1', 0)
                  .attr('x2', endingPoint[0] * STAFF_SPACE)
                  .attr('y2', endingPoint[1] * STAFF_SPACE);
    }

    static createRect(width: number, height: number): SVG {
        return SVG.create('rect')
                  .size(width, height);
    }

    static createPolygon(points: Coordinates[]): SVG {
        points = points.map(p => <Coordinates>[p[0]*STAFF_SPACE, p[1]*STAFF_SPACE]);
        return SVG.create('polygon')
                  .attr('points', points.map(p => p.join(',')).join(' '));
    }

    private constructor(el: string | SVGGraphicsElement) {
        if (el instanceof SVGGraphicsElement) {
            this.childElement = el;
        } else {
            this.childElement = <SVGGraphicsElement> document.createElementNS('http://www.w3.org/2000/svg', el);
        }
    }

    // ATTRIBUTE GETTERS

    get element(): SVGGraphicsElement {
        return this.childElement;
    }

    get width(): number {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions

        return this.bbox.width;
    }

    get viewport(): SVG {
        const viewport = this.childElement.viewportElement;

        return viewport === null ? this : (new SVG(viewport));
    }

    get bbox(): SVGRect {
        if (!document.body.contains(this.element)) {
            throw Error("element must be rendered to have a bounding box.")
        }

        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }

        throw Error("element does not have a bounding box.");
    }

    // CHILDREN ELEMENT APPENDERS

    appendSVG(): SVG {
        return this.appendChild('svg');
    }

    appendStyle(style: string): SVG {
        return this.appendChild('defs')
                   .appendChild('style')
                   .textContent(style);
    }

    appendElement(child: SVG): SVG {
        this.childElement.appendChild(child.element);

        return child;
    }

    // PROPERTY MANIPULATORS

    id(id: string): SVG {
        return this.attr('id', id);
    }

    move(x?: number, y?: number): SVG {
        if (x) {
            this.attr('x', x * STAFF_SPACE);
        }

        if (y) {
            this.attr('y', y * STAFF_SPACE);
        }

        return this;
    }

    translate(x?: number, y?: number): SVG {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome

        if (this.element instanceof SVGSVGElement) {
            throw new Error('transform does not work on SVGSVGElement');
        }

        if (!SVG.transfomer) {
            SVG.transfomer = <SVGSVGElement> SVG.create("svg").element;
        }

        let transform = SVG.transfomer.createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);

        this.element.transform.baseVal.appendItem(transform);

        return this;
    }

    size(width: number, height: number): SVG {
        return this.attr('width', width * STAFF_SPACE)
                   .attr('height', height * STAFF_SPACE);
    }

    appendChild(elementName: string): SVG {
        const child = new SVG(elementName);

        this.childElement.appendChild(child.element);

        return child;
    }

    attr(k: string, v: any): SVG {
        this.childElement.setAttribute(k, `${v}`);

        return this;
    }

    addClass(className: string): SVG {
        this.childElement.classList.add(className);

        return this;
    }

    textContent(text: string): SVG {
        this.childElement.textContent = text;

        return this;
    }
}

class Glyph {
    // STATIC

    protected static invisibleSVG: SVGSVGElement;
    protected static meta: SMuFL.CombinedMeta;

    static createElement(name: string): SVGGraphicsElement {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);

        return element;
    }

    // INSTANCE

    protected _element: SVGGraphicsElement;

    constructor(protected type: string,
                protected id: string) {
        if (!Glyph.invisibleSVG) {
            Glyph.invisibleSVG = <SVGSVGElement> Glyph.createElement('svg');
            Glyph.invisibleSVG.setAttribute('style', 'position: absolute; z-index: -100000; visibility: hidden;');
            
            document.body.appendChild(Glyph.invisibleSVG);
        }

        Glyph.meta = SMuFL.load('Bravura');

        this.draw();
    }

    // DRAW

    draw = (): void => {  /* has to keep strange syntax to get correct this.draw() */
        this._element = <SVGSVGElement> Glyph.createElement('svg');

        this._element.classList.add(`id-${this.id}`);
        this._element.classList.add(this.type);
    }

    // SVG OPS

    get element(): SVGGraphicsElement {
        return this._element;
    }

    get width(): number {
        return this.bbox.width;
    }

    get bbox(): SVGRect {
        if (!document.body.contains(this._element)) {
            throw Error("element must be rendered to have a bounding box.")
        }

        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }

        throw Error("element does not have a bounding box.");
    }

    append(child: Glyph): void {
        this.element.appendChild(child._element);
    }

    translate(x?: number, y?: number): void {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome

        if (this._element instanceof SVGSVGElement) {
            throw new Error('transform does not work on SVGSVGElement');
        }

        let transform = Glyph.invisibleSVG.createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);

        this._element.transform.baseVal.appendItem(transform);
    }
}

class CharGlyph extends Glyph {
    constructor(protected type: string,
                protected id: string,
                protected charName: string) {
        super(type, id);

        this.draw();
    }

    draw = (): void => {
        let textElement = Glyph.createElement('text');
        let codePoints = Glyph.meta.glyphnames[this.charName];

        if (!codePoints.codepoint) {
            throw new Error();
        }

        textElement.classList.add('glyph');
        textElement.textContent = codePoints.codepoint;

        this.element.appendChild(textElement);
    }
}

class NoteGlyph extends Glyph {
    constructor(private note: Note) {
        super('note', note.id);

        this.draw();
    }

    draw = (): void => {
        this.drawNoteHead();
    }

    private drawNoteHead(): void {
        let noteheadGlyphNames: { [k: string]: string } = {
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

        let textGlyph = new NoteHeadGlyph(this.note.id, noteheadGlyphName);

        this.append(textGlyph);
    }
}

export class NoteHeadGlyph extends CharGlyph {
    constructor(noteId: string, protected charName: string) {
        super('note-head', noteId, charName);
    }
}

export class ChordGlyph extends Glyph {
    constructor(private chord: Chord) {
        super('chord', chord.id);

        this.draw();
    }

    draw = (): void => {
        // ensureNonEmptyChord

        let chordHasNoNotes: boolean = this.chord.notes.length === 0;
        if (chordHasNoNotes) {
            throw new Error('empty chord');
        }

        this.chord.notes.forEach((noteRest: NoteRest, i: number) => {
            if (noteRest instanceof Note) {
                let note: Note = noteRest;
                let noteGlyph = new NoteGlyph(note);

                // checkAdjacentNotes

                let lastNote = this.chord.notes[i-1] ? this.chord.notes[i-1] : note;
                let isNotThirds = note.getIntervalTo(this.chord.lowestNote) % 3 !== 0;
                let isSecond = note.getIntervalTo(lastNote) === 2;
                let isAdjacent = isNotThirds && isSecond;

                if (isAdjacent) {
                    noteGlyph.translate(noteGlyph.width);
                }

                this.append(noteGlyph);
            }
        });

        console.log(this.element)
    }
}

interface EngravingState {
    beams: {
        [beamNumber: number]: Coordinates
    };
    clefSign: "G" | "F";
}

type Coordinates = [number, number];

type Offsets = {x: number, y: number};