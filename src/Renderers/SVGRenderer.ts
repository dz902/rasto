import { Score } from 'Schema/Music';
import { last, Nullable } from '../Utilities';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STAFF_SPACE = 8;

export class SVGRenderer {
    private viewport: SVG;

    static render(score: Score, width: number, height: number): Element {
        return (new SVGRenderer(score, width, height)).element;
    }

    constructor(score: Score, width: number, height: number) {
        this.viewport = new SVG(width*STAFF_SPACE, height*STAFF_SPACE);

        score.staves.forEach((context, i) => {
            this.createStaff();
        });
    }

    get element(): SVGElement {
        return this.viewport.rawElement;
    }

    private createStaff(): SVG {
        let staff = this.viewport.drawSVG('staff');

        for (let i = 0; i < 5; ++i) {
            staff.drawLine(50)
                 .move(0, i*4);
        }

        return staff;
    }
}

class SVG {
    private rootElement: SVGSVGElement;
    private elementHistory: SVGElement[] = [];

    constructor(width: number, height: number) {
        this.rootElement = this.createElement('svg') as SVGSVGElement;
        this.elementHistory.push(this.rootElement);

        this.size(width, height);
    }

    get rawElement(): SVGSVGElement {
        return this.rootElement;
    }

    private get currentElement(): SVGElement {
        return last(this.elementHistory) || this.rootElement;
    }

    drawSVG(name: string): this {
        this.drawElement('svg')
            .addClass(name);

        return this;
    }

    drawGlyph(codePoint: number): this {
        this.drawElement('text')
            .text(String.fromCodePoint(codePoint));

        return this;
    }

    drawRect(width: number, height: number): this {
        this.drawElement('rect')
            .size(width, height);

        return this;
    }

    drawLine(width: number): this {
        this.drawElement('line')
            .setAttribute('x1', 0)
            .setAttribute('x2', width)
            .setAttribute('y1', 0)
            .setAttribute('y2', 0);

        return this;
    }

    move(x: number, y: number): this {
        return this.transform(t => t.setTranslate(x, y));
    }

    size(width: number, height: number): this {
        this.setAttribute('width', width)
            .setAttribute('height', height);

        return this;
    }

    private setAttribute(k: string, v: any): this {
        this.currentElement.setAttribute(k, String(v));

        return this;
    }

    private drawElement(name: string): this {
        let element = this.createElement(name);

        this.appendChild(element);

        this.elementHistory.push(element as SVGElement);

        return this;
    }

    private end(): this {
        this.elementHistory.pop();

        return this;
    }

    private text(text: string): this {
        this.rootElement.textContent = text;

        return this;
    }

    private createElement(name: string): SVGElement {
        let element = document.createElementNS(SVG_NAMESPACE, name);

        return element;
    }

    private appendChild(childElement: SVGElement): this {
        this.rootElement.appendChild(childElement);

        return this;
    }

    private addClass(className: string): this {
        this.currentElement.classList.add(className);

        return this;
    }

    private transform(callback: (t: SVGTransform) => void): this {
        let transform = this.rootElement.createSVGTransform();

        callback(transform);

        (this.currentElement as SVGGraphicsElement).transform.baseVal.appendItem(transform);

        return this;
    }
}