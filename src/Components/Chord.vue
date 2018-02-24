<template lang="pug">
svg.chord
    svg.ledger-lines
        line.ledger-line
    svg.note-heads
        glyph-component.note-head {{ noteHeadChar }}
    rect.stem
</template>

<script lang="ts">
import Vue from 'vue';
import { Chord, MarkType } from 'types';
import GlyphComponent from './Glyph.vue';

export default Vue.extend({
    name: 'chord',
    props: {
        chord: {
            type: Object,
            required: true
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
        }
    },
    components: {
        GlyphComponent
    }
});
</script>

<style scoped>

</style>