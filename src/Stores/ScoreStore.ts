import Vue from 'vue';
import Vuex from 'vuex';
import { Chord, ContextChange, Direction, Measure, MeasureItem, Score, StaffItem, Tie } from '../types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openingBar: undefined,
        initialContexts: [],
        measures: [],
        directions: [],
        layout: {
            scoreWidth: 800
        }
    },
    getters: {
        GET_MEASURE_ITEMS_BY_STAFF_ID
    },
    mutations: {
        ADD_MEASURE,
        ADD_DIRECTION
    },
    strict: true
});


// MUTATORS

function ADD_MEASURE(score: Score, measure: Measure) {
    score.measures.push(measure);
}

function ADD_DIRECTION(score: Score, direction: Direction) {
    score.directions.push(direction);
}


// GETTERS

function GET_MEASURE_ITEMS_BY_STAFF_ID(score: Score): (staffId: number) => MeasureItem[] {
    return (staffId: number) => {
        return score.measures.reduce((measureItems: MeasureItem[], measure: Measure) => {
            let measureItemsOnStaff = measure.items.filter(m => m.staffId === staffId);

            return measureItems.concat(measureItemsOnStaff);
        }, []);
    };
}
