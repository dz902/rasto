import { Chord, Context, KeyModes, NoteType, Note, Score, StemDirection } from 'Schema/Music';
import { Nullable } from 'Utilities';
import { Parser } from './Parser';

export class MusicXMLParser extends Parser {
    readonly score = new Score();

    private rootNode: XMLDocument;
    private currentResult: Nullable<XPathResult> = null;
    private JXON: JXON = new JXON();

    static parse(serializeXML: string): Score {
        return (new MusicXMLParser(serializeXML)).score;
    }

    constructor(serializeXML: string) {
        super();

        this.rootNode = (new DOMParser()).parseFromString(serializeXML, 'application/xml');

        let chordNoteType: NoteType;
        let chordDuration: number;
        let chordPitches: Note[] = [];

        this.query('/score-partwise/part/measure | /score-partwise/part/measure/child::*')
            .each((item: Node) => {
                switch (item.nodeName.toLowerCase()) {
                    case 'measure':
                        this.score.addMeasure();

                        break;
                    case 'attributes':
                        let rawContext = this.JXON.build(item);
                        let context = new Context({
                                                      sign: rawContext['clef']['sign'],
                                                      lineNumber: Number(rawContext['clef']['line'])
                                                  }, {
                                                      tonic: { step: 'C' },
                                                      mode: KeyModes.Major
                                                  }, {
                                                      beatsPerMeasure: rawContext['time']['beats'],
                                                      beatUnit: rawContext['time']['beatType']
                                                  });

                        this.score.addContext(context);

                        break;
                    case 'note':
                        let note = this.JXON.build(item);

                        if (note['chord'] === undefined) {
                            // flushChordBuffer

                            if (chordPitches.length > 0) {
                                let chord = new Chord(chordNoteType!, chordPitches, chordDuration, StemDirection.Down);

                                this.score.addChord(chord);

                                chordPitches = [];
                            }

                            // createChordBuffer

                            switch (note['type']) {
                                case 'whole':
                                    chordNoteType = NoteType.Whole;
                                    break;
                                case 'half':
                                    chordNoteType = NoteType.Half;
                                    break;
                                case 'quarter':
                                    chordNoteType = NoteType.Quarter;
                                    break;
                                default:
                                    throw new Error();
                            }

                            chordDuration = note['duration'];
                            chordPitches.push(new Pitch(note['pitch']['step'], note['pitch']['octave']));
                        }

                        //this.score.addChord();

                        break;
                    default:
                    //throw new Error();
                }
            });
    }

    private query(path: string): this {
        if (!this.has(path)) {
            throw new Error(`path ${path} does not exist`);
        }

        this.currentResult = this.evaluate(path, XPathResult.ORDERED_NODE_ITERATOR_TYPE);

        return this;
    }

    private has(path: string): boolean {
        let result = this.evaluate(`boolean(${path})`);

        return result.booleanValue;
    }

    private evaluate(path: string, type: number = XPathResult.ANY_TYPE): XPathResult {
        let result = document.evaluate(path, this.rootNode, document.createNSResolver(this.rootNode), type, null);

        return result;
    }

    private each(callback: (item: Node) => void): MusicXMLParser {
        if (this.currentResult === null) {
            throw new Error('no result yet');
        }

        let item: Nullable<Node> = null;

        while (item = this.currentResult.iterateNext()) {
            callback(item);
        }

        return this;
    }
}

// TYPESCRIPT JXON ADAPTED FROM MOZILLA JXON

export class JXON {

    private sValProp: string = '_';
    private sAttrProp: string = 'keyAttributes';
    private sAttrsPref: string = '@';
    private aCache: Element[] = [];
    private rIsNull: RegExp = /^\s*$/;
    private rIsBool: RegExp = /^(?:true|false)$/i;

    private parseText(sValue: string): any {
        if (this.rIsNull.test(sValue)) {
            return null;
        } else if (this.rIsBool.test(sValue)) {
            return sValue.toLowerCase() === 'true';
        }

        if (Number.isFinite(Number(sValue))) {
            return parseFloat(sValue);
        } else if (Number.isFinite(Date.parse(sValue))) {
            return new Date(sValue);
        }

        return sValue;
    }

    private objectify(vVal: any) {
        return vVal === null ? new EmptyTree() : vVal instanceof Object ? vVal : new vVal.constructor(vVal);
    }

