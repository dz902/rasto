import { Clef, ClefSign, GlyphKinds, MarkType, Note } from 'types';

export function staffBottomPositionFromClef(clef: Clef): number {
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

    return notePosition(dummyNote);
}

export function notePosition(note: Note): number {
    return ((note.octaveNumber * 7) + 'CDEFGAB'.indexOf(note.name)) / 2;
}
