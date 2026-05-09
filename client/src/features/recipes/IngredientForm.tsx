import { type JSX } from "react";
import { useSortable } from '@dnd-kit/sortable';

export type Ingredient = {
  id: number;
  amount: number;
  unit?: string;
  text: string;
  comment?: string;
};

type IngredientFormProps = {
    value: Ingredient;
    index: number;
    setAction: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    children?: JSX.Element;
};

const IngredientForm = ({ value, index, setAction, children }: IngredientFormProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: value.id });

    return (
        <fieldset
            ref={setNodeRef}
            style={{
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                transition,
            }}
        >
            <button
                type="button"
                {...attributes}
                {...listeners}
            />
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
            {children}
        </fieldset>
    )
}

export default IngredientForm