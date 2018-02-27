<template lang="pug">
svg.chord()
    svg.ledger-lines
        line.ledger-line(
            v-for="ledgerLine in ledgerLines"
            v-bind="remize(ledgerLine)"
        )
    svg.note-heads
        glyph-component.note-head(
            v-for="noteHead in noteHeads"
            v-bind:key="Math.random()"
            v-bind="remize(noteHead)"
        ) {{ noteHeadChar }}
    rect.stem(
        v-if="!stem.isVirtual"
        v-bind="remize(stem)"
    )
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import { Remizer, Layout } from 'mixins';
import {
    Nullable,
    Bindings,
    GlyphKinds,
    MarkType,
    Note,
    StemDirection,
    Positioned,
    Anchored,
    Dimensioned
} from 'types';
import { at, range, first, last, merge } from 'lodash';
import {
    getIntervalBetween,
    getNotePosition,
    computePositionDiff,
    getStaffBoundaryPositionsFromClef
} from 'Stores/helpers';
import { getEngravingDefaults, getGlyphAnchors, getGlyphDimensions, getGlyphWidth } from 'Fonts/helpers';

export default Vue.extend({
    name: 'chord',
    props: {
        chord: {
            type: Object,
            required: true
        },
        clef: {
            type: Object,
            required: false
        }
    },
    computed: {
        ledgerLines() {
            let ledgerLines: Bindings[] = [];

            if (!this.clef) {
                return ledgerLines;
            }

            let self = this as any;

            let ledgerLineExtension = getEngravingDefaults('legerLineExtension') * 2;
            let staffBoundaryPositions = getStaffBoundaryPositionsFromClef(this.clef);

            let checkDisplacedNotes = (filter: (n: NoteHead, i: number) => boolean): boolean => {
                return this.noteHeads.some((n, i) => filter(n, i) && n.isDisplaced);
            };

            let computeLedgerLineOffset = (ledgerLineWidth: number, ledgerNotesDisplaced: boolean): number => {
                let dummyLedger: Anchored = {
                    anchor: {
                        x: ledgerLineWidth / 2,
                        y: 0
                    }
                };

                let alignmentTarget: Positioned & Dimensioned;

                if (ledgerNotesDisplaced) {
                    alignmentTarget = this.stem;
                } else {
                    if (this.stemDownward) {
                        alignmentTarget = last(this.noteHeads) as NoteHead;
                    } else {
                        alignmentTarget = first(this.noteHeads) as NoteHead;
                    }
                }

                let { x } = self.alignToCenter(dummyLedger, alignmentTarget);

                return x;
            };

            let firstHigherLedgerLinePosition = staffBoundaryPositions.highest + 1;

            if (this.highestNotePosition > firstHigherLedgerLinePosition) {
                let ledgerNotesDisplaced = checkDisplacedNotes((n, i) => this.notePositions[i] >= firstHigherLedgerLinePosition);
                let chordWidth = ledgerNotesDisplaced ? this.noteHeadWidth * 2 - this.stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;
                let extraThirds = this.highestNotePosition - staffBoundaryPositions.highest;

                let offsetX = computeLedgerLineOffset(ledgerLineWidth, ledgerNotesDisplaced);

                for (let i = extraThirds % 1, n = extraThirds; i < n; ++i) {
                    let y = -(this.boundaryNoteSpan - i);

                    ledgerLines.push({
                        x1: offsetX,
                        x2: offsetX + ledgerLineWidth,
                        y1: y,
                        y2: y
                    });
                }
            }

            let firstLowerLedgerLinePosition = staffBoundaryPositions.lowest - 1;

            if (this.lowestNotePosition < firstLowerLedgerLinePosition) {
                let ledgerNotesDisplaced = checkDisplacedNotes((n, i) => this.notePositions[i] <= firstLowerLedgerLinePosition);
                let chordWidth = ledgerNotesDisplaced ? this.noteHeadWidth * 2 - this.stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;

                let offsetX = computeLedgerLineOffset(ledgerLineWidth, ledgerNotesDisplaced);
                console.log('xxx', offsetX);

                let extraThirds = this.lowestNotePosition - staffBoundaryPositions.lowest;

                for (let i = extraThirds % 1, n = extraThirds; i > n; --i) {
                    ledgerLines.push({
                        x1: offsetX,
                        x2: offsetX + ledgerLineWidth,
                        y1: i,
                        y2: i
                    });
                }
            }

            ledgerLines = ledgerLines.map(l => {
                l['stroke-width'] = getEngravingDefaults('legerLineThickness');

                return l;
            });

            return ledgerLines;
        },
        stem(): Stem {
            // FIX

            let self = this as any;

            // basicOffsets

            let height: number = 3.5 + this.boundaryNoteSpan;

            // checkExtension

            if (this.clef) {
                let staffBoundaryPositions = getStaffBoundaryPositionsFromClef(this.clef);

                if (this.chord.stemDirection === StemDirection.Down &&
                    this.lowestNotePosition > staffBoundaryPositions.highest + 1.5) {
                    let diff = computePositionDiff(this.lowestNotePosition, staffBoundaryPositions.highest + 1.5);

                    height += diff;
                } else if (this.chord.stemDirection === StemDirection.Up &&
                    this.highestNotePosition < staffBoundaryPositions.lowest - 1.5) {
                    let diff = computePositionDiff(this.highestNotePosition, staffBoundaryPositions.lowest - 1.5);

                    height += diff;
                }
            }

            let snapNote: NoteHead = this.stemDownward ? last(this.noteHeads)! : first(this.noteHeads)!;
            let stem: Stem = {
                width: this.stemWidth,
                height: height,
                x: 0,
                y: 0,
                anchor: this.stemDownward ? { x: 0, y: 0 } : { x: this.stemWidth, y: height },
                isVirtual: false
            };

            // although whole notes does not need stem
            // it could still help aligning ledgers
            // so we keep it here

            if (this.chord.type === MarkType.Whole) {
                stem.isVirtual = true;
            }

            stem = self.snapTo(stem, snapNote);

            return stem;
        },
        noteHeadChar(): string {
            let typeToHeadCodePoint: {[k: string]: number} = {
                [MarkType.Whole]: 0xE0A2,
                [MarkType.Half]: 0xE0A3,
                [MarkType.Quarter]: 0xE0A4
            };

            let codePoint = typeToHeadCodePoint[this.chord.type];

            if (codePoint === undefined) {
                throw new Error('unknown note type');
            }

            return String.fromCodePoint(codePoint);
        },
        noteHeads(): NoteHead[] {
            let noteHeadsBindings: NoteHead[] = [];

            // computedDisplacement

            let addDisplacement = (noteHeadsBindings: NoteHead[], note: Note, i: number, notes: Note[]) => {
                let prevNote = notes[i-1];
                let adjacentNoteFound = prevNote !== undefined && getIntervalBetween(note, prevNote) === 2;
                let isDisplaced = adjacentNoteFound && !noteHeadsBindings[i-1].isDisplaced;

                let x = 0;

                if (this.chord.stemDirection === StemDirection.Down) {
                    if (isDisplaced) {
                        x = this.stemWidth;
                    } else {
                        x = this.noteHeadWidth;
                    }
                } else {
                    if (isDisplaced) {
                        x = this.noteHeadWidth * 2;
                    } else {
                        x = this.noteHeadWidth;
                    }
                }

                x -= this.stemWidth;

                noteHeadsBindings.push({
                    x: x,
                    y: 0,
                    anchor: this.noteHeadAnchors,
                    isDisplaced: isDisplaced,
                    ...this.noteHeadDimensions
                });

                return noteHeadsBindings;
            };

            if (this.stemDownward) {
                noteHeadsBindings = (Array.from(this.chord.notes) as Note[]).reverse().reduce(addDisplacement, []).reverse();
            } else {
                noteHeadsBindings = this.chord.notes.reduce(addDisplacement, []);
            }

            // computeShift

            noteHeadsBindings = noteHeadsBindings.map((n: NoteHead, i) => {
                n.y = -(this.notePositions[i] - this.lowestNotePosition);

                return n;
            });

            return noteHeadsBindings;
        },
        noteHeadDimensions(): Dimensioned {
            return getGlyphDimensions(GlyphKinds.NoteHead, this.chord.type as string);
        },
        noteHeadWidth(): number {
            return getGlyphWidth(GlyphKinds.NoteHead, this.chord.type as string);
        },
        noteHeadAnchors(): Positioned {
            let self = this as any;
            let anchors = getGlyphAnchors(GlyphKinds.NoteHead, this.chord.type);

            if (anchors) {
                if (this.stemDownward) {
                    if (anchors['stemDownNW']) {
                        return self.dupleToCoordinates(anchors['stemDownNW']);
                    }
                } else {
                    if (anchors['stemUpSE']) {
                        return self.dupleToCoordinates(anchors['stemUpSE']);
                    }
                }
            }

            return this.stemDownward ?
                { x: 0, y: 0 } :
                { x: this.noteHeadDimensions.width, y: 0 };
        },
        notePositions(): number[] {
            return this.chord.notes.map(getNotePosition);
        },
        lowestNotePosition(): number {
            return this.notePositions[0];
        },
        highestNotePosition(): number {
            return last(this.notePositions) || this.lowestNotePosition;
        },
        boundaryNoteSpan(): number {
            return computePositionDiff(this.lowestNotePosition, this.highestNotePosition);
        },
        stemWidth(): number {
            return getEngravingDefaults('stemThickness');
        },
        stemDownward(): boolean {
            return this.chord.stemDirection === StemDirection.Down;
        }
    },
    components: {
        GlyphComponent
    },
    mixins: [
      Remizer, Layout
    ]
});

interface NoteHead extends Dimensioned, Positioned, Anchored {
    isDisplaced: boolean
}

interface Stem extends Dimensioned, Positioned {
    isVirtual: boolean;
}
</script>

<style lang="sass" scoped>
rect.stem
    fill: black

line.ledger-line
    stroke: black
</style>