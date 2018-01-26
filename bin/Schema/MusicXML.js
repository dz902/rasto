export default class MusicXML {
    constructor(dataString) {
        const $music = DOM.parse(dataString);
        const $scoreParts = $music.q("score-partwise")
            .q("part-list")
            .qq("score-part");
        let scoreParts = {};
        $scoreParts.each(($scorePart) => {
            const partName = $scorePart.q('part-name').value;
            if ($scorePart.id === "") {
                throw new Error("score-part does not have an ID");
            }
            else {
                scoreParts[$scorePart.id] = partName;
            }
        });
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
                console.log(this.currentNode);
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
        let result = this.currentNode.querySelector(selector);
        if (result === null) {
            throw new Error(`selector "${selector}" has no matches`);
        }
        else {
            this.currentNode = result;
            return DOM.wrap(result);
        }
    }
    qq(selector) {
        let result = this.currentNode.querySelectorAll(selector);
        if (result.length === 0) {
            throw new Error(`selector "${selector}" has no matches`);
        }
        return new DOMCollection(result);
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