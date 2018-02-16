import { Articulation, ArticulationType, Chord, FlagType, Note, NoteType, StemDirection } from 'Schema/Music';

let note4C = new Note({ octave: 4,  step: 'C' },1, null, [new Articulation(ArticulationType.Accent)]);
let note4D = new Note({ octave: 4,  step: 'D' },1, null, null);
let note4E = new Note({ octave: 4,  step: 'E' },1, null, null);
let note4F = new Note({ octave: 4,  step: 'F' },1, null, null);
let chordHalfCDEFDown: Chord;

describe('Chord', () => {
    beforeEach(() => {
        chordHalfCDEFDown = new Chord(NoteType.Half, [note4E, note4D, note4C, note4F], StemDirection.Down);
    });

    context('#constructor()', () => {
        it('should set correct note displacements', () => {
            expect(chordHalfCDEFDown.notes[0].displacement).to.be.true;
            expect(chordHalfCDEFDown.notes[1].displacement).to.be.false;
            expect(chordHalfCDEFDown.notes[2].displacement).to.be.true;
            expect(chordHalfCDEFDown.notes[3].displacement).to.be.false;
        });
    });

    context('#get noteType()', () => {
        it('should return correct note type', () => {
            expect(chordHalfCDEFDown.noteType).to.equal(NoteType.Half);
        });
    });

    context('#get notes()', () => {
        it('should return sorted notes', () => {
            expect(chordHalfCDEFDown.notes[0]).to.containSubset(note4C);
            expect(chordHalfCDEFDown.notes[1]).to.containSubset(note4D);
            expect(chordHalfCDEFDown.notes[2]).to.containSubset(note4E);
            expect(chordHalfCDEFDown.notes[3]).to.containSubset(note4F);
        });
    });

    context('#get flagType()', () => {
        it('should return no flag for half notes', () => {
            expect(chordHalfCDEFDown.flagType).to.be.null;
        });
    });

    context('#get topNote()', () => {
        it('should return note with highest pitch', () => {
            expect(chordHalfCDEFDown.topNote).to.containSubset(note4F);
        });
    });

    context('#get bottomNote()', () => {
        it('should return note with lowest pitch', () => {
            expect(chordHalfCDEFDown.bottomNote).to.containSubset(note4C);
        });
    });

    context('#get spanStaffPlace()', () => {
        it('should return staff place difference of highest and lowest note', () => {
            expect(chordHalfCDEFDown.spanStaffPlace).to.equal(3);
        });
    });

    context('#get stemDirection()', () => {
        it('should return correct stem direction', () => {
            expect(chordHalfCDEFDown.stemDirection).to.equal(StemDirection.Down);

        });
    });

    context('#changeNoteType()', () => {
        beforeEach(() => {
            chordHalfCDEFDown.changeNoteType(NoteType.N8th);
        });

        it('should change note type', () => {
            expect(chordHalfCDEFDown.noteType).to.equal(NoteType.N8th);
        });

        it('should change flag type accordingly', () => {
            expect(chordHalfCDEFDown.flagType).to.equal(FlagType.N8th);
        });
    });

    context('#changeStemDirection()', () => {
        beforeEach(() => {
            chordHalfCDEFDown.changeStemDirection(StemDirection.Up);
        });

        it('should change stem direction', () => {
            expect(chordHalfCDEFDown.stemDirection).to.equal(StemDirection.Up);
        });

        it('should change note displacements', () => {
            expect(chordHalfCDEFDown.notes[0].displacement).to.be.false;
            expect(chordHalfCDEFDown.notes[1].displacement).to.be.true;
            expect(chordHalfCDEFDown.notes[2].displacement).to.be.false;
            expect(chordHalfCDEFDown.notes[3].displacement).to.be.true;
        });
    });
});