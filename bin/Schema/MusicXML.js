export default class MusicXML {
    constructor(dataString) {
        this.$ = DOM.parse(dataString);
    }
}
class DOM {
    static parse(dataString) {
        return new DOM(dataString);
    }
    static wrap(node) {
        return new DOM(node);
    }
    constructor(x) {
        if (x instanceof Element) {
            this.currentNode = x;
        }
        else {
            this.currentNode = (new DOMParser()).parseFromString(x, "application/xml");
        }
    }
    get id() {
        if (this.currentNode instanceof Element) {
            let id = this.currentNode.id;
            if (id === "") {
                throw new Error("empty id");
            }
            return id;
        }
        throw new Error("document does not have ids");
    }
    get value() {
        let value = this.currentNode.textContent;
        if (value === null) {
            throw new Error("no text content value found");
        }
        return value;
    }
    q(selector) {
        let result = this.currentNode.querySelectorAll(selector);
        if (result.length === 1) {
            this.currentNode = result.item(0);
            return this;
        }
        else {
            return new DOMCollection(result);
        }
    }
}
class DOMCollection {
    constructor(nodes) {
        this.currentNodes = nodes;
    }
    each(callback) {
        this.currentNodes.forEach((value) => {
            callback(DOM.wrap(value));
        });
    }
}
//# sourceMappingURL=MusicXML.js.map