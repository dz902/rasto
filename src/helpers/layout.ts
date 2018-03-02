import { Coordinates, Anchored, Dimensioned, Positioned } from 'types/layout';
import { mapValues, merge } from 'lodash';
import { Bindings } from '../types';

export function snapTo<T extends Anchored>(subject: T, target: Positioned & Anchored): T & Positioned {
    let offset = getAlignmentOffsets(subject.anchor, target.anchor);
    let snapped: T & Positioned = merge({}, subject, {
        x: target.x + offset.x,
        y: target.y + offset.y
    });

    return snapped;
}

export function alignToCenter<T extends Anchored>(subject: T, target: Positioned & Dimensioned): T & Positioned {
    let aligned: T & Positioned = {
        ...(subject as any),
        ...{ x: target.x + target.width / 2 - subject.anchor.x }
    };

    return aligned;
}

export function alignToMiddle<T extends Anchored>(subject: T, target: Positioned & Dimensioned): T & Positioned {
    let aligned: T & Positioned = {
        ...(subject as any),
        ...{ y: target.y + target.height / 2 - subject.anchor.y }
    };

    return aligned;
}

export function alignToTop<T extends Anchored>(subject: T, target: Positioned & Dimensioned): T & Positioned {
    let aligned: T & Positioned = {
        ...(subject as any),
        ...{ x: subject.x, y: target.y - subject.anchor.y }
    };

    return aligned;
}

export function getAlignmentOffsets(subject: Positioned, target: Positioned): Positioned {
    let offsets: Positioned = {
        x: target.x - subject.x,
        y: target.y - subject.y
    };

    return offsets;
}

export function withAnchor<T extends Bindings>(subject: T, anchor: Positioned): T & Anchored {
    let anchored: T & Anchored = {
        ...(subject as any),
        anchor
    };

    return anchored;
}

export function computeEdges(subjects: (Positioned & Dimensioned)[]): Coordinates {
    let rightEdge = 0;
    let bottomEdge = 0;

    subjects.forEach((subject) => {
        let rightPoint = subject.x + subject.width;
        let bottomPoint = subject.y + subject.height;

        if (rightPoint > rightEdge) {
            rightEdge = rightPoint;
        }

        if (bottomPoint > bottomEdge) {
            bottomEdge = bottomPoint;
        }
    });

    return {
        x: rightEdge,
        y: bottomEdge
    }
}
