import ChordComponent from 'Components/Chord.vue';
import { MarkType, StemDirection } from 'types';

describe('Chord', () => {
    it('should mount and render correctly', () => {
        let chord = {
            kind: 'chord',
            type: MarkType.Quarter,
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
            stemDirection: StemDirection.Up,
            staffId: 0
        };

        const chordComponent = new ChordComponent({ propsData: { chord } }).$mount();
    });
});