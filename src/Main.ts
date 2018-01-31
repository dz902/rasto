import { MusicXMLParser } from './Parsers/MusicXMLParser.js';
import { SVGEngraver } from './Engravers/SVGEngraver.js';

function Main() {
    fetch('../var/HelloWorld.xml')
        .then(response => response.text())
        .then((xmlString) => {
            let score = MusicXMLParser.parse(xmlString);
            let musicElement = SVGEngraver.engrave(score);


            document.querySelectorAll('.note').forEach((n) => {
                console.log((<SVGGraphicsElement>n).getBBox());
            })

            document.body.appendChild(musicElement);

            document.querySelectorAll('.note').forEach((n) => {
                console.log((<SVGGraphicsElement>n).getBBox());
            })
        });
}

document.addEventListener('DOMContentLoaded', () => {
    Main();
});