    private createObjTree(oParentNode: Node | Element | XMLDocument, nVerb: number, bFreeze: boolean, bNesteAttr: boolean) {
        const nLevelStart = this.aCache.length, bChildren = oParentNode.hasChildNodes(),
            bAttributes = oParentNode.hasAttributes && oParentNode.hasAttributes(),
            bHighVerb = Boolean(nVerb & 2);

        let sProp, vContent, nLength = 0, sCollectedTxt = '',
            vResult: any = bHighVerb ? {} : /* put here the default value for empty nodes: */ true;

        if (bChildren) {
            for (let oNode, nItem = 0; nItem < oParentNode.childNodes.length; ++nItem) {
                oNode = oParentNode.childNodes.item(nItem);

                if (oNode.nodeType === 4) {
                    sCollectedTxt += oNode.nodeValue;
                } /* nodeType is "CDATASection" (4) */
                else if (oNode.nodeType === 3) {
                    sCollectedTxt += oNode.nodeValue === null ? '' : oNode.nodeValue.trim();
                } /* nodeType is "Text" (3) */
                else if (oNode.nodeType === Node.ELEMENT_NODE && oNode instanceof Element && !oNode.prefix) {
                    this.aCache.push(oNode);
                }
                /* nodeType is "Element" (1) */
            }
        }

        const nLevelEnd = this.aCache.length, vBuiltVal = this.parseText(sCollectedTxt);

        if (!bHighVerb && (bChildren || bAttributes)) {
            vResult = nVerb === 0 ? this.objectify(vBuiltVal) : {};
        }

        for (let nElId = nLevelStart; nElId < nLevelEnd; nElId++) {
            sProp = this.aCache[nElId].nodeName.toLowerCase();
            vContent = this.createObjTree(this.aCache[nElId], nVerb, bFreeze, bNesteAttr);

            if (vResult.hasOwnProperty(sProp)) {
                if (vResult[sProp].constructor !== Array) {
                    vResult[sProp] = [vResult[sProp]];
                }
                vResult[sProp].push(vContent);
            } else {
                vResult[sProp] = vContent;
                nLength++;
            }
        }

        if (bAttributes) {
            const nAttrLen = oParentNode.attributes.length,
                sAPrefix = bNesteAttr ? '' : this.sAttrsPref, oAttrParent = bNesteAttr ? {} : vResult;

            for (let oAttrib, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {
                oAttrib = oParentNode.attributes.item(nAttrib);
                oAttrParent[sAPrefix + oAttrib.name.toLowerCase()] = this.parseText(oAttrib.value.trim());
            }

            if (bNesteAttr) {
                if (bFreeze) {
                    Object.freeze(oAttrParent);
                }

                vResult[this.sAttrProp] = oAttrParent;
                nLength -= nAttrLen - 1;
            }

        }

        if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
            vResult[this.sValProp] = vBuiltVal;
        } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
            vResult = vBuiltVal;
        }

        if (bFreeze && (bHighVerb || nLength > 0)) {
            Object.freeze(vResult);
        }

        this.aCache.length = nLevelStart;

        return vResult;
    }

    private loadObjTree(oXMLDoc: Document, oParentEl: Element | XMLDocument, oParentObj: any) {
        let vValue, oChild;

        if (oParentObj.constructor === String || oParentObj.constructor === Number || oParentObj.constructor === Boolean) {
            oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString()));
            /* verbosity level is 0 or 1 */
            if (oParentObj === oParentObj.valueOf()) {
                return;
            }
        } else if (oParentObj.constructor === Date) {
            oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toUTCString()));
        }

        for (let sName in oParentObj) {
            vValue = oParentObj[sName];

            if (isFinite(Number(sName)) || vValue instanceof Function) {
                continue;
            }

            /* verbosity level is 0 */
            if (sName === this.sValProp) {
                if (vValue !== null && vValue !== true) {
                    oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue)));
                }
            } else if (sName === this.sAttrProp) { /* verbosity level is 3 */
                for (let sAttrib in vValue) {
                    (oParentEl as Element).setAttribute(sAttrib, vValue[sAttrib]);
                }
            } else if (sName.charAt(0) === this.sAttrsPref) {
                (oParentEl as Element).setAttribute(sName.slice(1), vValue);
            } else if (vValue.constructor === Array) {
                for (let nItem = 0; nItem < vValue.length; nItem++) {
                    oChild = oXMLDoc.createElement(sName);
                    this.loadObjTree(oXMLDoc, oChild, vValue[nItem]);
                    oParentEl.appendChild(oChild);
                }
            } else {
                oChild = oXMLDoc.createElement(sName);
                if (vValue instanceof Object) {
                    this.loadObjTree(oXMLDoc, oChild, vValue);
                } else if (vValue !== null && vValue !== true) {
                    oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
                }
                oParentEl.appendChild(oChild);
            }
        }

    }

    build(oXMLParent: XMLDocument | Element | Node, nVerbosity?: number /* optional */, bFreeze?: boolean /* optional */, bNesteAttributes?: boolean /* optional */) {
        const nVerbMask = nVerbosity !== undefined ? nVerbosity & 3 : /* put here the default verbosity level: */ 1;

        return this.createObjTree(oXMLParent, nVerbMask, bFreeze || false, bNesteAttributes ? bNesteAttributes : nVerbMask === 3);
    }

    unbuild(oObjTree: Object, sNamespaceURI?: string /* optional */, sQualifiedName?: string /* optional */, oDocumentType?: DocumentType /* optional */) {
        const oNewDoc = document.implementation.createDocument(sNamespaceURI || null, sQualifiedName || '', oDocumentType || null);

        this.loadObjTree(oNewDoc, oNewDoc, oObjTree);

        return oNewDoc;
    }
}

class EmptyTree {
    toString() {
        return 'null';
    }

    valueOf() {
        return null;
    }
}
