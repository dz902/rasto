const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
export class SVG {
    createElement(name) {
        let element = document.createElementNS(SVG_NAMESPACE, name);
        // addElementToInvisibleSVG
        if (!SVG.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            let temporaryViewport = document.createElementNS(SVG_NAMESPACE, 'svg');
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
    get height() {
        return this.bbox.height;
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
        return numberOrDefault(this.bbox.x, 0);
    }
    get y() {
        return numberOrDefault(this.bbox.y, 0);
    }
    // HELPERS
    // these are only for graphics elements, should be made clear in the future
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
        this.transform((t) => {
            if (x !== undefined) {
                t.setTranslate(x, 0);
            }
        });
        this.transform((t) => {
            if (y !== undefined) {
                t.setTranslate(0, y);
            }
        });
    }
    rotate(angle, cx, cy) {
        this.transform((t) => {
            t.setRotate(angle, cx, cy);
        });
    }
    transform(callback) {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        // so we use a G instead of SVG
        // getTransformer
        if (this.transformerElement === undefined) {
            let transformers = this.rawElement
                .querySelectorAll('g.transformer');
            Array.from(transformers).forEach((el) => {
                if (el.parentNode === this.rawElement) {
                    this.transformerElement = el;
                }
            });
            let notTransformed = (this.transformerElement === undefined);
            if (notTransformed) {
                this.transformerElement = (new SVG('g')).rawElement;
                this.transformerElement.classList.add('transformer');
                while (this.rawElement.children.length > 0) {
                    this.transformerElement.appendChild(this.rawElement.children[0]);
                }
                this.rawElement.appendChild(this.transformerElement);
            }
        }
        let transform = SVG.invisibleSVG.createSVGTransform();
        callback(transform);
        this.transformerElement.transform.baseVal.appendItem(transform);
    }
    text(textContent) {
        this.rawElement.textContent = textContent;
        return this;
    }
    addClass(className) {
        className.split(' ').forEach((c) => {
            this.rawElement.classList.add(c);
        });
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