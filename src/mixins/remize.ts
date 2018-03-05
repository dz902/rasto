import { Binding } from 'types/common';
import { isString, isNumber, isObject, mapValues, merge } from 'lodash';

export const remize = {
    methods: {
        remize (value: number | string | Binding): string | Binding {
            if (isNumber(value)) {
                return value + 'rem';
            } else if (isObject(value)) {
                return mapValues(value as Binding, v => {
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
