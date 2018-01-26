export default class MusicXML {
    private music: DOM;

    public constructor(dataString: string) {
        const music = DOM.parse(dataString);

        music.q("score-partwise")
    }
}

class DOM {
    private currentNode: Element | Document;

    static parse(dataString: string): DOM {
        return new DOM(dataString);
    }

    static wrap(node: Element): DOM {
        return new DOM(node);
    }

    private constructor(x: string | Element) {
        if (x instanceof Element) {
            this.currentNode = x;
        } else {
            this.currentNode = (new DOMParser()).parseFromString(x, "application/xml");
        }
    }

    get id(): string {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;

            if (id === "") {
                throw new Error("empty id");
            }

            return id;
        }

        throw new Error("document does not have ids");
    }

    get value(): string {
        let value = this.currentNode.textContent;

        if (value === null) {
            throw new Error("no text content value found");
        }

        return value;
    }

    q(selector: string): DOM {
        let result = this.currentNode.querySelector(selector);

        if (result === null) {
            throw new Error(`selector "${selector}" has no matches`);
        } else {
            this.currentNode = result;
            return this;
        }
    }

    qq(selector: string): DOMCollection {
        let result = this.currentNode.querySelectorAll(selector);

        if (result.length === 0) {
            throw new Error(`selector "${selector}" has no matches`);
        }

        return new DOMCollection(result);
    }
}

class DOMCollection {
    private currentNodes: NodeList;

    constructor(nodes: NodeList) {
        this.currentNodes = nodes;
    }

    each(callback: (node: DOM) => void) {
        this.currentNodes.forEach((value) => {
            callback(DOM.wrap(<Element> value));
        })
    }
}