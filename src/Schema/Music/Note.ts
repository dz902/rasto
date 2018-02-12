import { Maybe } from 'Utilities';
import { StaffPlaces, Accidental, Stem, Beam, MusicalElement, PitchOctave, PitchStep } from 'Schema/Music';

export class Note extends MusicalElement {
    readonly beams: Beam[] = [];
    readonly stem: Stem;

    constructor(readonly pitchOctave: PitchOctave,
                readonly pitchStep: PitchStep,
                readonly pitchAlter: Maybe<number>,
                readonly duration: number,
                readonly accidental: Maybe<Accidental>) {
        super();

        this.stem = new Stem("up");
    }

    get staffPlace(): number {
        // absoluteStaffPlace

        return this.pitchOctave*StaffPlaces.octave + 'CDEFGAB'.indexOf(this.pitchStep);
    }

    addBeam(beam: Beam) {
        this.beams.push(beam);
    }

    getIntervalTo(note: Note): number {
        return Math.abs(this.staffPlace - note.staffPlace) + 1;
    }
}