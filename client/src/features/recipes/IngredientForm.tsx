import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';
import Fraction from '../../utils/Fraction';
import FractionInput from '../../components/FractionInput';

export type Ingredient = {
    id: number;
    apiId?: number;
    amount?: Fraction;
    unit?: string;
    text: string;
    comment?: string;
};

const IngredientForm = ({ value, index, setAction }: FieldsetFormProps<Ingredient>) => {
    return (
        <div className='input-item-form input-item-form-ingredients'>
            <FractionInput
                id="amount"
                onValueChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        if (next[index].amount === undefined) {
                            next[index].amount = new Fraction(e.target.value);
                        } else {
                            next[index].amount.valueAsString = e.target.value
                        }

                        return next;
                    });
                }}
                value={value.amount}
                size={Math.max(1, value.amount?.valueAsString?.length ?? 0)}
            />
            <input
                type="text"
                id="unit"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        next[index].unit = e.target.value;

                        return next;
                    });
                }}
                value={value.unit}
                size={(value.unit) ? Math.max(value.unit.length, 1) : 1}
            />
            <input
                type="text"
                id="text"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        next[index].text = e.target.value;

                        return next;
                    });
                }}
                value={value.text}
                size={(value.text) ? Math.max(value.text.length, 4) : 4}
                required
            />
            <input
                type="text"
                id="comment"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        next[index].comment = e.target.value;

                        return next;
                    });
                }}
                value={value.comment}
                size={(value.comment) ? Math.max(value.comment.length, 5) : 5}
            />
        </div>
    )
}

export default IngredientForm