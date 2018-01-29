import { MusicXMLRenderer as Parser } from './Renderers/MusicXML.js';
function Main() {
    fetch('../var/HelloWorld.xml')
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