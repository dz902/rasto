import { JXON } from 'Parsers/MusicXMLParser';

describe('JXON', () => {
    context('#build()', () => {
        it('should query something', () => {
            cy.fixture('musicxml/01a-Pitches-Pitches.xml').then((xmlString: string) => {
                let doc = (new DOMParser()).parseFromString(xmlString, 'application/xml');

                console.log((new JXON()).build(doc));
            });
        })
    });
});