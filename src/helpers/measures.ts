import { Binding, Context, Measure, MeasureItem } from 'types';
import { createChordBinding } from './chord';

export function createMeasureBindings(measures: Measure[], currentContext: Context): Binding[] {
    return measures.map((measure: Measure) => {
        let itemsBinding = measure.items.map((item: MeasureItem) => {
            let itemBinding: Binding;

            switch (item.kind) {
                case 'chord':
                    itemBinding = createChordBinding(item, currentContext.clef);
                    break;
                default:
                    itemBinding = item;
            }

            itemBinding.kind = item.kind;

            console.log(itemBinding);

            return itemBinding;
        });

        return {
            items: itemsBinding
        };
    });
}

