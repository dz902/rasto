import { MusicXMLParser } from './Parsers/MusicXMLParser.js';
import { SVGEngraver } from './Engravers/SVGEngraver.js';

function Main() {
    fetch('../var/Beams.xml')
        .then(response => response.text())
        .then((xmlString) => {
            let score = MusicXMLParser.parse(xmlString);
            let musicElement = SVGEngraver.engrave(score);

            document.body.appendChild(musicElement);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    Main();
});