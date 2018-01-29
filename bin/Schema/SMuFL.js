import codePoints from '../Schema/SMuFL/glyphnames.js';
export const formattedCodePoints = formatCodePoints(codePoints);
function formatCodePoints(codePoints) {
    let convertCodePoint = (p) => {
        let hex = p.match(/U\+([0-9A-F]+)/);
        if (hex === null) {
            throw new Error("invalid code point");
        }
        return String.fromCodePoint(Number.parseInt(hex[1], 16));
    };
    let formattedCodepoints = {};
    for (let name in codePoints) {
        let glyph = codePoints[name];
        formattedCodepoints[name] = {
            codepoint: convertCodePoint(glyph.codepoint)
        };
        if (glyph.alternateCodepoint) {
            formattedCodepoints[name].alternateCodepoint = convertCodePoint(glyph.alternateCodepoint);
        }
    }
    return formattedCodepoints;
}
//# sourceMappingURL=SMuFL.js.map