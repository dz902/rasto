import glyphTable from "../GlyphTable.js";
export default class SVGEngraver {
    constructor() {
        this.currentPosition = { x: 0, y: 0 };
        this.viewport = SVG.make()
            .size(600, 400);
        this.score = this.viewport.addSVG()
            .move(50, 50);
        this.score
            .addStyle(`
            @font-face {
                font-family: "Bravura";
                src: url(./fonts/bravura/woff/Bravura.woff) format("woff");
            }

            svg.viewport {
                overflow: hidden;
            }

            svg, symbol {
                overflow: visible;
            }

            text.glyph {
                font-family: Bravura;
                font-size: 32px;
            }
            
            line.staffLine, line.barlineSingle {
                stroke-width: 1px;
                stroke: #000;
            }
            
            line.barlineSingle {
                stroke-linecap: square;
            }
        `);
    }
    engraveGlyph(glyphName) {
        const glyphChar = glyphTable[glyphName];
        let glyphNameNotFound = glyphChar === undefined;
        if (glyphNameNotFound) {
            throw new Error(`glyph name "${glyphName}" does not exist.`);
        }
        const glyphText = this.score.addSVG()
            .move(this.currentPosition.x, this.currentPosition.y)
            .addText(glyphChar)
            .addClass("glyph");
        return this;
    }
    move(x, y) {
        this.currentPosition = { x: x, y: y };
        return this;
    }
    print() {
        return this.viewport.element;
    }
}
class SVG {
    static make() {
        const svg = new SVG("svg");
        return svg.addClass("viewport");
    }
    constructor(elementName) {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    }
    get element() {
        return this._element;
    }
    // CHILDREN ELEMENT APPENDER
    addSVG() {
        return this.add("svg");
    }
    addText(text) {
        return this.add("text").textContent(text);
    }
    addStyle(style) {
        return this.add("defs")
            .add("style")
            .textContent(style);
    }
    // PROPERTY MANIPULATOR
    id(id) {
        return this.attr("id", id);
    }
    move(x, y) {
        return this.attr("x", x)
            .attr("y", y);
    }
    size(width, height) {
        return this.attr("width", width)
            .attr("height", height);
    }
    add(elementName) {
        const child = new SVG(elementName);
        this._element.appendChild(child.element);
        return child;
    }
    attr(k, v) {
        this._element.setAttribute(k, `${v}`);
        return this;
    }
    addClass(className) {
        this._element.classList.add(className);
        return this;
    }
    textContent(text) {
        this._element.textContent = text;
        return this;
    }
}
//# sourceMappingURL=SVGEngraver.js.map