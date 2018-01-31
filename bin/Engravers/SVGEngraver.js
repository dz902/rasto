import { ScoreGlyph } from './SVGEngraver/Glyphs.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
export class SVGEngraver {
    static engrave(score) {
        let scoreGlyph = new ScoreGlyph(score);
        return ScoreGlyph.wrapElement(scoreGlyph.element);
    }
}
class SVG {
    static create(elementName) {
        return new SVG(elementName);
    }
    static createText(text) {
        return SVG.create('text').textContent(text);
    }
    static createLine(endingPoint) {
        return SVG.create('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', endingPoint[0] * STAFF_SPACE)
            .attr('y2', endingPoint[1] * STAFF_SPACE);
    }
    static createRect(width, height) {
        return SVG.create('rect')
            .size(width, height);
    }
    static createPolygon(points) {
        points = points.map(p => [p[0] * STAFF_SPACE, p[1] * STAFF_SPACE]);
        return SVG.create('polygon')
            .attr('points', points.map(p => p.join(',')).join(' '));
    }
    constructor(el) {
        if (el instanceof SVGGraphicsElement) {
            this.childElement = el;
        }
        else {
            this.childElement = document.createElementNS('http://www.w3.org/2000/svg', el);
        }
    }
    // ATTRIBUTE GETTERS
    get element() {
        return this.childElement;
    }
    get width() {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions
        return this.bbox.width;
    }
    get viewport() {
        const viewport = this.childElement.viewportElement;
        return viewport === null ? this : (new SVG(viewport));
    }
    get bbox() {
        if (!document.body.contains(this.element)) {
            throw Error("element must be rendered to have a bounding box.");
        }
        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }
        throw Error("element does not have a bounding box.");
    }
    // CHILDREN ELEMENT APPENDERS
    appendSVG() {
        return this.appendChild('svg');
    }
    appendStyle(style) {
        return this.appendChild('defs')
            .appendChild('style')
            .textContent(style);
    }
    appendElement(child) {
        this.childElement.appendChild(child.element);
        return child;
    }
    // PROPERTY MANIPULATORS
    id(id) {
        return this.attr('id', id);
    }
    move(x, y) {
        if (x) {
            this.attr('x', x * STAFF_SPACE);
        }
        if (y) {
            this.attr('y', y * STAFF_SPACE);
        }
        return this;
    }
    translate(x, y) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        if (this.element instanceof SVGSVGElement) {
            throw new Error('transform does not work on SVGSVGElement');
        }
        if (!SVG.transfomer) {
            SVG.transfomer = SVG.create("svg").element;
        }
        let transform = SVG.transfomer.createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);
        this.element.transform.baseVal.appendItem(transform);
        return this;
    }
    size(width, height) {
        return this.attr('width', width * STAFF_SPACE)
            .attr('height', height * STAFF_SPACE);
    }
    appendChild(elementName) {
        const child = new SVG(elementName);
        this.childElement.appendChild(child.element);
        return child;
    }
    attr(k, v) {
        this.childElement.setAttribute(k, `${v}`);
        return this;
    }
    addClass(className) {
        this.childElement.classList.add(className);
        return this;
    }
    textContent(text) {
        this.childElement.textContent = text;
        return this;
    }
}
//# sourceMappingURL=SVGEngraver.js.map