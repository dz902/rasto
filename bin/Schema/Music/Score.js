"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Score extends _1.MusicalElement {
    constructor() {
        super(...arguments);
        this.parts = [];
    }
}
exports.Score = Score;
class Part extends _1.MusicalElement {
    constructor(id, name) {
        super(id);
        this.name = name;
        this.measures = [];
    }
}
exports.Part = Part;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU2NoZW1hL011c2ljL1Njb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQTZDO0FBRTdDLFdBQW1CLFNBQVEsaUJBQWM7SUFBekM7O1FBQ2EsVUFBSyxHQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQUE7QUFGRCxzQkFFQztBQUVELFVBQWtCLFNBQVEsaUJBQWM7SUFHcEMsWUFBWSxFQUFVLEVBQ0QsSUFBWTtRQUM3QixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFETyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBSHhCLGFBQVEsR0FBYyxFQUFFLENBQUM7SUFLbEMsQ0FBQztDQUNKO0FBUEQsb0JBT0MifQ==