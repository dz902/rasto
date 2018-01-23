var Score = /** @class */ (function () {
    function Score() {
        this.svgNS = "http://www.w3.org/2000/svg";
        var style = this.createElement("style");
        style.textContent = "\n            @font-face {\n                font-family: \"Bravura\";\n                src: url(./fonts/bravura/woff/Bravura.woff) format(\"woff\");\n            }\n\n            svg.viewport {\n                overflow: hidden;\n            }\n\n            svg, symbol {\n                overflow: visible;\n            }\n\n            text.glyph {\n                font-family: Bravura;\n                font-size: 32px;\n            }\n            \n            line.staffLine, line.barlineSingle {\n                stroke-width: 1px;\n                stroke: #000;\n            }\n            \n            line.barlineSingle {\n                stroke-linecap: square;\n            }\n            ";
        this.basicDefs = this.createElement("defs");
        this.basicDefs.id = "basicDefs";
        this.basicDefs.appendChild(style);
        this.sheet = this.createElement("svg");
        this.sheet.setAttribute("x", "50");
        this.sheet.setAttribute("y", "50");
        this.sheet.appendChild(this.basicDefs);
        this.viewport = this.createElement("svg");
        this.viewport.classList.add("viewport");
        this.viewport.setAttribute("width", "600");
        this.viewport.setAttribute("height", "400");
        this.viewport.appendChild(this.sheet);
        this.drawClef("gClef");
        this.drawGlyph("noteheadWhole", 0xE0A2);
        this.drawStaff();
    }
    Object.defineProperty(Score.prototype, "svg", {
        get: function () {
            return this.viewport;
        },
        enumerable: true,
        configurable: true
    });
    Score.prototype.drawGlyph = function (name, code) {
        var _this = this;
        this.useGlyph(name, function (symbol) {
            var text = _this.createElement("text");
            text.textContent = String.fromCharCode(code);
            text.classList.add("glyph");
            symbol.appendChild(text);
        });
    };
    Score.prototype.drawClef = function (name) {
        this.useGlyph(name, function (symbol) {
        });
    };
    Score.prototype.drawStaff = function () {
        var _this = this;
        this.useGlyph("staff", function (symbol) {
            var barlineSingle = _this.useGlyph("barlineSingle", function (symbol) {
                var barline = _this.createElement("line");
                barline.setAttribute("x1", "0");
                barline.setAttribute("y1", "0");
                barline.setAttribute("x2", "0");
                barline.setAttribute("y2", "32");
                barline.classList.add("barlineSingle");
                symbol.appendChild(barline);
            });
            symbol.appendChild(barlineSingle);
            for (var i = 0; i < 5; ++i) {
                var line = _this.createElement("line");
                line.setAttribute("x1", "0");
                line.setAttribute("y1", "" + i * 8);
                line.setAttribute("x2", 100);
                line.setAttribute("y2", "" + i * 8);
                line.classList.add("staffLine");
                symbol.appendChild(line);
            }
        });
    };
    Score.prototype.useGlyph = function (name, glyphCreationCallback) {
        var glyphNotExist = this.basicDefs.querySelector("symbol#" + name) === null;
        if (glyphNotExist) {
            var symbol = this.createElement("symbol");
            glyphCreationCallback.call(null, symbol);
            symbol.id = name;
            this.basicDefs.appendChild(symbol);
        }
        var use = this.createElement("use");
        use.setAttribute("href", "#" + name);
        this.sheet.appendChild(use);
        return use;
    };
    Score.prototype.createElement = function (name) {
        return document.createElementNS(this.svgNS, name);
    };
    return Score;
}());
function main() {
}
document.addEventListener("DOMContentLoaded", function () {
    main();
    var score = new Score();
    document.getElementsByTagName("body")[0].appendChild(score.svg);
});
//# sourceMappingURL=main.js.map