<template lang="pug">
svg.chord
    svg.chord-body(
    v-bind="remize(chord)"
    )
        line.ledger-line(
        v-for="ledgerLine in ledgerLines"
        v-bind="remize(ledgerLine)"
        )
        glyph-component.note-head(
        v-for="noteHead in noteHeads"
        v-bind:key="Math.random()"
        v-bind="remize(noteHead)"
        ) {{ noteHead.textContent }}
        rect.stem(
        v-if="!stem.isVirtual"
        v-bind="remize(stem)"
        )
        glyph-component.flag(
        v-for="flag in flags"
        v-bind:key="Math.random()"
        v-bind="remize(flag)"
        ) {{ flag.textContent }}
        glyph-component.accidental(
        v-for="accidental in accidentals"
        v-bind:key="Math.random()"
        v-bind="remize(accidental)"
        ) {{ accidental.textContent }}
</template>

<script lang="ts">
import Vue from 'vue';
import GlyphComponent from './Glyph.vue';
import { remize } from 'mixins';
import { at, range, first, last, merge, forEachRight } from 'lodash';

export default Vue.extend({
    name: 'chord',
    props: {
        chord: {
            type: Object,
            required: true
        },
        ledgerLines: {
            type: Array,
            required: true
        },
        noteHeads: {
            type: Array,
            required: true
        },
        stem: {
            type: Object,
            required: true
        },
        flags: {
            type: Array,
            required: true
        },
        accidentals: {
            type: Array,
            required: true
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

text.flag
    fill: rgba(0, 0, 0, 0.5)

line.ledger-line
    stroke: black
</style>