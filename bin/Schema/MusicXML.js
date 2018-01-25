export default class MusicXML {
    constructor(dataString) {
        this.$ = new DOM(dataString);
    }
}
class DOM {
    constructor(dataString) {
        this.currentNode = (new DOMParser()).parseFromString(dataString, "application/xml");
    }
    q(selector) {
        if (this.currentNode instanceof HTMLCollection) {
        }
        else {
            this.currentNode.querySelectorAll(selector);
        }
        return this;
    }
}
//# sourceMappingURL=MusicXML.js.map