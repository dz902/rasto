import MusicXML from './Schema/MusicXML.js';
function Main() {
    fetch('../var/HelloWorld.xml')
        .then(response => response.text())
        .then((xmlString) => {
        let music = MusicXML.render(xmlString);
        let musicElement = music.element;
        document.getElementsByTagName('body')[0]
            .appendChild(musicElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    Main();
});
//# sourceMappingURL=Main.js.map