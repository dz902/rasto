import { Coordinates, Anchored, BBoxed, Positioned } from 'types/layout';
import { mapValues, merge } from 'lodash';
import { Bindings, Clipped, Dimensioned } from '../types';

export function overlapsWith(a: Positioned & BBoxed, b: Positioned & BBoxed): boolean {
    let aa = computeOffsetedDimensions(a);
    let bb = computeOffsetedDimensions(b);

    let overlapsXAxis = (bb.x + bb.width > aa.x) && (bb.x < aa.x + aa.width);
    let overlapsYAxis = (bb.y + bb.height > aa.y) && (bb.y < aa.y + aa.height);

    return overlapsXAxis && overlapsYAxis;
}

export function snapTo<T extends Anchored>(subject: T, target: Positioned & Anchored): T & Positioned {
    let offset = getAlignmentOffsets(subject.anchor, target.anchor);
    let snapped: T & Positioned = {
        ...(subject as any),
        ...{ x: target.x + offset.x, y: target.y + offset.y }
    };

    return snapped;
}

export function alignToCenter<T extends Anchored>(subject: T, target: Positioned & BBoxed): T & Positioned {
    let targetDimensioned = computeOffsetedDimensions(target);
    let aligned: T & Positioned = {
        ...(subject as any),
        ...{ x: targetDimensioned.x + targetDimensioned.width / 2 - subject.anchor.x }
    };

    return aligned;
}

export function alignToMiddle<T extends Anchored>(subject: T, target: Positioned & BBoxed): T & Positioned {
    let aligned: T & Positioned = {
        ...(subject as any),
        ...{ x: subject.x, y: target.y - subject.anchor.y }
    };

    return aligned;
}

export function fitFromLeft<T extends Positioned & BBoxed>(subject: T, target: Positioned & BBoxed): T {
    let fitted: T = {
        ...(subject as any),
        ...{ x: target.x - subject.bBox['bBoxNE'].x }
    };
debugger;
    let subjectDimensions = computeOffsetedDimensions(subject);
    let subjectBottom = subjectDimensions.y + subjectDimensions.height;
    let targetDimensions = computeOffsetedDimensions(target);
    let targetTop = targetDimensions.y;
    let cutOutSE = subject.clippingPoints && subject.clippingPoints['cutOutSE'] ?
        subject.clippingPoints['cutOutSE'] :
        { x: subjectDimensions.width, y: 0 };
    let subjectHigherThanTarget = subjectBottom < targetTop;
    let subjectCanCutOffFit = (subjectBottom + cutOutSE.y) < targetTop;

    if (subjectHigherThanTarget) {
        fitted.x = targetDimensions.x + targetDimensions.width - subject.bBox['bBoxNE'].x;
    } else if (subjectCanCutOffFit) {
        fitted.x += subjectDimensions.width - cutOutSE.x;
    }

    console.log(fitted);
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
    let anchored: T & Anchored = {
        ...(subject as any),
        anchor
    };

    return anchored;
}

export function withClippingPoints<T extends Bindings>(subject: T, clippingPoints: { [k: string]: Coordinates }): T & Clipped {
    let clipped: T & Clipped = {
        ...(subject as any),
        clippingPoints
    };

    return clipped;
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
    }
}

export function computeBBox<T extends Dimensioned>(subject: T): T & BBoxed {
    return {
        ...subject as any,
        ...{
            bBox: {
                bBoxNE: {
                    x: subject.width, y: 0
                },
                bBoxSW: {
                    x: 0, y: subject.height
                }
            }
        }
    };
}

export function computeDimensions(subject: BBoxed): Dimensioned {
    return {
        width: subject.bBox['bBoxNE'].x - subject.bBox['bBoxSW'].x,
        height: subject.bBox['bBoxSW'].y - subject.bBox['bBoxNE'].y
    };
}

function computeOffsetedDimensions(subject: Positioned & BBoxed): Positioned & Dimensioned {
    return {
        x: subject.x + subject.bBox['bBoxSW'].x,
        y: subject.y + subject.bBox['bBoxNE'].y,
        ...computeDimensions(subject)
    }
}