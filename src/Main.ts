import Engraver from "./Engravers/SVGEngraver.js";

function Main() {
    const engraver = new Engraver(600, 400);

    document.getElementsByTagName("body")[0]
            .appendChild(engraver.print());

    engraver.engraveBarLineSingle();
    engraver.engraveStaves();
    engraver.engraveClef("gClef", 2);
    engraver.engraveTimeSignature(4, 4);
    engraver.engraveNote("whole", -2);
}

document.addEventListener("DOMContentLoaded", () => {
    Main();
});