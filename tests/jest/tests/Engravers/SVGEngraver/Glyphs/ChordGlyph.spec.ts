import { ChordGlyph } from 'Engravers/SVGEngraver/Glyphs';
import { StemDirection, Chord, Note, MeasureContext } from 'Schema/Music';
import { MarkType } from 'Schema/Music';

let chord: Chord;

describe('Chord', () => {
    describe('#constructor()', () => {
        beforeEach(() => {
            let context = new MeasureContext(4, 4, 4, 'G', 2);
            let notes = [
                new Note(4, 'F', null, 1),
                new Note(4, 'G', null, 1),
                new Note(4, 'A', null, 1),
                new Note(5, 'C', null, 1),
                new Note(5, 'D', null, 1),
                new Note(5, 'G', null, 1),
                new Note(5, 'A', null, 1)
            ];

            chord = new Chord(notes, MarkType.Whole, context);
        });

        it('should have 7 notes', () => {
            expect(chord._notes.length).toBe(7);
        });

        it('should set direction as down', () => {
            expect(chord.direction).toBe(StemDirection.Down);
        });

        it('should set correct note displacement for up direction', () => {
            chord.forceDirection(StemDirection.Up);

            expect(chord._notes[0].needsDisplacement).toBe(false);
            expect(chord._notes[1].needsDisplacement).toBe(true);
            expect(chord._notes[2].needsDisplacement).toBe(false);
            expect(chord._notes[3].needsDisplacement).toBe(false);
            expect(chord._notes[4].needsDisplacement).toBe(true);
        });

        it('should set correct note displacement for down direction', () => {
            chord.forceDirection(StemDirection.Down);

            expect(chord._notes[0].needsDisplacement).toBe(false);
            expect(chord._notes[1].needsDisplacement).toBe(true);
            expect(chord._notes[2].needsDisplacement).toBe(false);
            expect(chord._notes[3].needsDisplacement).toBe(true);
            expect(chord._notes[4].needsDisplacement).toBe(false);
        });

        it('should not need stems for whole notes', () => {
            expect(chord.needsStem).toBe(false);
        });

        it('should need stems for half notes', () => {
            chord.changeType(MarkType.Half);

            expect(chord.needsStem).toBe(true);
        });

        it('should need ledger line for higher notes', () => {
            expect(chord._notes[5].needsLedgerLine).toBe(false);
            expect(chord._notes[6].needsLedgerLine).toBe(true);
        });
    });
});