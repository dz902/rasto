import { Maybe } from 'Utilities';
import { StaffPlaces, Pitch } from 'Schema/Music';

export class Note {
    constructor(readonly pitch: Pitch,
                readonly duration: number) {
    }

    get staffPlace(): number {
        // absoluteStaffPlace

        return this.pitch.octave*StaffPlaces.octave + 'CDEFGAB'.indexOf(this.pitch.step);
    }

    getIntervalTo(note: Note): number {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}