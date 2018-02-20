import { Articulation, ArticulationType, Chord, FlagType, Pitch, NoteType, StemDirection } from 'Schema/Music';

let chordHalfCDEFDown: Chord;

describe('Chord', () => {
    beforeEach(() => {
    });

    context('#constructor()', () => {
        it('should set correct note displacements', () => {
        });
    });

    context('#get noteType()', () => {
        it('should return correct note type', () => {
        });
    });

    context('#get notes()', () => {
        it('should return sorted notes', () => {
        });
    });

    context('#get flagType()', () => {
        it('should return no flag for half notes', () => {
        });
    });

    context('#get topNote()', () => {
        it('should return note with highest pitch', () => {
        });
    });

    context('#get bottomNote()', () => {
        it('should return note with lowest pitch', () => {
        });
    });

    context('#get spanStaffPlace()', () => {
        it('should return staff place difference of highest and lowest note', () => {
        });
    });

    context('#get stemDirection()', () => {
        it('should return correct stem direction', () => {
        });
    });

    context('#changeNoteType()', () => {
        beforeEach(() => {
        });

        it('should change note type', () => {
        });

        it('should change flag type accordingly', () => {
        });
    });

    context('#changeStemDirection()', () => {
        beforeEach(() => {
        });

        it('should change stem direction', () => {
        });

        it('should change note displacements', () => {
        });
    });
});