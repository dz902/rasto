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
import { getIntervalBetween, getNotePosition, getPositionDiff } from 'Stores/helpers';
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

            let addDisplacement = (notesWithDisplacements: (typeof noteHeadsBindings), note: Note, i: number, notes: Note[]): object[] => {
                let prevNote = notes[i-1];
                let adjacentNoteFound = i > 0 && getIntervalBetween(note, prevNote) === 2;
                let isDisplaced = adjacentNoteFound && notesWithDisplacements[i-1].isDisplaced === false;

                notesWithDisplacements.push({ isDisplaced: isDisplaced }); // ugly, refactor later

                let anchors = this.noteHeadAnchors;
                let x = 0;

                if (this.chord.stemDirection === StemDirection.Down) {
                    if (isDisplaced) {
                        x = getEngravingDefaults('stemThickness');
                    } else {
                        x = this.noteHeadWidth as number;

                        if (anchors && anchors['stemUpSE']) {
                            x += (this.noteHeadWidth as number) - anchors['stemUpSE'][0];
                        }
                    }
                } else {
                    if (isDisplaced) {
                        x = this.noteHeadWidth as number;

                        if (anchors && anchors['stemDownNW']) {
                            x -= anchors['stemDownNW'][0];
                        }

                        x -= getEngravingDefaults('stemThickness');
                    } else {
                        x = 0;
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

            let lowestNotePosition = getNotePosition(notes[0]);

            notes.forEach((note, i) => {
                noteHeadsBindings[i].y = -(getNotePosition(note)-lowestNotePosition) + 'rem';
            });

            return noteHeadsBindings;
        },
        stem(): object | null {
            if (this.chord.type === MarkType.Whole) {
                return null;
            }

            let height = 3.5 + getPositionDiff(getNotePosition(this.chord.notes[0]), getNotePosition(this.chord.notes[this.chord.notes.length-1]));
            let x = this.noteHeadWidth as number;
            let y = this.chord.stemDirection === StemDirection.Down ? 0 : -height;

            // checkAnchors

            let anchors = this.noteHeadAnchors;

            if (anchors) {
                if (this.chord.stemDirection === StemDirection.Down) {
                    if (anchors['stemDownNW']) {
                        x += anchors['stemDownNW'][0];
                        y -= anchors['stemDownNW'][1];
                        height += anchors['stemDownNW'][1];
                    }
                } else {
                    if (anchors['stemUpSE']) {
                        x = anchors['stemUpSE'][0];
                        height -= anchors['stemUpSE'][1];
                    }
                }
            }

            return {
                height: height + 'rem',
                x: x + 'rem',
                y: y + 'rem'
            };
        },
        noteHeadWidth(): number {
            return getGlyphWidth(GlyphKinds.NoteHead, this.chord.type as string);
        },
        noteHeadAnchors(): { [k:string]: [number, number] } | null {
            return getGlyphAnchors(GlyphKinds.NoteHead, this.chord.type);
        }
    },
    methods: {
        computeDisplacement(isDisplaced: boolean): number {
            if (this.chord.stemDirection === StemDirection.Down) {
                return isDisplaced ? 0 : this.noteHeadWidth as number;
            } else {
                return isDisplaced ? this.noteHeadWidth as number : 0;
            }
        }
    },
    components: {
        GlyphComponent
    }
});
</script>

<style lang="sass" scoped>
rect.stem
    width: 0.12rem
    fill: black
</style>