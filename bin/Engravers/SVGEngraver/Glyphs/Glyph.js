import * as SMuFL from '../../../Schema/SMuFL.js';
const EM = 32;
const STAFF_SPACE = 0.25 * EM;
export class Glyph {
    constructor(type, id) {
        this.type = type;
        this.id = id;
        // DRAW
        this.draw = () => {
            this.rawElement = Glyph.createElement('svg');
            this.rawElement.classList.add(`id-${this.id}`);
            this.rawElement.classList.add(this.type);
        };
        if (!Glyph.invisibleSVG) {
            Glyph.invisibleSVG = Glyph.createElement('svg');
            Glyph.invisibleSVG.setAttribute('style', 'position: absolute; z-index: -100000; visibility: hidden;');
            document.body.appendChild(Glyph.invisibleSVG);
        }
        Glyph.meta = SMuFL.load('Bravura');
        this.draw();
    }
    static createElement(name) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);
        return element;
    }
    // SVG OPS
    get element() {
        return this.rawElement;
    }
    get width() {
        return this.bbox.width;
    }
    get bbox() {
        if (!document.body.contains(this.rawElement)) {
            throw Error('element must be rendered to have a bounding box.');
        }
        if (this.rawElement instanceof SVGGraphicsElement) {
            return this.rawElement.getBBox();
        }
        throw Error('element does not have a bounding box.');
    }
    append(child) {
        this.rawElement.appendChild(child.rawElement);
    }
    translate(x, y) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        // if (this.rawElement instanceof SVGSVGElement) {
        //     throw new Error('transform does not work on SVGSVGElement');
        // }
        //
        // let transform = Glyph.invisibleSVG.createSVGTransform();
        // transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);
        //
        // this.rawElement.transform.baseVal.appendItem(transform);
    }
}
//# sourceMappingURL=Glyph.js.map