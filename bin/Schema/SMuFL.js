import glyphnames from '../Schema/SMuFL/glyphnames.js';
import metadata from '../Fonts/bravura/bravura_metadata.js';
export function load(fontName) {
    let combinedMeta = {
        engravingDefaults: metadata.engravingDefaults,
        glyphBBoxes: metadata.glyphBBoxes,
        glyphsWithAnchors: metadata.glyphsWithAnchors,
        glyphnames: formatCodePoints(glyphnames)
    };
    return combinedMeta;
}
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