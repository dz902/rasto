import { Chord, StaffItem } from 'Schema/Music';
import { flatten, last, Nullable } from 'Utilities';
import { Context } from './Context';
import { Direction, Tie } from './Direction';
import { LedgerLines, StaffPlaces } from './types';

export class Score {
    private currentStaffContexts: ScoreContext[] = [];
    private scoreMeasures: Measure[] = [];
    private scoreDirections: Direction[] = [];

    get measures(): Measure[] {
        return Array.from(this.scoreMeasures);
    }

    get chords(): ScoreChord[] {
        return flatten(this.scoreMeasures).filter(item => item instanceof ScoreChord);
    }

    get directions(): Direction[] {
        return Array.from(this.scoreDirections);
    }

    get staves(): ScoreContext[] {
        return Array(this.currentStaffContexts.length).fill(0).reduce((staves: ScoreContext[], i: number) => {
            let staffItems = this.getStaffItems(i);

            staves.push(staffItems[0] as ScoreContext);

            return staves;
        }, []);
    }

    getStaffItems(staffNumber: number): StaffItem[] {
        return flatten(this.scoreMeasures).filter(item => item.staffNumber === staffNumber)
    }

    addChord(chord: Chord, staffNumber: number = 0): this {
        let currentScoreContext = this.currentStaffContexts[staffNumber];
        let contextNotSet = currentScoreContext === undefined;

        if (contextNotSet) {
            throw new Error('chords cannot be added before setting a context');
        }

        this.currentMeasure.push(new ScoreChord(chord, currentScoreContext));

        return this;
    }

    addContext(context: Context, staffNumber: number = 0): this {
        let currentMeasureContext = this.currentStaffContexts[staffNumber];
        let scoreContext: ScoreContext;

        if (currentMeasureContext !== undefined) {
            scoreContext = currentMeasureContext.merge(context);
        } else {
            scoreContext = new ScoreContext(context, staffNumber);
        }

        this.currentStaffContexts[staffNumber] = scoreContext;

        this.currentMeasure.push(scoreContext);

        return this;
    }

    addMeasure(): this {
        this.scoreMeasures.push([]);

        return this;
    }

    addDirection(direction: Direction): this {
        this.scoreDirections.push(direction);

        return this;
    }

    addTie(tie: Tie): this {
        let chord = this.chords.find(c => c.rawChord === tie.chord);

        if (chord === undefined) {
            throw new Error('tying chord does not exist');
        }

        let staffItems = this.getStaffItems(chord.staffNumber);
        let nextIndex = staffItems.indexOf(chord) + 1;
        let nextStaffItem = staffItems[nextIndex];
        let nextStaffItemNotChord = !(nextStaffItem instanceof Chord);

        if (nextStaffItemNotChord) {
            throw new Error('tied chords must be adjacent');
        }

        let notesNotMatch = !tie.pitchIndices.reduce((result: boolean, i: number): boolean => {
            return result && (nextStaffItem as ScoreChord).pitches[i].equals(tie.chord.pitches[i]);
        }, true);

        if (notesNotMatch) {
            throw new Error('tying different pitches');
        }

        this.scoreDirections.push(tie);

        return this;
    }

    private get currentMeasure(): Measure {
        let lastMeasure = last(this.scoreMeasures);

        if (lastMeasure === undefined) {
            let newMeasure: Measure = []
            this.scoreMeasures.push(newMeasure);

            return newMeasure;
        }

        return lastMeasure;
    }
}


class ScoreChord extends Chord implements StaffItem {
    constructor(private chord: Chord,
                readonly context: ScoreContext) {
        super(chord.noteType, chord.notes, chord.duration, chord.stemDirection, chord.articulations);

        this.computeLedgerLines();
    }

    get rawChord(): Chord {
        return this.chord;
    }

    get staffNumber(): number {
        return this.context.staffNumber;
    }

    // PRIVATE

    private computeLedgerLines(): LedgerLines {
        let ledgerLines: LedgerLines = { highest: null, lowest: null };
        let topNoteHigherThanSpaceSix = this.topPitch.staffPlace > (this.context.topStaffPlace + 1);

        if (topNoteHigherThanSpaceSix) {
            ledgerLines.highest = StaffPlaces.staffSpan + Math.floor((this.topPitch.staffPlace - this.context.topStaffPlace) / 2) * StaffPlaces.third;
        }

        let bottomNoteLowerThanSpaceMinusOne = this.bottomPitch.staffPlace < this.context.bottomStaffPlace - 1;

        if (bottomNoteLowerThanSpaceMinusOne) {
            ledgerLines.lowest = 0 - Math.floor((this.context.bottomStaffPlace - this.bottomPitch.staffPlace) / 2) * StaffPlaces.third;
        }

        return ledgerLines;
    }
}

export class ScoreContext extends Context implements StaffItem {
    constructor(context: Context, readonly staffNumber: number) {
        super(context.clef, context.key, context.meter);
    }

    merge(newContext: Context): ScoreContext {
        return new ScoreContext(
            super.merge(newContext),
            this.staffNumber
        );
    }
}

type Measure = StaffItem[];
