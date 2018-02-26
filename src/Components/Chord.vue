<template lang="pug">
svg.chord()
    svg.ledger-lines
        line.ledger-line
    svg.note-heads
        glyph-component.note-head(
            v-for="noteHead in noteHeads"
            v-bind:key="Math.random()"
            v-bind="noteHead"
        ) {{ noteHeadChar }}
    rect.stem(
        v-if="stem"
        v-bind="stem"
    )
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import { GlyphKinds, MarkType, Note, StemDirection } from 'types';
import { last, merge } from 'lodash';
import {
    getIntervalBetween,
    getNotePosition,
    getPositionDiff,
    getStaffBoundaryPositionsFromClef
} from 'Stores/helpers';
import { getEngravingDefaults, getGlyphAnchors, getGlyphWidth } from 'Fonts/helpers';

type ChordNote = Note & {
    isDisplaced: boolean
};

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
        stem(): { [k: string]: string } | null {
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
                width: stemWidth + 'rem',
                height: height + 'rem',
                x: x + 'rem',
                y: y + 'rem'
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
        noteHeads(): object[] {
            let noteHeadsBindings: { [k: string]: any }[] = [];

            // computedDisplacement

            let addDisplacement = (notesWithDisplacements: (typeof noteHeadsBindings), note: Note, i: number, notes: Note[]): object[] => {
                let prevNote = notes[i-1];
                let adjacentNoteFound = i > 0 && getIntervalBetween(note, prevNote) === 2;
                let isDisplaced = adjacentNoteFound && notesWithDisplacements[i-1].isDisplaced === false;

                notesWithDisplacements.push({ isDisplaced: isDisplaced }); // ugly, refactor later

                let anchors = this.noteHeadAnchors;
                let x: number = 0;
                let stemWidth = this.stem ? Number.parseFloat(this.stem['width']) : 0;

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

                let noteHeadBindings = {
                    x: x + 'rem'
                };

                noteHeadsBindings.push(noteHeadBindings); // ugly, refactor later

                return notesWithDisplacements;
            };

            let notes: Note[] = Array.from(this.chord.notes);

            if (this.chord.stemDirection === StemDirection.Up) {
                notes.reduce(addDisplacement, []);
            } else {
                notes.reverse().reduce(addDisplacement, []);

                noteHeadsBindings.reverse(); // ugly refactor later
            }

            // computeShift

            notes.forEach((note, i) => {
                noteHeadsBindings[i].y = -(getNotePosition(note)-this.lowestNotePosition) + 'rem';
            });

            return noteHeadsBindings;
        },
        noteHeadWidth(): number {
            return getGlyphWidth(GlyphKinds.NoteHead, this.chord.type as string);
        },
        noteHeadAnchors(): { [k:string]: [number, number] } | null {
            return getGlyphAnchors(GlyphKinds.NoteHead, this.chord.type);
        },
        lowestNotePosition(): number {
            return getNotePosition(this.chord.notes[0]);
        },
        highestNotePosition(): number {
            let lastNote: Note | undefined = last(this.chord.notes);

            if (lastNote) {
                return getNotePosition(lastNote);
            } else {
                return this.lowestNotePosition;
            }
        },
        boundaryNoteSpan(): number {
            return getPositionDiff(this.lowestNotePosition, this.highestNotePosition);
        }
    },
    components: {
        GlyphComponent
    }
});
</script>

<style lang="sass" scoped>
rect.stem
    fill: black
</style>