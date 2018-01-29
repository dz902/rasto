import { MusicXMLRenderer as Parser } from './Renderers/MusicXMLRenderer.js';
function Main() {
    fetch('../var/Beams.xml')
        .then(response => response.text())
        .then((xmlString) => {
        let music = Parser.render(xmlString);
        let musicElement = music.element;
        document.getElementsByTagName('body')[0]
            .appendChild(musicElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    Main();
});
//# sourceMappingURL=Main.js.map