<template lang="pug">
svg.score(v-bind:width="`${score.layout.scoreWidth}em`")
    svg.system(x="0.1rem" y="1rem")
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
                svg.measure(v-for="measure in score.measures")
                    template(v-for="measureItem in measure.items")
                        chord-component(
                            v-if="measureItem.kind === 'chord'",
                            :chord="measureItem",
                            :y="`${computeChordShift(measureItem)}rem`"
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

export default Vue.extend({
    name: 'score',
    data() {
        return {
            score: ScoreStore.state,
            currentContexts: ScoreStore.state.initialContexts
        }
    },
    methods: {
        computeStaffBottomSpace(context: Context): number {
            let bottomSpace = 0;

            switch (context.clef.sign) {
                case ClefSign.G:
                    bottomSpace = 7*4 + 3 - 1;
                    break;
            }

            return bottomSpace / 2;
        },
        computeChordShift(chord: Chord): number {
            let bottomNote = chord.notes[0];
            let chordBottomSpace = ((bottomNote.octaveNumber * 7) + 'CDEFGAB'.indexOf(bottomNote.name)) / 2;
            let staffBottomSpace = this.computeStaffBottomSpace(this.currentContexts[chord.staffId]);

            return 4 - (chordBottomSpace - staffBottomSpace);
        },
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