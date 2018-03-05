import { Coordinates, Anchored, BBoxed, Positioned } from 'types/layout';
import { mapValues, merge } from 'lodash';
import { Bindings, Clipped, ClippingPointMap, Dimensioned } from '../types';

export function overlapsWith(a: Positioned & BBoxed, b: Positioned & BBoxed): boolean {
    let aa = computeOffsetedDimensions(a);
    let bb = computeOffsetedDimensions(b);

    let overlapsXAxis = (bb.x + bb.width > aa.x) && (bb.x < aa.x + aa.width);
    let overlapsYAxis = (bb.y + bb.height > aa.y) && (bb.y < aa.y + aa.height);

    return overlapsXAxis && overlapsYAxis;
}

export function snapTo<T extends Anchored>(subject: T, target: Positioned & Anchored): T & Positioned {
    let offset = getAlignmentOffsets(subject.anchor, target.anchor);

    return merge({}, subject, {
        x: target.x + offset.x,
        y: target.y + offset.y
    });
}

export function alignToCenter<T extends Anchored>(subject: T, target: Positioned & BBoxed): T & Positioned {
    let targetDimensioned = computeOffsetedDimensions(target);

    return merge({}, subject, {
        x: targetDimensioned.x + targetDimensioned.width / 2 - subject.anchor.x,
        y: subject.y
    });
}

export function alignToMiddle<T extends Anchored>(subject: T, target: Positioned & BBoxed): T & Positioned {
    return merge({}, subject, {
        x: subject.x, y: target.y - subject.anchor.y
    });
}

export function fitFromLeft<T extends Positioned & BBoxed & Clipped>(subject: T, target: Positioned & BBoxed & Clipped): T {
    let fitted: T = merge({}, subject, {
        x: target.x - subject.bBox.NE.x
    });

    let subjectDimensions = computeOffsetedDimensions(subject);
    let subjectBottom = subjectDimensions.y + subjectDimensions.height;
    let targetDimensions = computeOffsetedDimensions(target);
    let targetTop = targetDimensions.y;
    let targetBottom = targetTop + targetDimensions.height;

    let clipSE = subject.clippingPoints.SE;
    let clipNW = target.clippingPoints.NW;

    let subjectHigherThanTarget = subjectBottom < targetTop;
    let subjectCanCutOffFit = (subjectBottom + clipSE.y) < (targetBottom + clipNW.y);

    if (subjectHigherThanTarget) {
        fitted.x = targetDimensions.x + targetDimensions.width - subject.bBox.NE.x;
    } else if (subjectCanCutOffFit) {
        fitted.x += Math.min(subjectDimensions.width - clipSE.x, clipNW.x);
    }

    return fitted;
}

export function getAlignmentOffsets(subject: Positioned, target: Positioned): Coordinates {
    let offsets: Coordinates = {
        x: target.x - subject.x,
        y: target.y - subject.y
    };

    return offsets;
}

export function withAnchor<T extends Bindings>(subject: T, anchor: Coordinates): T & Anchored {
    return merge({}, subject, { anchor });
}

export function withClippingPoints<T extends Bindings>(subject: T, clippingPoints: ClippingPointMap): T & Clipped {
    return merge({}, subject, { clippingPoints });
}

export function computeBoundingDimensions(subjects: (Positioned & BBoxed)[]): Dimensioned {
    let rightEdge = 0;
    let bottomEdge = 0;

    subjects.map(computeOffsetedDimensions).forEach((subject) => {
        let rightPoint = Math.abs(subject.x) + subject.width;
        let bottomPoint = Math.abs(subject.y) + subject.height;

        if (rightPoint > rightEdge) {
            rightEdge = rightPoint;
        }

        if (bottomPoint > bottomEdge) {
            bottomEdge = bottomPoint;
        }
    });

    return {
        width: rightEdge,
        height: bottomEdge
    };
}

export function computeBBox<T extends Dimensioned>(subject: T): T & BBoxed {
    return merge({}, subject, {
        bBox: {
            NE: {
                x: subject.width, y: 0
            },
            SW: {
                x: 0, y: subject.height
            }
        }
    });
}

export function computeDimensions(subject: BBoxed): Dimensioned {
    return {
        width: subject.bBox.NE.x - subject.bBox.SW.x,
        height: subject.bBox.SW.y - subject.bBox.NE.y
    };
}

function computeOffsetedDimensions(subject: Positioned & BBoxed): Positioned & Dimensioned {
    return {
        x: subject.x + subject.bBox.SW.x,
        y: subject.y + subject.bBox.NE.y,
        ...computeDimensions(subject)
    };
}