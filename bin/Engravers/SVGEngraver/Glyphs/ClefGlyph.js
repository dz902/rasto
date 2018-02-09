"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class ClefGlyph extends _1.CharGlyph {
    constructor(clefType, clefLine) {
        super('clef', clefType);
        this.clefLine = clefLine;
        this.draw = () => {
        };
        this.shiftFromStaffBottom(this.clefLine - 1);
    }
}
exports.ClefGlyph = ClefGlyph;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xlZkdseXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0VuZ3JhdmVycy9TVkdFbmdyYXZlci9HbHlwaHMvQ2xlZkdseXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQStCO0FBRS9CLGVBQXVCLFNBQVEsWUFBUztJQUNwQyxZQUFZLFFBQWdCLEVBQVUsUUFBZ0I7UUFDbEQsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQURVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFNNUMsU0FBSSxHQUFHLEdBQVMsRUFBRTtRQUM1QixDQUFDLENBQUE7UUFKRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBSUo7QUFURCw4QkFTQyJ9