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
        <div className='input-recipe-ingredient__content recipe-ingredient__content'>
            <FractionInput
                id="amount"
                onValueChange={(e) => {
                    setAction(prev => {
                        console.log("onChange", JSON.stringify(e.target.value));
                        console.log("updater");
                        const next = [...prev];

                        next[index] = {
                            ...next[index],
                            amount: new Fraction(e.target.value),
                        };

                        console.log(
                            "stored string:",
                            JSON.stringify(next[index].amount?.valueAsString)
                        );
                        console.log(
                            "stored value:",
                            JSON.stringify(next[index].amount?.valueAsNumber)
                        );

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
            <textarea
                id="comment"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        next[index].comment = e.target.value;

                        return next;
                    });
                }}
                value={value.comment}
            />
        </div>
    )
}

export default IngredientForm