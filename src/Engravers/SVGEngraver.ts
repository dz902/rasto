import Engraver from "../Engraver.js";
import glyphTable from "../GlyphTable.js";

export default class SVGEngraver implements Engraver {
    private currentPosition: {x: number; y: number} = {x: 0, y: 0};
    private viewport: SVG;
    private score: SVG;

    constructor() {
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

    public engraveGlyph(glyphName: string): SVGEngraver {
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

    public move(x: number, y: number): SVGEngraver {
        this.currentPosition = {x: x, y: y};

        return this;
    }

    public print(): SVGElement {
        return this.viewport.element;
    }
}

class SVG {
    private _element: SVGElement;

    static make(): SVG {
        const svg = new SVG("svg");

        return svg.addClass("viewport");
    }

    private constructor(elementName: string) {
        this._element = <SVGElement> document.createElementNS("http://www.w3.org/2000/svg", elementName);
    }

    get element() {
        return this._element;
    }

    // CHILDREN ELEMENT APPENDER

    public addSVG(): SVG {
        return this.add("svg");
    }

    public addText(text: string): SVG {
        return this.add("text").textContent(text);
    }

    public addStyle(style: string): SVG {
        return this.add("defs")
            .add("style")
            .textContent(style);
    }

    // PROPERTY MANIPULATOR

    public id(id: string): SVG {
        return this.attr("id", id);
    }

    public move(x: number, y: number): SVG {
        return this.attr("x", x)
            .attr("y", y);
    }

    public size(width: number, height: number): SVG {
        return this.attr("width", width)
            .attr("height", height);
    }

    public add(elementName: string): SVG {
        const child = new SVG(elementName);

        this._element.appendChild(child.element);

        return child;
    }

    public attr(k: string, v: any): SVG {
        this._element.setAttribute(k, `${v}`);

        return this;
    }

    public addClass(className: string): SVG {
        this._element.classList.add(className);

        return this;
    }

    public textContent(text: string): SVG {
        this._element.textContent = text;

        return this;
    }
}
