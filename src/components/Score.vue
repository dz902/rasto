<template lang="pug">
svg.score(v-bind:width="`${score.layout.scoreWidth}em`" height="100rem")
    svg.system(x="1rem" y="15rem")
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
import ScoreStore from 'stores/score';
import ChordComponent from './Chord.vue';
import { merge } from 'lodash';
import {
    getNotePosition,
    getStaffLinePositionFromClef
} from 'helpers';
import { BBoxed, Bindings, ContextChange, Positioned } from 'types';
import { remize } from '../mixins';

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
                let measureBindings: Bindings = {};

                measureBindings.items = measure.items.map((item) => {
                    let itemBindings: Positioned & BBoxed = {
                        kind: item.kind,
                        x: 0,
                        y: 0,
                        bBox: {
                            NE: { x: 0, y: 0 },
                            SW: { x: 0, y: 0 }
                        }
                    };

                    switch(item.kind) {
                        case 'chord':
                            let currentClef = this.currentContexts[item.staffId].clef;

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
    components: {
        ChordComponent
    },
    mixins: [
        remize
    ]
});
</script>

<style lang="sass" scoped>
@font-face
    font-family: Bravura
    src: url(../fonts/bravura/woff/Bravura.woff2)

svg.score
    & /deep/ svg
        overflow: visible

    line.staff-line
        stroke: black
        stroke-width: 0.13rem
</style>