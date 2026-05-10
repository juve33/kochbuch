import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';

export type Ingredient = {
  id: number;
  amount: number;
  unit?: string;
  text: string;
  comment?: string;
};

const IngredientForm = ({ value, index, setAction }: FieldsetFormProps<Ingredient>) => {
    return (
        <>
            <input
                type="number"
                id="amount"
                placeholder="500"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].amount = e.target.valueAsNumber;

                        return next;
                    });
                }}
                value={value.amount}
                required
            />
            <input
                type="text"
                id="unit"
                placeholder="g"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].unit = e.target.value;

                        return next;
                    });
                }}
                value={value.unit}
            />
            <input
                type="text"
                id="text"
                placeholder="Flour"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].text = e.target.value;

                        return next;
                    });
                }}
                value={value.text}
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
            />
        </>
    )
}

export default IngredientForm