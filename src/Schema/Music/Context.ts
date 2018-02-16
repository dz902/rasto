import { Clef, ClefSign, Key, Meter, StaffPlaces } from 'Schema/Music';

export class Context {
    constructor(readonly clef: Clef,
                readonly key: Key,
                readonly meter: Meter) {
    }

    get bottomStaffPlace(): number {
        let staffPlace = 0;

        switch (this.clef.sign) {
            case ClefSign.F:
                staffPlace = (StaffPlaces.octave) * 2 + StaffPlaces.fifth;
                break;
            case ClefSign.G:
                staffPlace = (StaffPlaces.octave) * 4 + StaffPlaces.third;
                break;
            default:
                throw new Error();
        }

        return staffPlace;
    }

    get topStaffPlace(): number {
        return this.bottomStaffPlace + StaffPlaces.ninth;
    }

    get midStaffPlace(): number {
        return this.bottomStaffPlace + StaffPlaces.fifth;
    }

    merge(newContext: Context): Context {
        return new Context(newContext.clef || this.clef, newContext.key || this.key, newContext.meter || this.meter);
    }
}