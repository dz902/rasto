import { Nullable } from 'Utilities';
import { StaffPlaces } from 'Schema/Music';
import { Accidental, PitchOctave, PitchStep } from './types';
import { Articulation } from './Articulation';

export class Pitch {
    constructor(readonly step: PitchStep,
                readonly octave: PitchOctave,
                readonly alter?: number) {
    }

    equals(other: Pitch): boolean {
        return (
            this.step === other.step &&
            this.octave === other.octave
        );
    }
    // @internal

    get staffPlace(): number {
        return this.octave*StaffPlaces.octave + 'CDEFGAB'.indexOf(this.step);
    }

    getIntervalTo(note: Pitch): number {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}