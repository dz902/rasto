"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Music_1 = require("Schema/Music");
class Chord extends Music_1.Mark {
    constructor() {
        super(...arguments);
        this.notes = [];
        this.beams = [];
    }
    get lowestNote() {
        return this.notes[0];
    }
    get highestNote() {
        return this.notes[this.notes.length - 1];
    }
    get spanStaffPlace() {
        return this.highestNote.staffPlace - this.lowestNote.staffPlace;
    }
    get direction() {
        if (this.forcedDirection !== undefined) {
            return this.forcedDirection;
        }
        let direction = StemDirection.Down;
        let chordHasOnlyOneNote = this.notes.length === 1;
        if (chordHasOnlyOneNote) {
            if (this.lowestNote.staffPlace >= this.context.midStaffPlace) {
                direction = StemDirection.Down;
            }
            else {
                direction = StemDirection.Up;
            }
        }
        else {
            let topNoteDistance = Math.abs(this.highestNote.staffPlace - this.context.midStaffPlace);
            let bottomNoteDistance = Math.abs(this.lowestNote.staffPlace - this.context.midStaffPlace);
            if (topNoteDistance >= bottomNoteDistance) {
                direction = StemDirection.Down;
            }
            else {
                direction = StemDirection.Up;
            }
        }
        return direction;
    }
    set direction(direction) {
        this.forcedDirection = direction;
    }
    addNote(note) {
        this.notes.push(note);
        this.notes.sort((a, b) => a.staffPlace - b.staffPlace);
        return this;
    }
}
exports.Chord = Chord;
var StemDirection;
(function (StemDirection) {
    StemDirection["Up"] = "up";
    StemDirection["Down"] = "down";
})(StemDirection = exports.StemDirection || (exports.StemDirection = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU2NoZW1hL011c2ljL0Nob3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWdEO0FBRWhELFdBQW1CLFNBQVEsWUFBSTtJQUEvQjs7UUFDSSxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7SUFzRHZCLENBQUM7SUFsREcsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDcEUsQ0FBQztJQUVELElBQUksU0FBUztRQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUVsRCxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osU0FBUyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUzRixFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osU0FBUyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLFNBQVMsQ0FBQyxTQUF3QjtRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBeERELHNCQXdEQztBQUdELElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUNyQiwwQkFBUyxDQUFBO0lBQ1QsOEJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEIifQ==