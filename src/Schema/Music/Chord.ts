import { Maybe, last } from 'Utilities';
import { StemDirection, Pitch, FlagType, NoteType, Mark } from 'Schema/Music';
import { Articulation } from './Articulation';

export class Chord extends Mark {
    private chordPitches: ChordPitch[] = [];
    private chordFlagType: Maybe<FlagType> = null;

    constructor(noteType: NoteType,
                pitches: ReadonlyArray<Pitch>,
                readonly duration: number,
                readonly stemDirection: StemDirection,
                readonly articulations: Articulation[] = []) {
        super(noteType);

        for (let pitch of pitches) {
            let chordPitch = new ChordPitch(pitch);

            this.chordPitches.push(chordPitch);
        }

        this.sortPitches();
        this.computeNoteHeadDisplacements();
        this.computeNoteRelativeStaffPlaces();
        this.computeFlagType();
    }

    // @property

    get pitches(): ReadonlyArray<ChordPitch> {
        return Object.freeze(this.chordPitches.concat([]));
    }

    get flagType(): Maybe<FlagType> {
        return this.chordFlagType;
    }

    get bottomPitch(): Pitch {
        return this.chordPitches[0];
    }

    get topPitch(): Pitch {
        return this.chordPitches[this.chordPitches.length-1];
    }

    get spanStaffPlace(): number {
        return this.topPitch.staffPlace - this.bottomPitch.staffPlace;
    }

    // TASKS

    private computeFlagType(): this {
        let flag;
        let noFlagTypes = [NoteType.Whole, NoteType.Half, NoteType.Quarter];

        if(noFlagTypes.indexOf(this.noteType) !== -1) {
            flag = null;
        } else {
            flag = FlagType[NoteType[this.noteType] as keyof typeof FlagType]; // BLACK MAGIC #36316326
        }

        this.chordFlagType = flag;

        return this;
    }

    private sortPitches(): this {
        this.chordPitches.sort((a, b) => a.staffPlace - b.staffPlace);

        return this;
    }

    private computeNoteRelativeStaffPlaces(): void {
        this.chordPitches.forEach((note) => {
            note.relativeStaffPlace = note.staffPlace - this.bottomPitch.staffPlace;
        });
    }

    private computeNoteHeadDisplacements(): this {
        let noteDisplacements: boolean[];

        let checkSeconds = (displacements: boolean[], note: ChordPitch, i: number, notes: ReadonlyArray<ChordPitch>) => {
            let prevNote = notes[i-1];
            let prevDisplacement = last(displacements);
            let isNotDisplacing = (prevDisplacement === undefined || prevDisplacement === false);
            let isSecond = (prevNote !== undefined && note.getIntervalTo(prevNote) === 2);

            displacements.push(isNotDisplacing && isSecond);

            return displacements;
        };

        if (this.stemDirection === StemDirection.Up) {
            noteDisplacements = this.pitches.reduce(checkSeconds, []);
        } else {
            noteDisplacements = Array.from(this.pitches).reverse().reduce(checkSeconds, []).reverse();
        }

        noteDisplacements.forEach((v, i) => this.chordPitches[i].displacement = v);

        return this;
    }
}

class ChordPitch extends Pitch {
    // those really should be internal but lacking the mechanism
    // public getter + internal setter

    // @internal
    displacement: boolean = false;
    relativeStaffPlace: number = 0;

    constructor(pitch: Pitch) {
        super(pitch.step,
              pitch.octave,
              pitch.alter);
    }
}