import { MusicXMLParser } from './Parsers/MusicXMLParser.js';
import { SVGEngraver } from './Engravers/SVGEngraver.js';

function Main() {
    fetch('../../var/Accidentals.xml')
        .then(response => response.text())
        .then((xmlString) => {
            let score = MusicXMLParser.parse(xmlString);
            let musicalElement = SVGEngraver.engrave(score);

            document.body.appendChild(musicalElement);
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        });


    fetch('../../var/Beams.xml')
        .then(response => response.text())
        .then((xmlString) => {
            let score = MusicXMLParser.parse(xmlString);
            let musicalElement = SVGEngraver.engrave(score);

            document.body.appendChild(musicalElement);
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        });


    fetch('../../var/HelloWorld.xml')
        .then(response => response.text())
        .then((xmlString) => {
            let score = MusicXMLParser.parse(xmlString);
            let musicalElement = SVGEngraver.engrave(score);

            document.body.appendChild(musicalElement);
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
        });
}

document.addEventListener('DOMContentLoaded', () => {
    Main();
});