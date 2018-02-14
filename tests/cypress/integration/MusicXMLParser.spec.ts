import { MusicXMLParser } from 'Parsers/MusicXMLParser';

describe('MusicXMLParser', () => {
    context('#build()', () => {
        it('should query something', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let parser = new MusicXMLParser(xmlString);

                console.log(parser);
            });
        })
    });
});