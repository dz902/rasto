import { Anchored, Bindings, Positioned } from 'types';
import { isNumber, isObject, mapValues, merge } from 'lodash';

export const Remizer = {
    methods: {
        remize (value: number | string | Bindings): string | Bindings {
            if (isNumber(value)) {
                return value + 'rem';
            } else if (isObject(value)) {
                return mapValues(value as Bindings, v => isNumber(v) ? v + 'rem' : v);
            } else {
                return value;
            }
        }
    }
};

export const Layout = {
    methods: {
        snapTo(ref: Anchored, target: Anchored): Positioned {
            let offset = (this as any).getAlignmentOffsets(ref.anchor, target.anchor);
            let snapped: Positioned = merge({}, ref, {
                x: target.x + offset.x,
                y: target.y + offset.y,
                anchor: null
            });
            
            return snapped;
        },
        dupleToCoordinates(anchor: [number, number]): Positioned {
            return { x: anchor[0], y: -anchor[1] };
        },
        getAlignmentOffsets(refAnchor: Positioned,
                            targetAnchor: Positioned): Positioned {
            let offsets: Positioned = { x: targetAnchor.x - refAnchor.x,
                                        y: targetAnchor.y - refAnchor.y };

            return offsets;
        },
        getCompensatedOffsets(refAnchor: Positioned,
                              targetAnchor: Positioned): { offsets: Positioned, compensations: Positioned } {
            let offsets = this.getAlignmentOffsets(refAnchor, targetAnchor);

            return {
                offsets,
                compensations: mapValues(offsets, v => -v)
            };
        }
    }
}

