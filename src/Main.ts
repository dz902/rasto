import Engraver from "./Engravers/SVGEngraver.js";

function Main() {
    const engraver = new Engraver();

    engraver.engraveGlyph("gClef");

    alert(123);

    document.getElementsByTagName("body")[0]
            .appendChild(engraver.print());
}

document.addEventListener("DOMContentLoaded", () => {
    Main();
});