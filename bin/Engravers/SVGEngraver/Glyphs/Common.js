"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
class SVG {
    createElement(name) {
        let element = document.createElementNS(SVG_NAMESPACE, name);
        // addElementToInvisibleSVG
        if (!SVG.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            let temporaryViewport = document.createElementNS(SVG_NAMESPACE, 'svg');
            temporaryViewport.setAttribute('style', 'position: absolute; z-index: -100000; left: -1000000; background: red;');
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
        let nominalWidth = this.rawElement.getAttribute('width');
        if (nominalWidth) {
            return Number(nominalWidth);
        }
        else {
            console.warn('using bbox width, which may be incorrect for text elements');
            return this.bbox.width;
        }
    }
    set width(width) {
        this.size(width);
    }
    set height(height) {
        this.size(undefined, height);
    }
    get height() {
        let nominalHeight = this.rawElement.getAttribute('height');
        if (nominalHeight) {
            return Number(nominalHeight);
        }
        else {
            console.warn('using bbox height, which may be incorrect for text elements');
            return this.bbox.height;
        }
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
        if (width) {
            this.setAttribute('width', width);
        }
        if (height) {
            this.setAttribute('height', height);
        }
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
exports.SVG = SVG;
function numberOrDefault(value, defaultValue) {
    let number = Number(value);
    if (Number.isNaN(number)) {
        return defaultValue;
    }
    else {
        return number;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvQ29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxhQUFhLEdBQUcsNEJBQTRCLENBQUM7QUFFbkQ7SUFLWSxhQUFhLENBQUMsSUFBWTtRQUM5QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1RCwyQkFBMkI7UUFFM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixtR0FBbUc7WUFDbkcscUJBQXFCO1lBQ3JCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkUsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSx3RUFBd0UsQ0FBQyxDQUFDO1lBRWxILEdBQUcsQ0FBQyxZQUFZLEdBQW1CLGlCQUFpQixDQUFDO1lBRXJELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsWUFBWSxFQUErQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxFQUFFLFlBQVksa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0wsQ0FBQztJ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