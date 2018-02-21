import { MusicXMLParser } from 'Parsers/MusicXMLParser';
import { ClefSign, Context } from 'Schema/Music';

describe('MusicXMLParser', () => {
    context('#01a-Pitches-Pitches', () => {
        it('should parse g clef', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let score = MusicXMLParser.parse(xmlString);

                expect(score.getStaffItems(0)[0]).to.be.instanceof(Context);
                expect((score.getStaffItems(0)[0] as any).clef.sign).to.equal(ClefSign.G);
            });
        });

        it('should parse 26 measures', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let score = MusicXMLParser.parse(xmlString);

                expect(score.measures.length).to.equal(26);
            });
        })
    });
});