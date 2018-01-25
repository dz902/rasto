import Engraver from "./Engravers/SVGEngraver.js";
function Main() {
    const engraver = new Engraver(600, 400);
    document.getElementsByTagName("body")[0]
        .appendChild(engraver.print());
    engraver.engraveStaves();
    engraver.engraveBarLineSingle();
    engraver.moveHead(2);
    engraver.engraveClef("gClef", 2);
    engraver.moveHead(32);
    engraver.engraveTimeSignature(4, 4);
    engraver.moveHead(32);
    engraver.engraveNote("half", -2);
    engraver.engraveNote("half", 0);
}
document.addEventListener("DOMContentLoaded", () => {
    Main();
});
//# sourceMappingURL=Main.js.map