<template lang="pug">
    svg.score(v-bind:width="score.layout.scoreWidth")
        svg.system
            svg.staff
                svg.staff-lines
                    line.staff-line(
                        v-for="n in 5"
                        v-bind:class="`line-${n}`"
                        x1="0"
                        v-bind:y1="n * 8"
                        x2="100%"
                        v-bind:y2="n * 8"
                    )
                svg.measures
                    svg.measure(v-for="measure in score.measures")
                        template(v-for="measureItem in measure.measureItems")
                            svg.chord(v-if="measureItem.kind ==='chord'")
                                svg.ledger-lines
                                    line.ledger-line
                                svg.note-heads
                                    text.glyph.note-head
                                rect.stem
                            svg.context(v-else-if="measureItem.kind === 'contextChange'")
                                svg.clef(v-if="measureItem.clef")
                                    text.glyph.sign
                                svg.meter(v-if="measureItem.meter")
                                    text.glyph.beats-per-measure
                                    text.glyph.beat-unit
</template>

<script lang="ts">
    //import SystemComponent from './System.vue';

    import ScoreStore from 'Stores/ScoreStore';

    export default {
        name: 'score',
        data: {
            score: ScoreStore.state
        },
        components: {
            //SystemComponent
        }
    };
</script>

<style lang="sass" scoped>
    svg.score
        overflow: auto

        line.staff-line
            stroke: black
</style>