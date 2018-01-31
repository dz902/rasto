import { MusicXMLParser } from './Parsers/MusicXMLParser.js';
import { SVGEngraver } from './Engravers/SVGEngraver.js';
function Main() {
    fetch('../var/HelloWorld.xml')
        .then(response => response.text())
        .then((xmlString) => {
        let score = MusicXMLParser.parse(xmlString);
        let musicalElement = SVGEngraver.engrave(score);
        document.body.appendChild(musicalElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    Main();
});
//# sourceMappingURL=Main.js.map