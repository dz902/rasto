import Vue from 'vue';
import Vuex from 'vuex';
import {
    StemDirection} from 'types/music';
import {
    Chord, ClefSign, ContextChange, Direction, MarkType, Measure, MeasureItem, Score, StaffItem,
    Tie
} from '../types/music';

Vue.use(Vuex);

let scoreTest: Score = {
    initialContexts: [
        {
            staffId: 0,
            clef: {
                sign: ClefSign.G,
                lineNumber: 2
            },
            meter: {
                beatsPerMeasure: 4,
                beatUnit: MarkType.Quarter
            }
        },
        {
            staffId: 1,
            clef: {
                sign: ClefSign.F,
                lineNumber: 4
            },
            meter: {
                beatsPerMeasure: 4,
                beatUnit: MarkType.Quarter
            }
        }
    ],
    measures: [
        {
            items: [
                {
                    kind: 'chord',
                    type: MarkType.N8th,
                    notes: [
                        {
                            name: 'D',
                            octaveNumber: 2
                        },
                        {
                            name: 'D',
                            octaveNumber: 5
                        },
                        {
                            name: 'E',
                            octaveNumber: 5
                        },
                        {
                            name: 'F',
                            octaveNumber: 6
                        },
                        {
                            name: 'A',
                            octaveNumber: 6
                        },
                        {
                            name: 'B',
                            octaveNumber: 6
                        }
                    ],
                    stemDirection: StemDirection.Down,
                    staffId: 0
                } as Chord
            ]
        }
    ],
    directions: [],
    layout: {
        scoreWidth: 50
    }
};

export default new Vuex.Store({
    state: scoreTest,
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
