class Score {
    private svgNS: string = "http://www.w3.org/2000/svg";
    private viewport: SVGElement;
    private sheet: SVGElement;
    private basicDefs: SVGDefsElement;

    get svg(): SVGElement {
        return this.viewport;
    }

    public constructor() {
        const style = <SVGStyleElement> this.createElement("style");
        style.textContent = `
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
            `;

        this.basicDefs = <SVGDefsElement> this.createElement("defs");
        this.basicDefs.id = "basicDefs";

        this.basicDefs.appendChild(style);

        this.sheet = <SVGElement> this.createElement("svg");
        this.sheet.setAttribute("x", "50");
        this.sheet.setAttribute("y", "50");

        this.sheet.appendChild(this.basicDefs);

        this.viewport = <SVGElement> this.createElement("svg");
        this.viewport.classList.add("viewport");
        this.viewport.setAttribute("width", "600");
        this.viewport.setAttribute("height", "400");

        this.viewport.appendChild(this.sheet);

        this.drawClef("gClef");
        this.drawGlyph("noteheadWhole", 0xE0A2);
        this.drawStaff();
    }

    private drawGlyph(name: string, code: number): void {
        this.useGlyph(name, (symbol) => {
            const text = this.createElement("text");

            text.textContent = String.fromCharCode(code);
            text.classList.add("glyph");

            symbol.appendChild(text);
        });
    }

    private drawClef(name: string): void {
        this.useGlyph(name, (symbol) => {
            
        });
    }

    private drawStaff(): void {
        this.useGlyph("staff", (symbol) => {
            const barlineSingle = this.useGlyph("barlineSingle", (symbol) => {
                const barline = this.createElement("line");

                barline.setAttribute("x1", "0");
                barline.setAttribute("y1", "0");
                barline.setAttribute("x2", "0");
                barline.setAttribute("y2", "32");
                barline.classList.add("barlineSingle");

                symbol.appendChild(barline);
            });

            symbol.appendChild(barlineSingle);

            for (let i = 0; i < 5; ++i) {
                const line = this.createElement("line");

                line.setAttribute("x1", "0");
                line.setAttribute("y1", `${i * 8}`);
                line.setAttribute("x2", 100);
                line.setAttribute("y2", `${i * 8}`);
                line.classList.add("staffLine");

                symbol.appendChild(line);
            }
        });
    }

    private useGlyph(name: string, glyphCreationCallback: (SVGSymbolElement) => void) : SVGUseElement {
        const glyphNotExist = this.basicDefs.querySelector("symbol#" + name) === null;

        if (glyphNotExist) {
            const symbol = this.createElement("symbol");

            glyphCreationCallback.call(null, symbol);

            symbol.id = name;

            this.basicDefs.appendChild(symbol);
        }

        const use = <SVGUseElement> this.createElement("use");

        use.setAttribute("href", "#" + name);

        this.sheet.appendChild(use);

        return use;
    }

    private createElement(name: string) : SVGElement {
        return <SVGElement> document.createElementNS(this.svgNS, name);
    }
}

function main() {

}

document.addEventListener("DOMContentLoaded", () => {
    main();

    const score = new Score();

    document.getElementsByTagName("body")[0].appendChild(score.svg);
});