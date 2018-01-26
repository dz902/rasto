import MusicXML from "./Schema/MusicXML.js";
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
        <duration>2</duration>
        <type>half</type>
      </note>
      <note>
        <chord />
        <pitch>
          <step>D</step>
          <octave>4</octave>
        </pitch>
        <duration>2</duration>
        <type>half</type>
      </note>
      <note>
        <chord />
        <pitch>
          <step>E</step>
          <octave>4</octave>
        </pitch>
        <duration>2</duration>
        <type>half</type>
      </note>
      <note>
        <chord />
        <pitch>
          <step>F</step>
          <octave>4</octave>
        </pitch>
        <duration>2</duration>
        <type>half</type>
      </note>
      <note>
        <pitch>
          <step>F</step>
          <octave>4</octave>
        </pitch>
        <duration>2</duration>
        <type>half</type>
      </note>
    </measure>
  </part>
</score-partwise>
    `;
    const music = new MusicXML(musicXML);
    const musicElement = music.element;
    document.getElementsByTagName("body")[0]
        .appendChild(musicElement);
    /*
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
        engraver.engraveLedgerLine(-(16-noteHead.actualWidth) / 2, -2);
        engraver.moveHead(noteHead.actualWidth);
        engraver.engraveNoteHead("half", 1);
    
        engraver.moveHead(32);
        engraver.engraveNoteHead("whole", -2);
    */
}
document.addEventListener("DOMContentLoaded", () => {
    Main();
});
//# sourceMappingURL=Main.js.map