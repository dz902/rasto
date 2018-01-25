export default class MusicXML {
    private $: DOM;

    public constructor(dataString: string) {
        this.$ = new DOM(dataString);
    }
}

class DOM {
    private currentNode: Selectable;

    private constructor(dataString: string) {
        this.currentNode = (new DOMParser()).parseFromString(dataString, "application/xml");
    }

    public q(selector: string): DOM {
        if (this.currentNode instanceof HTMLCollection) {

        } else {
            this.currentNode.querySelectorAll(selector);
        }

        return this;
    }
}

interface Selectable {
    querySelectorAll(selectors: string): NodeList;
}