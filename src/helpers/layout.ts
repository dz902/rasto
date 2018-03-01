import { Dimensioned, Anchored, Positioned } from 'types/layout';
import { merge, mapValues } from 'lodash';

export function snapTo<T extends Anchored>(subject: T, target: Positioned & Anchored): T & Positioned {
    let offset = getAlignmentOffsets(subject.anchor, target.anchor);
    let snapped: T & Positioned = merge({}, subject, {
        x: target.x + offset.x,
        y: target.y + offset.y
    });

    return snapped;
}

export function alignToCenter<T extends Anchored>(subject: T, target: Positioned & Dimensioned): T & Positioned {
    let aligned: T & Positioned = {...(subject as any), ...{ x: target.x + target.width / 2 - subject.anchor.x, y: target.y } };

    return aligned;
}

export function dupleToCoordinates(anchor: [number, number]): Positioned {
    return { x: anchor[0], y: -anchor[1] };
}

export function getAlignmentOffsets(subject: Positioned, target: Positioned): Positioned {
    let offsets: Positioned = {
        x: target.x - subject.x,
        y: target.y - subject.y
    };

    return offsets;
}

