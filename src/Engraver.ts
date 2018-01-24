export default interface Engraver {
    engraveGlyph(glyphName: string): Engraver;
    move(x: number, y: number): Engraver;
    engraveGlyph(glyphName: string): Engraver;
    print(): Element;
}