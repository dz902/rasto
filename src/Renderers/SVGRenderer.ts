import { last, Maybe } from 'Utilities/index';
import * as SMuFL from 'Schema/SMuFL';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const META: SMuFL.Meta = SMuFL.Meta.load();

export class SVGRenderer implements Renderer {
    private static invisibleSVG: SVGElement;

    private element: Maybe<SVGGraphicsElement> = null;
    private elementHistory: SVGGraphicsElement[] = [];

    // BASIC

    static begin(): SVGRenderer {
        return (new SVGRenderer()).start();
    }

    start(): SVGRenderer {
        if (this.element !== null) {
            throw new Error('cannot start again');
        }

        this.element = this.createElement('svg');
        this.elementHistory.push(this.element);

        return this;
    }

    then(): SVGRenderer {
        this.elementHistory.pop();

        return this;
    }

    finish(): SVGGraphicsElement {
        let element = this.element;

        if (element === null) {
            throw new Error('not started yet');
        }

        this.element = null;

        return element;
    }

    // DRAW

    drawRect(width: number, height: number): SVGRenderer {
        let rect = this.createElement('rect');

        rect.setAttribute('width', String(width));
        rect.setAttribute('height', String(height));

        return this;
    }

    drawLine(strokeWidth: number, length: number): SVGRenderer {
        return this.draw('line')
                   .attr('stroke-width', strokeWidth)
                   .attr('x1', 0)
                   .attr('y1', 0)
                   .attr('x2', length)
                   .attr('y2', 0);
    }

    drawGlyph(type: string, key: string): SVGRenderer {
        let codePoints = META.getGlyphCodePoints(type, key);

        return this.drawText(codePoints.codepoint)
                   .addClass('glyph');
    }

    drawText(text: string): SVGRenderer {
        return this.draw('text')
                   .text(text);
    }

    // ELEMENT OPERATION

    move(): Renderer {
        return this;
    }

    // SVG

    private constructor() {}

    private get currentElement(): SVGElement {
        let lastElement = last(this.elementHistory);

        if (lastElement === undefined) {
            throw new Error();
        }

        return lastElement;
    }

    private attr(key: string, value: number | string): SVGRenderer {
        this.currentElement.setAttribute(key, String(value));

        return this;
    }

    private text(text: string): SVGRenderer {
        this.currentElement.textContent = text;

        return this;
    }

    private addClass(className: string): SVGRenderer {
        this.currentElement.classList.add(className);

        return this;
    }

    private draw(elementName: string): SVGRenderer {
        let element = this.createElement(elementName);

        this.currentElement.appendChild(element);
        this.elementHistory.push(element);

        return this;
    }

    private createElement(elementName: string): SVGGraphicsElement {
        let element = <SVGGraphicsElement> document.createElementNS(SVG_NAMESPACE, elementName);

        // addElementToInvisibleSVG

        if (!SVGRenderer.invisibleSVG) {
            // funny this won't work as style is not loaded into a blank svg, now we only use width in metadata
            // FIX: to be removed
            let temporaryViewport = document.createElementNS(SVG_NAMESPACE, 'svg');
            temporaryViewport.setAttribute('style', 'position: absolute; z-index: -100000; left: -1000000; background: red;');

            SVGRenderer.invisibleSVG = <SVGSVGElement> temporaryViewport;

            document.body.appendChild(SVGRenderer.invisibleSVG);
        }

        SVGRenderer.invisibleSVG.appendChild(element);

        return element;
    }
}

interface Renderer {
    // BASIC

    start(): Renderer;
    then(): Renderer;
    finish(): Element;

    // DRAW

    drawRect(width: number, height: number): Renderer;
    drawLine(strokeWidth: number, length: number): Renderer;
    drawGlyph(type: string, key: string): Renderer;
    drawText(text: string): Renderer;

    // ELEMENT OPERATION

    move(): Renderer;
}