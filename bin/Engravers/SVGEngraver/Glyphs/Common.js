export class SVG {
    createElement(name) {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);
        // addElementToInvisibleSVG
        if (!SVG.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            let temporaryViewport = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            temporaryViewport.setAttribute('style', 'position: absolute; z-index: -100000; visibility: hidden;');
            SVG.invisibleSVG = temporaryViewport;
            document.body.appendChild(SVG.invisibleSVG);
        }
        SVG.invisibleSVG.appendChild(element);
        return element;
    }
    constructor(el) {
        if (el instanceof SVGGraphicsElement) {
            this.rawElement = el;
        }
        else {
            this.rawElement = this.createElement(el);
        }
    }
    // PROPS
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
    get x() {
        return numberOrDefault(this.element.getAttribute('x'), 0);
    }
    get y() {
        return numberOrDefault(this.element.getAttribute('y'), 0);
    }
    // HELPERS
    size(width, height) {
        this.setAttribute('width', width);
        this.setAttribute('height', height);
        return this;
    }
    append(child) {
        this.rawElement.appendChild(child.rawElement);
        return this;
    }
    move(x, y) {
        if (x) {
            this.setAttribute('x', x);
        }
        if (y) {
            this.setAttribute('y', y);
        }
    }
    translate(x, y) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        // so we use a G instead of SVG
        // getTransformer
        let transformerG = this.rawElement.querySelector('g.transformer');
        let notTransformed = transformerG === null;
        if (notTransformed) {
            transformerG = (new SVG('g')).rawElement;
            transformerG.classList.add('transformer');
            for (let i = 0; i < this.rawElement.children.length; ++i) {
                transformerG.appendChild(this.rawElement.children[i]);
            }
            this.rawElement.appendChild(transformerG);
        }
        let transform = SVG.invisibleSVG.createSVGTransform();
        transform.setTranslate(x ? x : 0, y ? y : 0);
        transformerG.transform.baseVal.appendItem(transform);
    }
    text(textContent) {
        this.rawElement.textContent = textContent;
        return this;
    }
    addClass(className) {
        this.rawElement.classList.add(className);
        return this;
    }
    setAttribute(k, v) {
        this.element.setAttribute(k, `${v}`);
        return this;
    }
}
function numberOrDefault(value, defaultValue) {
    let number = Number(value);
    if (Number.isNaN(number)) {
        return defaultValue;
    }
    else {
        return number;
    }
}
//# sourceMappingURL=Common.js.map