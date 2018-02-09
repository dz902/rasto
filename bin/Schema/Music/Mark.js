"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Mark extends _1.MusicalElement {
    constructor(type, context) {
        super();
        this.context = context;
        this.type = ensureMarkType(type);
    }
}
exports.Mark = Mark;
function ensureMarkType(type) {
    return _1.ensure(type, `note type ${type} is not valid`, (t) => ['whole', 'half', 'quarter', 'eighth', '16th', '32nd', '64th', '128th'].indexOf(t) !== -1);
}
exports.ensureMarkType = ensureMarkType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TY2hlbWEvTXVzaWMvTWFyay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdCQUEyRDtBQUUzRCxVQUFrQixTQUFRLGlCQUFjO0lBR3BDLFlBQVksSUFBWSxFQUNILE9BQXVCO1FBQ3hDLEtBQUssRUFBRSxDQUFDO1FBRFMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFHeEMsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBVEQsb0JBU0M7QUFJRCx3QkFBK0IsSUFBWTtJQUN2QyxNQUFNLENBQUMsU0FBTSxDQUFDLElBQUksRUFBRSxhQUFhLElBQUksZUFBZSxFQUN0QyxDQUFDLENBQVMsRUFBaUIsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNJLENBQUM7QUFIRCx3Q0FHQyJ9