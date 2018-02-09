"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Beam extends _1.MusicalElement {
    constructor(number, type) {
        super();
        this.number = _1.ensureNumber(number);
        this.type = ensureBeamType(type);
    }
}
exports.Beam = Beam;
function ensureBeamType(type) {
    if (isBeamType(type)) {
        return type;
    }
    else {
        throw new Error(`type ${type} is not valid beam type`);
    }
}
function isBeamType(t) {
    return ['begin', 'continue', 'end'].indexOf(t) !== -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TY2hlbWEvTXVzaWMvQmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUFnRTtBQUVoRSxVQUFrQixTQUFRLGlCQUFjO0lBSXBDLFlBQVksTUFBb0IsRUFDcEIsSUFBWTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQVhELG9CQVdDO0FBSUQsd0JBQXdCLElBQVk7SUFDaEMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLHlCQUF5QixDQUFDLENBQUM7SUFDM0QsQ0FBQztBQUNMLENBQUM7QUFFRCxvQkFBb0IsQ0FBUztJQUN6QixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDIn0=