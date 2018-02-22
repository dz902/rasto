import { Chord, ContextChange, Measure, Score, Store, Tie } from './types';

const store: Store<Score> = {
    state: {
        openingBar: undefined,
        initialContexts: [],
        measures: [],
        directions: []
    },
    mutations: {
        ADD_CHORD
    }
};

export default store;

// MUTATORS

function ADD_CHORD(score: Score, chord: Chord) {
    getLastMeasure(score).staffItems.push(chord);
}

function ADD_CONTEXT_CHANGE(score: Score, contextChange: ContextChange) {
    getLastMeasure(score).staffItems.push(contextChange);
}

function ADD_TIE(score: Score, tie: Tie) {
    score.directions.push(tie);
}

// HELPERS

function getLastMeasure(score: Score): Measure {
    let lastMeasure = score.measures.slice(-1)[0];

    if (lastMeasure === undefined) {
        throw new Error('no measure added yet');
    }

    return lastMeasure;
}
