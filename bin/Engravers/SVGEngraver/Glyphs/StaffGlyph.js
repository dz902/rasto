"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class StaffGlyph extends _1.Glyph {
    constructor() {
        super('staff', undefined);
        this.draw = () => {
            this.drawLine();
        };
        this.draw();
    }
    drawLine() {
        for (let i = 0; i < 5; ++i) {
            let line = new _1.LineGlyph('staff-line');
            line.size(50)
                .move(undefined, i);
            this.append(line);
        }
    }
}
exports.StaffGlyph = StaffGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZmZHbHlwaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9FbmdyYXZlcnMvU1ZHRW5ncmF2ZXIvR2x5cGhzL1N0YWZmR2x5cGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUM7QUFFckMsZ0JBQXdCLFNBQVEsUUFBSztJQUNqQztRQUNJLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFLcEIsU0FBSSxHQUFHLEdBQUcsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFBO1FBTEcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFNTyxRQUFRO1FBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLFlBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXJCRCxnQ0FxQkMifQ==