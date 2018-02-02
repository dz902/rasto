export class SVG {
    protected static invisibleSVG: SVGSVGElement;
    protected rawElement: SVGGraphicsElement;
    private transformerElement: SVGGElement;

    private createElement(name: string): SVGGraphicsElement {
        let element = document.createElementNS('http://www.w3.org/2000/svg', name);

        // addElementToInvisibleSVG

        if (!SVG.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            let temporaryViewport = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            temporaryViewport.setAttribute('style', 'position: absolute; z-index: -100000; visibility: hidden;');

            SVG.invisibleSVG = <SVGSVGElement> temporaryViewport;

            document.body.appendChild(SVG.invisibleSVG);
        }

        SVG.invisibleSVG.appendChild(element);

        return element;
    }

    constructor(el: string | SVGGraphicsElement) {
        if (el instanceof SVGGraphicsElement) {
            this.rawElement = el;
        } else {
            this.rawElement = this.createElement(el);
        }
    }

    // PROPS

    get element(): SVGGraphicsElement {
        return this.rawElement;
    }

    get width(): number {
        return this.bbox.width;
    }

    get height(): number {
        return this.bbox.height;
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

    size(width: number, height: number): SVG {
        this.setAttribute('width', width);
        this.setAttribute('height', height);

        return this;
    }

    append(child: SVG): SVG {
        this.rawElement.appendChild(child.rawElement);

        return this;
    }

    move(x?: number, y?: number): void {
        if (x) {
            this.setAttribute('x', x);
        }

        if (y) {
            this.setAttribute('y', y);
        }
    }

    translate(x: number, y: number): void {
        this.transform((t) => {
            t.setTranslate(x, y);
        });
    }

    rotate(angle: number, cx: number, cy: number): void {
        console.log(cx);
        this.transform((t) => {
            t.setRotate(angle, cx, cy);
        });
    }

    private transform(callback: (t: SVGTransform) => void): void {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome
        // so we use a G instead of SVG

        // getTransformer

        if (this.transformerElement === undefined) {

            this.rawElement
                .querySelectorAll('g.transformer')
                .forEach((el) => {
                    if (el.parentNode === this.rawElement) {
                        this.transformerElement = <SVGGElement> el;
                    }
                });

            let notTransformed = (this.transformerElement === undefined);

            if (notTransformed) {
                this.transformerElement = (new SVG('g')).rawElement;

                this.transformerElement.classList.add('transformer');

                while(this.rawElement.children.length > 0) { // length updates in real time...
                    this.transformerElement.appendChild(this.rawElement.children[0]);
                }

                this.rawElement.appendChild(this.transformerElement);
            }
        }


        let transform = SVG.invisibleSVG.createSVGTransform();

        callback(transform);

        this.transformerElement.transform.baseVal.appendItem(transform);
    }

    text(textContent: string): SVG {
        this.rawElement.textContent = textContent;

        return this;
    }

    addClass(className: string): SVG {
        className.split(' ').forEach((c: string) => {
            this.rawElement.classList.add(c);
        })

        return this;
    }

    setAttribute(k: string, v: any): SVG {
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