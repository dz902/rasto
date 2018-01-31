import { ScoreGlyph } from './SVGEngraver/Glyphs.js';
import { Score } from '../Schema/Music.js'; // FIX
import log from '../Utilities/Logger.js';

const EM = 32;
const STAFF_SPACE = 0.25 * EM;

export class SVGEngraver {
    static engrave(score: Score): SVGSVGElement {
        let scoreGlyph = new ScoreGlyph(score);

        return ScoreGlyph.wrapElement(scoreGlyph.element);
    }
}

class SVG {
    private childElement: SVGGraphicsElement;
    private static transfomer: SVGSVGElement; // awkward requirement for creating transform objects

    static create(elementName: string): SVG {
        return new SVG(elementName);
    }

    static createText(text: string): SVG {
        return SVG.create('text').textContent(text);
    }

    static createLine(endingPoint: Coordinates): SVG {
        return SVG.create('line')
                  .attr('x1', 0)
                  .attr('y1', 0)
                  .attr('x2', endingPoint[0] * STAFF_SPACE)
                  .attr('y2', endingPoint[1] * STAFF_SPACE);
    }

    static createRect(width: number, height: number): SVG {
        return SVG.create('rect')
                  .size(width, height);
    }

    static createPolygon(points: Coordinates[]): SVG {
        points = points.map(p => <Coordinates>[p[0]*STAFF_SPACE, p[1]*STAFF_SPACE]);
        return SVG.create('polygon')
                  .attr('points', points.map(p => p.join(',')).join(' '));
    }

    private constructor(el: string | SVGGraphicsElement) {
        if (el instanceof SVGGraphicsElement) {
            this.childElement = el;
        } else {
            this.childElement = <SVGGraphicsElement> document.createElementNS('http://www.w3.org/2000/svg', el);
        }
    }

    // ATTRIBUTE GETTERS

    get element(): SVGGraphicsElement {
        return this.childElement;
    }

    get width(): number {
        // this is extremely confusing as svg elements will ignore explicit width
        // only to calculate bounding box from its content
        // we need to have glyphs with fixed dimensions

        return this.bbox.width;
    }

    get viewport(): SVG {
        const viewport = this.childElement.viewportElement;

        return viewport === null ? this : (new SVG(viewport));
    }

    get bbox(): SVGRect {
        if (!document.body.contains(this.element)) {
            throw Error("element must be rendered to have a bounding box.")
        }

        if (this.element instanceof SVGGraphicsElement) {
            return this.element.getBBox();
        }

        throw Error("element does not have a bounding box.");
    }

    // CHILDREN ELEMENT APPENDERS

    appendSVG(): SVG {
        return this.appendChild('svg');
    }

    appendStyle(style: string): SVG {
        return this.appendChild('defs')
                   .appendChild('style')
                   .textContent(style);
    }

    appendElement(child: SVG): SVG {
        this.childElement.appendChild(child.element);

        return child;
    }

    // PROPERTY MANIPULATORS

    id(id: string): SVG {
        return this.attr('id', id);
    }

    move(x?: number, y?: number): SVG {
        if (x) {
            this.attr('x', x * STAFF_SPACE);
        }

        if (y) {
            this.attr('y', y * STAFF_SPACE);
        }

        return this;
    }

    translate(x?: number, y?: number): SVG {
        // it turns out that transform is supported on nested svg elements
        // only in SVG 2 and SVG 2 was not implemented in Chrome

        if (this.element instanceof SVGSVGElement) {
            throw new Error('transform does not work on SVGSVGElement');
        }

        if (!SVG.transfomer) {
            SVG.transfomer = <SVGSVGElement> SVG.create("svg").element;
        }

        let transform = SVG.transfomer.createSVGTransform();
        transform.setTranslate(x ? x * STAFF_SPACE : 0, y ? y * STAFF_SPACE : 0);

        this.element.transform.baseVal.appendItem(transform);

        return this;
    }

    size(width: number, height: number): SVG {
        return this.attr('width', width * STAFF_SPACE)
                   .attr('height', height * STAFF_SPACE);
    }

    appendChild(elementName: string): SVG {
        const child = new SVG(elementName);

        this.childElement.appendChild(child.element);

        return child;
    }

    attr(k: string, v: any): SVG {
        this.childElement.setAttribute(k, `${v}`);

        return this;
    }

    addClass(className: string): SVG {
        this.childElement.classList.add(className);

        return this;
    }

    textContent(text: string): SVG {
        this.childElement.textContent = text;

        return this;
    }
}


interface EngravingState {
    beams: {
        [beamNumber: number]: Coordinates
    };
    clefSign: "G" | "F";
}

type Coordinates = [number, number];

type Offsets = {x: number, y: number};