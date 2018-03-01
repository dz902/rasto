import { Bindings } from 'types/common';
import { isNumber, isObject, mapValues, merge } from 'lodash';

export const remize = {
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
}
