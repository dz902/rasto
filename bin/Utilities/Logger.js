"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(messageOrIsUnindenting, ...args) {
    if (typeof messageOrIsUnindenting === 'string') {
        console.group(messageOrIsUnindenting);
        if (args.length > 0) {
            console.log(args);
        }
    }
    else {
        console.groupEnd();
    }
}
exports.default = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1V0aWxpdGllcy9Mb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxhQUE0QixzQkFBd0MsRUFBRSxHQUFHLElBQVc7SUFDaEYsRUFBRSxDQUFDLENBQUMsT0FBTyxzQkFBc0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUV0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBVkQsc0JBVUMifQ==