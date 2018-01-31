import { MusicalElement } from './index.js';
export class Score extends MusicalElement {
    constructor() {
        super(...arguments);
        this.parts = [];
    }
}
export class Part extends MusicalElement {
    constructor(id, name) {
        super(id);
        this.name = name;
        this.measures = [];
    }
}
//# sourceMappingURL=Score.js.map