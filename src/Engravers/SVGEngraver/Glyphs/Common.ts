export class SVG {
    protected static invisibleSVG: SVGSVGElement;
    protected rawElement: SVGSVGElement;

    static wrapElement(element: SVGGraphicsElement): SVGSVGElement {
        let wrapper = <SVGSVGElement> SVG.createElement('svg');

        wrapper.appendChild(element);

        return wrapper;
    }

    static createElement(name: string): SVGGraphicsElement {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);

        // addElementToInvisibleSVG

        if (!SVG.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            SVG.invisibleSVG = <SVGSVGElement> document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            SVG.invisibleSVG.setAttribute('style', 'position: absolute; z-index: -100000; visibility: hidden;');

            document.body.appendChild(SVG.invisibleSVG);
        }

        SVG.invisibleSVG.appendChild(element);

        return element;
    }

    // PROPS

    get element(): SVGSVGElement {
        return this.rawElement;
    }

    get width(): number {
        return this.bbox.width;
    }

    get bbox(): SVGRect {
        if (!document.body.contains(this.rawElement)) {
            throw Error('element must be rendered to have a bounding box.');
        }

        if (this.rawElement instanceof SVGGraphicsElement) {
            return this.rawElement.getBBox();
        }

        throw Error('element does not have a bounding box.');
    }

    get x(): number {
        return numberOrDefault(this.element.getAttribute('x'), 0);
    }

    get y(): number {
        return numberOrDefault(this.element.getAttribute('y'), 0);
    }

    // HELPERS

    append(child: SVG): void {
        this.rawElement.appendChild(child.rawElement);
    }

    move(x?: number, y?: number): void {
        if (x) {
            this.setAttribute('x', x);
        }

        if (y) {
            this.setAttribute('y', y);
        }
    }

    translate(x?: number, y?: number): void {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        // so we use a G instead of SVG

        // getTransformer

        let transformerG: SVGGElement | null = this.rawElement.querySelector('g.transformer');
        let notTransformed = transformerG === null;

        if (notTransformed) {
            transformerG = SVG.createElement('g');

            transformerG.classList.add('transformer');

            for (let i = 0; i < this.rawElement.children.length; ++i) {
                transformerG.appendChild(this.rawElement.children[i]);
            }

            this.rawElement.appendChild(transformerG);
        }

        let transform = SVG.invisibleSVG.createSVGTransform();
        transform.setTranslate(x ? x : 0, y ? y : 0);

        transformerG!.transform.baseVal.appendItem(transform);
    }

    private setAttribute(k: string, v: any): SVG {
        this.element.setAttribute(k, `${v}`);

        return this;
    }
}

function numberOrDefault(value: any, defaultValue: number): number {
    let number = Number(value);

    if (Number.isNaN(number)) {
        return defaultValue;
    } else {
        return number;
    }
}