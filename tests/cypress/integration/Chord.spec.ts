import ChordComponent from 'Components/Chord.vue';
import { MarkType, StemDirection } from 'types';

describe('Chord', () => {
    context('#noteHeads', () => {
        it('should shift notes for downward stem', () => {
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

            const chordComponent: any = new ChordComponent({ propsData: { chord } });

            expect(chordComponent.noteHeads[0].y).to.equal(0);
            expect(chordComponent.noteHeads[1].y).to.equal(-10.5);
            expect(chordComponent.noteHeads[2].y).to.equal(-11);
            expect(chordComponent.noteHeads[3].y).to.equal(-15);
            expect(chordComponent.noteHeads[4].y).to.equal(-16);
            expect(chordComponent.noteHeads[5].y).to.equal(-16.5);
        });


    });
});