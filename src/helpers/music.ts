import { ClefSign} from 'types/music';
import { Clef, GlyphKind, MarkType, Note } from '../types/music';
import { StaffBoundaryPositions } from '../types';

export function getStaffBoundaryPositionsFromClef(clef: Clef): StaffBoundaryPositions {
    return {
        lowest: getStaffLinePositionFromClef(clef, 1),
        highest: getStaffLinePositionFromClef(clef, 5)
    }
}

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

    return computeNotePosition(dummyNote);
}

export function getStaffLinePositionFromClef(clef: Clef, lineNumber: number): number {
    return getStaffBottomLinePositionFromClef(clef) + lineNumber - 1;
}

export function computeNotePosition(note: Note): number {
    return ((note.octaveNumber * 7) + 'CDEFGAB'.indexOf(note.name)) / 2;
}

export function computePositionDiff(a: number, b: number): number {
    return Math.abs(a - b);
}

export function getIntervalBetween(noteA: Note, noteB: Note): number {
    return computePositionDiff(computeNotePosition(noteA) , computeNotePosition(noteB))*2 + 1;
}
