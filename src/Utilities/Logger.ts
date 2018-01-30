export default function log(messageOrIsUnindenting: string | boolean, ...args: any[]): void {
    if (typeof messageOrIsUnindenting === 'string') {
        console.group(messageOrIsUnindenting);

        if (args.length > 0) {
            console.log(args);
        }
    } else {
        console.groupEnd();
    }
}