import Vue from 'vue';
import Vuex from 'vuex';
import ScoreComponent from 'Components/Score.vue';

Vue.use(Vuex);


const store = new Vuex.Store({
                                 state: {},
                                 mutations: {}
                             });

const app = new Vue({
    el: '#app',
    store,
    template: '<Score />',
    components: { ScoreComponent }
});

/**
 * Score Facade
 * - ensure correct structure of Score
 * - provide simple UI for Score manipulation
 */
class ScoreFacade implements Score {
    private score: Score;

    constructor(initialContexts: Context[], openingBar?: Bar) {
        this.score = {
            openingBar: openingBar,
            initialContexts: initialContexts,
            measures: [],
            directions: []
        };
    }

    get openingBar(): Bar | undefined {
        return this.score.openingBar;
    }

    get initialContexts(): Context[] {
        return Array.from(this.score.initialContexts);
    }

    get measures(): Measure[] {
        return Array.from(this.score.measures);
    }

    get directions(): Direction[] {
        return Array.from(this.score.directions);
    }

    addMeasure(measure: Measure): this {
        this.score.measures.push(measure);

        return this;
    }

    addChord(chord: Chord): this {
        this.currentMeasure.staffItems.push(chord);

        return this;
    }

    addTie(tie: Tie): this {
        return this;
    }

    private get currentMeasure(): Measure {
        if (this.measures.length === 0) {
            throw new Error('score has no measures');
        }

        return this.measures.slice(-1)[0];
    }

    private addDirection(direction: Direction): this {
        this.score.directions.push(direction);

        return this;
    }
}

/**
 * Item family
 */

interface ReferableItem {
    id: number;
}

interface StaffItem {
    staffId: number;
}

interface PartItem {
    partId: number;
}

/**
 * Container family
 */

interface Score {
    openingBar?: Bar;
    initialContexts: Context[];
    measures: Measure[];
    directions: Direction[];
}

interface Measure {
    endingBar?: Bar;
    staffItems: StaffItem[];
}

/**
 * StaffItem family
 */

interface Context extends StaffItem {
    clef: Clef;
    meter: Meter;
}

interface ContextChange extends StaffItem {
    clef?: Clef;
    meter?: Meter;
}

interface Bar extends StaffItem {
    type: BarType;
}

interface Mark extends ReferableItem, StaffItem, PartItem {
    type: MarkType;
}

interface Chord extends Mark {
    notes: Note[];
    articulations: Articulation[];
}

interface Rest extends Mark {

}

/**
 * Direction family
 */

interface Direction {
    chordId: number;
}

interface Slur extends Direction {
    endingChordId: number;
}

interface Tie extends Direction {
    pitchIndices: number[];
}

interface Dynamics extends Direction {
    type: DynamicsType;
}

/**
 * Compound types
 */


interface Note {
    name: NoteName;
    octaveNumber: OctaveNumber;
    accidental?: Accidental;
}

interface Articulation {
    type: ArticulationType;
}

interface Accidental {
    type: AccidentalType;
}

interface Clef {
    sign: ClefSign;
    lineNumber: number;
}

interface Meter {
    beatsPerMeasure: number;
    beatUnit: MarkType;
}

/**
 * Atomic types
 */

enum MarkType {
    Whole = 'whole'
}

type NoteName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
type OctaveNumber = number;

enum ClefSign {
    G = 'g',
    F = 'f',
    C = 'c'
}

enum BarType {
    Regular = 'regular'
}

enum DynamicsType {
    FF = 'ff'
}

enum ArticulationType {
    Accent = 'accent'
}

enum AccidentalType {
    Sharp = 'sharp'
}

/**
 * Utilities
 */

type Nullable<T> = T | null;
