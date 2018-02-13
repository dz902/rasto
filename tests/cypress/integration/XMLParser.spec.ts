import { Measure } from 'Schema/Music';

describe('test', () => {
    it('works', () => {
        expect(true).to.be.true;
        expect(new Measure()).to.be.instanceof(Measure);
    });
});