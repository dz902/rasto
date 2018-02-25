import { Clef, ClefSign, GlyphKinds, MarkType, Note } from 'types';

export function getStaffBottomLinePositionFromClef(clef: Clef): number {
    let bottomPosition = 0;
    let dummyNote: Note;

    switch (clef.sign) {
        case ClefSign.G:
            dummyNote = {
                name: 'E',
                octaveNumber: 4
            };
            break;
        default:
            dummyNote = {
                name: 'C',
                octaveNumber: 0
            };
    }

    return getNotePosition(dummyNote);
}

export function getStaffLinePositionFromClef(clef: Clef, lineIndex: number): number {
    return getStaffBottomLinePositionFromClef(clef) + lineIndex;
}

export function getNotePosition(note: Note): number {
    return ((note.octaveNumber * 7) + 'CDEFGAB'.indexOf(note.name)) / 2;
}

export function getPositionDiff(a: number, b: number): number {
    return Math.abs(a - b);
}

export function getIntervalBetween(noteA: Note, noteB: Note): number {
    return getPositionDiff(getNotePosition(noteA) , getNotePosition(noteB))*2 + 1;
}
