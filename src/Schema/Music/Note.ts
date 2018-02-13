import { Maybe } from 'Utilities';
import { StaffPlaces, PitchOctave, PitchStep } from 'Schema/Music';

export class Note {
    constructor(readonly pitchOctave: PitchOctave,
                readonly pitchStep: PitchStep,
                readonly pitchAlter: Maybe<number>,
                readonly duration: number) {
    }

    get staffPlace(): number {
        // absoluteStaffPlace

        return this.pitchOctave*StaffPlaces.octave + 'CDEFGAB'.indexOf(this.pitchStep);
    }

    getIntervalTo(note: Note): number {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}