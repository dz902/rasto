import { StaffPlaces, Mark, Chord, Container, Context, LedgerLines, StaffItem } from 'Schema/Music';

export class Measure extends Container<StaffItem> {
    private currentMeasureContexts: { [staffNumber: number]: MeasureContext } = [];

    addChord(chord: Chord, staffNumber: number = 0) {
        let currentMeasureContext = this.currentMeasureContexts[staffNumber];
        let contextNotSet = currentMeasureContext === undefined;

        if (contextNotSet) {
            throw new Error('chords cannot be added before setting a context');
        }

        super.addItem(new MeasureChord(chord, this.currentMeasureContexts[staffNumber]));
    }

    addContext(context: Context, staffNumber: number = 0) {
        let currentMeasureContext = this.currentMeasureContexts[staffNumber];
        let measureContext: MeasureContext;

        if (currentMeasureContext !== undefined) {
            measureContext = currentMeasureContext.merge(context);
        } else {
            measureContext = new MeasureContext(context, staffNumber);
        }

        this.currentMeasureContexts[staffNumber] = measureContext;

        super.addItem(measureContext);

        return this;
    }

    get chords(): ReadonlyArray<MeasureChord> {
        return Object.freeze(this.items.filter(it => it instanceof MeasureChord)) as ReadonlyArray<MeasureChord>;
    }

    get contexts(): ReadonlyArray<MeasureContext> {
        return Object.freeze(this.items.filter(it => it instanceof MeasureContext)) as ReadonlyArray<MeasureContext>;
    }
}

class MeasureChord extends Chord implements StaffItem {
    constructor(private chord: Chord,
                readonly context: MeasureContext) {
        super(chord.noteType, chord.notes, chord.stemDirection);

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

class MeasureContext extends Context implements StaffItem {
    constructor(context: Context, readonly staffNumber: number) {
        super(context.clef, context.key, context.meter);
    }

    merge(newContext: Context): MeasureContext {
        return new MeasureContext(
            super.merge(newContext),
            this.staffNumber
        );
    }
}