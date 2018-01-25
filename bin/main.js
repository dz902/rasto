import Engraver from "./Engravers/SVGEngraver.js";
function Main() {
    const musicXML = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC
    "-//Recordare//DTD MusicXML 3.1 Partwise//EN"
    "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>whole</type>
      </note>
    </measure>
  </part>
</score-partwise>
    `;
    const parser = new DOMParser();
    const $music = parser.parseFromString(musicXML, 'application/xml');
    function qs(element, selector) {
        const result = element.querySelector(selector);
        if (result instanceof Element) {
            return result;
        }
        else {
            throw new Error(`select "${selector}" has no matches`);
        }
    }
    function qsa(element, selector) {
        const result = element.querySelector(selector);
        if (result instanceof NodeList) {
            return result;
        }
        else {
            throw new Error(`select "${selector}" has no matches`);
        }
    }
    const $scorePartwise = qs($music, 'score-partwise');
    const $partList = qs($scorePartwise, 'part-list');
    const $scoreParts = qsa($partList, 'score-part');
    let scoreParts = {};
    $scoreParts.forEach(($s) => {
        const $scorePart = $s;
        const partName = String(qs($scorePart, 'part-name').textContent);
        if ($scorePart.id === "") {
            throw new Error("score-part does not have an ID");
        }
        else {
            scoreParts[$scorePart.id] = partName;
        }
    });
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
    engraver.engraveStem("up", -2, 8);
    engraver.engraveLedgerLine(-(16 - noteHead.actualWidth) / 2, -2);
    engraver.moveHead(noteHead.actualWidth);
    engraver.engraveNoteHead("half", 1);
    engraver.moveHead(32);
    engraver.engraveNoteHead("whole", -2);
}
document.addEventListener("DOMContentLoaded", () => {
    Main();
});
//# sourceMappingURL=Main.js.map