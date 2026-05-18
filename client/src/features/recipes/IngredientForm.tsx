import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';
import FractionInput from '../../components/FractionInput';

export type Ingredient = {
    id: number;
    amount?: number;
    amountString?: string;
    unit?: string;
    text: string;
    comment?: string;
};

const IngredientForm = ({ value, index, setAction }: FieldsetFormProps<Ingredient>) => {
    return (
        <div className='input-item-form input-item-form-ingredients'>
            <FractionInput
                id="amount"
                onValueChange={(parsedValue, stringValue) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].amount = parsedValue;
                        prev[index].amountString = stringValue;

                        console.log(parsedValue);

                        return next;
                    });
                }}
                value={value.amountString}
                size={(value.amountString) ? Math.max(value.amountString.length, 1) : 1}
            />
            <input
                type="text"
                id="unit"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].unit = e.target.value;

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

                        prev[index].text = e.target.value;

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

                        prev[index].comment = e.target.value;

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