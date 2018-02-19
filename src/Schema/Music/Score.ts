import { Chord, StaffItem } from 'Schema/Music';
import { last, Maybe } from 'Utilities';
import { Context } from './Context';
import { Direction } from './Articulation';
import { LedgerLines, StaffPlaces } from './types';
import { Container } from './Container';

export class Score {
    private currentScoreContexts: ScoreContext[] = [];
    private scoreMeasures: Measure[] = [];
    private scoreDirections: Direction[] = [];

    get directions(): ReadonlyArray<Direction> {
        return Object.freeze(Array.from(this.scoreDirections));
    }

    /**
     * Level 1 - Absolute sounds with accidentals / note-level articulations
     */

    addChord(chord: Chord, staffNumber: number = 0): this {
        let currentScoreContext = this.currentScoreContexts[staffNumber];
        let contextNotSet = currentScoreContext === undefined;

        if (contextNotSet) {
            throw new Error('chords cannot be added before setting a context');
        }

        this.currentMeasure.push(new ScoreChord(chord, currentScoreContext));

        return this;
    }

    // Level 2 - Sounds with context / idea of keys / beat unit / clef

    addContext(context: Context, staffNumber: number = 0): this {
        let currentMeasureContext = this.currentScoreContexts[staffNumber];
        let scoreContext: ScoreContext;

        if (currentMeasureContext !== undefined) {
            scoreContext = currentMeasureContext.merge(context);
        } else {
            scoreContext = new ScoreContext(context, staffNumber);
        }

        this.currentScoreContexts[staffNumber] = scoreContext;

        this.currentMeasure.push(scoreContext);

        return this;
    }

    // Level 3 - Chords grouped into measures / logical unit of music

    addMeasure(): this {
        this.scoreMeasures.push([]);

        return this;
    }

    // Level 4 - Measures with directions

    addDirection(direction: Direction): this {
        this.scoreDirections.push(direction);

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

    get staffNumber(): number {
        return this.context.staffNumber;
    }

    // PRIVATE

    private computeLedgerLines(): LedgerLines {
        let ledgerLines: LedgerLines = { highest: null, lowest: null };
        let topNoteHigherThanSpaceSix = this.topNote.staffPlace > (this.context.topStaffPlace + 1);

        if (topNoteHigherThanSpaceSix) {
            ledgerLines.highest = StaffPlaces.staffSpan + Math.floor((this.topNote.staffPlace - this.context.topStaffPlace) / 2) * StaffPlaces.third;
        }

        let bottomNoteLowerThanSpaceMinusOne = this.bottomNote.staffPlace < this.context.bottomStaffPlace - 1;

        if (bottomNoteLowerThanSpaceMinusOne) {
            ledgerLines.lowest = 0 - Math.floor((this.context.bottomStaffPlace - this.bottomNote.staffPlace) / 2) * StaffPlaces.third;
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

type Measure = (Chord | Context)[];