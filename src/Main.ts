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

    const noteHead = engraver.engraveNoteHead("half", -2);
    engraver.engraveNoteHead("half", 0);
    engraver.engraveNoteHead("half", 2);
    engraver.engraveStem("up", -2, 2);
    engraver.engraveLedgerLine(-(16-noteHead.actualWidth) / 2, -2);
}

document.addEventListener("DOMContentLoaded", () => {
    Main();
});