import Vue from 'vue';
import Vuex from 'vuex';
import {
    StemDirection,
    Chord, ClefSign, Direction, MarkType, Measure, MeasureItem, Score, StaffItem,
    Tie, AccidentalType, Context, GlyphKind
} from 'types';
import { createMeasureBindings } from '../helpers';

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
                    type: MarkType.N64th,
                    notes: [
                        {
                            name: 'D',
                            octaveNumber: 2
                        },
                        {
                            name: 'D',
                            octaveNumber: 5,
                            accidental: {
                                type: AccidentalType.Sharp
                            }
                        },
                        {
                            name: 'E',
                            octaveNumber: 5,
                            accidental: {
                                type: AccidentalType.Flat
                            }
                        },
                        {
                            name: 'F',
                            octaveNumber: 6,
                            accidental: {
                                type: AccidentalType.Sharp
                            }
                        },
                        {
                            name: 'A',
                            octaveNumber: 6
                        },
                        {
                            name: 'B',
                            octaveNumber: 6,
                            accidental: {
                                type: AccidentalType.Flat
                            }
                        }
                    ],
                    stemDirection: StemDirection.Up,
                    staffId: 0
                } as Chord,
                {
                    kind: 'chord',
                    type: MarkType.N64th,
                    notes: [
                        {
                            name: 'D',
                            octaveNumber: 2
                        },
                        {
                            name: 'D',
                            octaveNumber: 5,
                            accidental: {
                                type: AccidentalType.Sharp
                            }
                        },
                        {
                            name: 'E',
                            octaveNumber: 5,
                            accidental: {
                                type: AccidentalType.Flat
                            }
                        },
                        {
                            name: 'F',
                            octaveNumber: 6,
                            accidental: {
                                type: AccidentalType.Sharp
                            }
                        },
                        {
                            name: 'A',
                            octaveNumber: 6
                        },
                        {
                            name: 'B',
                            octaveNumber: 6,
                            accidental: {
                                type: AccidentalType.Flat
                            }
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
        measureItems: state => {
            return state.measures.reduce((items: MeasureItem[], measure: Measure) => {
                measure.items.forEach(item => items.push(item));

                return items;
            }, []);
        },
        measuresByStaffId: state => (staffId: number) => {
            return createMeasureBindings(state.measures, state.initialContexts[staffId]);
        }
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
