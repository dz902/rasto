import { MusicXMLParser } from 'Parsers/MusicXMLParser';
import { ClefSign, Context } from 'Schema/Music';
import { SVGRenderer } from '../../../src/Renderers/SVGRenderer';

describe('MusicXMLParser', () => {
    context('#01a-Pitches-Pitches', () => {
        it('should parse g clef', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let score = MusicXMLParser.parse(xmlString);

                let element = SVGRenderer.render(score, 400, 300);

                console.log(element);
            });
        });

        it('should parse 26 measures', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let score = MusicXMLParser.parse(xmlString);

            });
        })
    });
});