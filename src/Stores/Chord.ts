import { Articulation, Chord, Note } from './types';

const module: ChordModule = {
    state: {
        type: null,
        notes: [],
        articulations: []
    }
};

export default module;


// TYPES


interface ChordModule {
    state: Chord;
}
