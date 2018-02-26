<template lang="pug">
svg.score(v-bind:width="`${score.layout.scoreWidth}em`" height="100rem")
    svg.system(x="0.1rem" y="10rem")
        svg.staff
            svg.staff-lines
                line.staff-line(
                    v-for="n in 5",
                    :class="`line-${n}`",
                    x1="0",
                    :y1="`${n-1}rem`",
                    x2="100%",
                    :y2="`${n-1}rem`"
                )
            svg.measures
                svg.measure(v-for="measure in measures")
                    template(v-for="item in measure.items")
                        chord-component(
                            v-if="item.kind === 'chord'"
                            v-bind="item"
                        )
                        svg.context(v-else-if="measureItem.kind === 'contextChange'")
                            svg.clef(v-if="measureItem.clef")
                                text.glyph.sign
                            svg.meter(v-if="measureItem.meter")
                                text.glyph.beats-per-measure
                                text.glyph.beat-unit
</template>

<script lang="ts">
import Vue from 'vue';
import ScoreStore from 'Stores/ScoreStore';
import ChordComponent from './Chord.vue';
import { Chord, ClefSign, Context, ContextChange } from 'types';
import { merge } from 'lodash';
import { getNotePosition, getPositionDiff, getStaffBottomLinePositionFromClef } from '../Stores/helpers';

export default Vue.extend({
    name: 'score',
    data() {
        return {
            score: ScoreStore.state,
            currentContexts: ScoreStore.state.initialContexts
        }
    },
    computed: {
        measures(): object[] {
            return this.score.measures.map((measure) => {
                let measureBindings: { [k: string]: any } = {};

                measureBindings.items = measure.items.map((item) => {
                    let itemBindings: { [k: string]: any } = {
                        kind: item.kind
                    };

                    switch(item.kind) {
                        case 'chord':
                            let currentClef = this.currentContexts[item.staffId].clef;
                            let chordBottomNotePosition = getNotePosition(item.notes[0]);
                            let staffBottomLinePosition = getStaffBottomLinePositionFromClef(currentClef);

                            itemBindings.y = 4 - (chordBottomNotePosition - staffBottomLinePosition) + 'rem';

                            itemBindings.chord = item;
                            itemBindings.clef = currentClef;

                            break;
                    }

                    return itemBindings;
                });

                return measureBindings;
            });
        }
    },
    methods: {
        changeContextOnStaff(newContext: ContextChange) {
            merge(this.currentContexts[newContext.staffId], newContext);
        }
    },
    components: {
        ChordComponent
    }
});
</script>

<style lang="sass" scoped>
@font-face
    font-family: Bravura
    src: url(../Fonts/Bravura/woff/Bravura.woff2)

svg.score
    & /deep/ svg
        overflow: visible

    line.staff-line
        stroke: black
        stroke-width: 0.13rem
</style>