export default interface Engraver {
    engraveGlyph(glyphName: string): Engraver;
    moveHead(advancement?: number, verticalPosition?: number): Engraver;
    engraveGlyph(glyphName: string): Engraver;
    print(): Element;
}