import { type JSX } from "react";
import { useSortable } from '@dnd-kit/sortable';

export type Step = {
  id: number;
  text: string;
};

type StepFormProps = {
    value: Step;
    index: number;
    setAction: React.Dispatch<React.SetStateAction<Step[]>>;
    children?: JSX.Element;
};

const StepForm = ({ value, index, setAction, children }: StepFormProps) => {
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
            <div>
                {index + 1}
            </div>
            <textarea
                id="text"
                placeholder="Stir"
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
            {children}
        </fieldset>
    )
}

export default StepForm