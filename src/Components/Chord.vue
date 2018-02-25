<template lang="pug">
svg.chord(
    :class="classBindings"
)
    svg.ledger-lines
        line.ledger-line
    svg.note-heads
        glyph-component.note-head(
            v-for="note in notes",
            :key="note.id",
            :x="`${computeDisplacement(chord.type, note.isDisplaced, chord.stemDirection)}rem`"
        ) {{ noteHeadChar }}
    rect.stem
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import { Chord, GlyphKinds, MarkType, Note, StemDirection } from 'types';
import { last, merge } from 'lodash';
import { notePosition } from 'Stores/helpers';
import { getGlyphWidth } from 'Fonts/helpers';

type ChordNote = Note & {
    isDisplaced: boolean;
};

export default Vue.extend({
    name: 'chord',
    props: {
        chord: {
            type: Object,
            required: true
        }
    },
    computed: {
        classBindings(): object {
            let classBinding: {[k: string]: boolean} = {};

            if (this.chord.stemDirection === StemDirection.Down) {
                classBinding['chord-stem-down'] = true;
            } else {
                classBinding['chord-stem-up'] = true;
            }

            return classBinding;
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
        notes(): ChordNote[] {
            let notesWidthDisplacements: ChordNote[];

            let intervalBetween = (noteA: Note, noteB: Note): number => {
                return (Math.abs(notePosition(noteA) - notePosition(noteB)))*2 + 1;
            };

            let addDisplacement = (notesWithDisplacements: ChordNote[], note: Note, i: number, notes: Note[]): ChordNote[] => {
                let prevNote = notesWithDisplacements[i-1];
                let adjacentNoteFound = prevNote !== undefined && intervalBetween(note, prevNote) === 2;
                let adjacentNoteIsNotDisplaced = adjacentNoteFound && prevNote.isDisplaced === false;
                let chordNote: ChordNote = merge(note, { isDisplaced: adjacentNoteIsNotDisplaced });

                notesWithDisplacements.push(chordNote);

                return notesWithDisplacements;
            };

            let notes: Note[] = Array.from(this.chord.notes);

            if (this.chord.stemDirection === StemDirection.Up) {
                notesWidthDisplacements = notes.reduce(addDisplacement, []);
            } else {
                notesWidthDisplacements = notes.reverse().reduce(addDisplacement, []).reverse();
            }

            return notesWidthDisplacements;
        }
    },
    methods: {
        computeDisplacement (markType: MarkType, isDisplaced: boolean, stemDirection: StemDirection): number {
            let glyphWidth = getGlyphWidth(GlyphKinds.NoteHead, markType as string);

            if (stemDirection === StemDirection.Down) {
                return isDisplaced ? 0 : glyphWidth;
            } else {
                return isDisplaced ? glyphWidth : 0;
            }
        }
    },
    components: {
        GlyphComponent
    }
});
</script>

<style scoped>

</style>