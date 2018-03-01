import { Bindings } from 'types/common';
import { isString, isNumber, isObject, mapValues, merge } from 'lodash';

export const remize = {
    methods: {
        remize (value: number | string | Bindings): string | Bindings {
            if (isNumber(value)) {
                return value + 'rem';
            } else if (isObject(value)) {
                return mapValues(value as Bindings, v => {
                    if(isNumber(v)) {
                        return v + 'rem';
                    } else if (isString(v)) {
                        return v;
                    } else {
                        return null;
                    }
                });
            } else {
                return value;
            }
        }
    }
}
