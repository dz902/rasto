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
        v-if="stem"
        v-bind="remize(stem)"
    )
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import { remize } from 'mixins';
import { Nullable, Bindings, GlyphKinds, MarkType, Note, StemDirection } from 'types';
import { at, range, last, merge } from 'lodash';
import {
    getIntervalBetween,
    getNotePosition,
    getPositionDiff,
    getStaffBoundaryPositionsFromClef
} from 'Stores/helpers';
import { getEngravingDefaults, getGlyphAnchors, getGlyphWidth } from 'Fonts/helpers';

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
        ledgerLines(): Bindings[] {
            let ledgerLines: Bindings[] = [];

            if (!this.clef) {
                return ledgerLines;
            }

            let stemWidth = this.stem ? this.stem.width : 0;
            let ledgerLineExtension = getEngravingDefaults('legerLineExtension') * 2;
            let basicOffset = -ledgerLineExtension / 2;
            let staffBoundaryPositions = getStaffBoundaryPositionsFromClef(this.clef);

            let checkDisplacedNotes = (filter: (n: Note) => boolean): boolean => {
                return this.chord.notes.reduce((displacedNotesIndices: number[], note: Note, i: number): number[] => {
                    if (filter(note)) {
                        if (this.noteHeads[i].isDisplaced) {
                            displacedNotesIndices.push(i);
                        }
                    }

                    return displacedNotesIndices;
                }, []).length > 0;
            };

            if (this.highestNotePosition > staffBoundaryPositions.highest) {
                let extraThirds = Math.floor(this.highestNotePosition) - staffBoundaryPositions.highest;
                let ledgerNotesIsDisplaced = checkDisplacedNotes(n => getNotePosition(n) >= this.highestNotePosition + 1);
                let chordWidth = ledgerNotesIsDisplaced ? this.noteHeadWidth * 2 - stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;

                for (let i = 0, n = extraThirds; i < n; ++i) {
                    let y = this.highestNotePosition - i - 1;

                    ledgerLines.push({
                        x1: basicOffset,
                        x2: basicOffset + ledgerLineWidth,
                        y1: y,
                        y2: y
                    });
                }
            }

            if (this.lowestNotePosition < staffBoundaryPositions.lowest) {
                let extraThirds = Math.abs(Math.ceil(this.lowestNotePosition) - staffBoundaryPositions.lowest);
                let ledgerNotesIsDisplaced = checkDisplacedNotes(n => getNotePosition(n) <= this.lowestNotePosition - 1);
                let chordWidth = ledgerNotesIsDisplaced ? this.noteHeadWidth * 2 - stemWidth : this.noteHeadWidth;
                let ledgerLineWidth = ledgerLineExtension + chordWidth;

                if (this.chord.stemDirection === StemDirection.Down) {
                    if (!ledgerNotesIsDisplaced) {
                        basicOffset += this.noteHeadWidth-stemWidth;
                    }
                } else {

                }

                for (let i = 0, n = extraThirds; i < n; ++i) {
                    ledgerLines.push({
                        x1: basicOffset,
                        x2: basicOffset + ledgerLineWidth,
                        y1: i,
                        y2: i
                    });
                }
            }

            ledgerLines = ledgerLines.map(l => {
                let noteOffsetCompensation = this.chord.stemDirection === StemDirection.Down ? 0 : this.noteHeadWidth;

                l.x1 += noteOffsetCompensation;
                l.x2 += noteOffsetCompensation;

                l['stroke-width'] = getEngravingDefaults('legerLineThickness');

                return l;
            });

            return ledgerLines;
        },
        stem(): Nullable<Bindings> {
            if (this.chord.type === MarkType.Whole) {
                return null;
            }

            let stemWidth = getEngravingDefaults('stemThickness');

            // basicOffsets

            let height = 3.5 + this.boundaryNoteSpan;
            let x = this.chord.stemDirection === StemDirection.Down ? this.noteHeadWidth : this.noteHeadWidth * 2;
            let y = this.chord.stemDirection === StemDirection.Down ? 0 : -height;

            x -= stemWidth;

            // checkAnchors

            let anchors = this.noteHeadAnchors;

            if (anchors) {
                if (this.chord.stemDirection === StemDirection.Down) {
                    if (anchors['stemDownNW']) {
                        x += anchors['stemDownNW'][0];
                        y -= anchors['stemDownNW'][1]+this.boundaryNoteSpan;
                        height += anchors['stemDownNW'][1];
                    }
                } else {
                    if (anchors['stemUpSE']) {
                        x += (this.noteHeadWidth - anchors['stemUpSE'][0]);
                        height -= anchors['stemUpSE'][1];
                    }
                }
            }

            // checkExtension

            if (this.clef) {
                let staffBoundaryPositions = getStaffBoundaryPositionsFromClef(this.clef);

                if (this.chord.stemDirection === StemDirection.Down &&
                    this.lowestNotePosition > staffBoundaryPositions.highest + 1.5) {
                    let diff = getPositionDiff(this.lowestNotePosition, staffBoundaryPositions.highest + 1.5);

                    height += diff;
                } else if (this.chord.stemDirection === StemDirection.Up &&
                           this.highestNotePosition < staffBoundaryPositions.lowest - 1.5) {
                    let diff = getPositionDiff(this.highestNotePosition, staffBoundaryPositions.lowest - 1.5);

                    y -= diff;
                    height += diff;
                }
            }

            return {
                width: stemWidth,
                height: height,
                x: x,
                y: y
            };
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
        noteHeads(): Bindings[] {
            let noteHeadsBindings: Bindings[] = [];

            // computedDisplacement

            let addDisplacement = (noteHeadsBindings: Bindings[], note: Note, i: number, notes: Note[]) => {
                let prevNote = notes[i-1];
                let adjacentNoteFound = prevNote !== undefined && getIntervalBetween(note, prevNote) === 2;
                let isDisplaced = adjacentNoteFound && !noteHeadsBindings[i-1].isDisplaced;

                let anchors = this.noteHeadAnchors;
                let x: number = 0;
                let stemWidth: number = this.stem ? this.stem.width as number : 0;

                if (this.chord.stemDirection === StemDirection.Down) {
                    if (isDisplaced) {
                        x = 0;
                    } else {
                        x = this.noteHeadWidth - stemWidth;

                        if (anchors && anchors['stemUpSE']) {
                            x += this.noteHeadWidth - anchors['stemUpSE'][0];
                        }
                    }
                } else {
                    if (isDisplaced) {
                        x = this.noteHeadWidth * 2;

                        if (anchors && anchors['stemDownNW']) {
                            x -= anchors['stemDownNW'][0];
                        }

                        x -= stemWidth;
                    } else {
                        x = this.noteHeadWidth;
                    }
                }

                noteHeadsBindings.push({
                    x: x,
                    isDisplaced: isDisplaced
                });

                return noteHeadsBindings;
            };

            if (this.chord.stemDirection === StemDirection.Up) {
                noteHeadsBindings = this.chord.notes.reduce(addDisplacement, []);
            } else {
                noteHeadsBindings = (Array.from(this.chord.notes) as Note[]).reverse().reduce(addDisplacement, []).reverse();
            }

            // computeShift

            noteHeadsBindings = noteHeadsBindings.map((n, i) => {
                n.y = -(getNotePosition(this.chord.notes[i]) - this.lowestNotePosition);

                return n;
            });

            return noteHeadsBindings;
        },
        noteHeadWidth(): number {
            return getGlyphWidth(GlyphKinds.NoteHead, this.chord.type as string);
        },
        noteHeadAnchors(): { [k:string]: [number, number] } | null {
            return getGlyphAnchors(GlyphKinds.NoteHead, this.chord.type);
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
            return getPositionDiff(this.lowestNotePosition, this.highestNotePosition);
        }
    },
    components: {
        GlyphComponent
    },
    mixins: [
        remize
    ]
});
</script>

<style lang="sass" scoped>
rect.stem
    fill: black

line.ledger-line
    stroke: black
</style>