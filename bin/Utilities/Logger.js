export default function log(messageOrIsUnindenting, ...args) {
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
//# sourceMappingURL=Logger.js.map