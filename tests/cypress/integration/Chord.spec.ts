import ChordComponent from 'Components/Chord.vue';
import { MarkType, StemDirection } from 'types';

describe('Chord', () => {
    context('#noteHeads', () => {
        it('should shift notes correctly', () => {
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

        it('should displace chords correctly for upward stem', () => {
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

            expect(chordComponent.noteHeads[0].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[1].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[2].isDisplaced).to.equal(true);
            expect(chordComponent.noteHeads[3].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[4].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[5].isDisplaced).to.equal(true);
        });

        it('should displace chords correctly for downward stem', () => {
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
                stemDirection: StemDirection.Down,
                staffId: 0
            };

            const chordComponent: any = new ChordComponent({ propsData: { chord } });

            expect(chordComponent.noteHeads[0].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[1].isDisplaced).to.equal(true);
            expect(chordComponent.noteHeads[2].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[3].isDisplaced).to.equal(false);
            expect(chordComponent.noteHeads[4].isDisplaced).to.equal(true);
            expect(chordComponent.noteHeads[5].isDisplaced).to.equal(false);
        });
    });

    context('#stem', () => {
        it('should be correctly aligned', () => {

        });

        it('should have length of an octave for single note', () => {

        });

        it('should have length of an octave plus note span', () => {

        });

        it('should extend to middle line for distant chord when downward', () => {

        });

        it('should extend to middle line for distant chord when upward', () => {

        });
    });
});