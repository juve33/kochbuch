import { type JSX } from "react";
import { useSortable } from '@dnd-kit/sortable';

type StepFormProps = {
    id: number;
    index: number;
    text: string;
    onTextChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    children?: JSX.Element;
};

const StepForm = ({ id, index, text, onTextChange, children }: StepFormProps) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

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
                onChange={onTextChange}
                value={text}
                required
            />
            {children}
        </fieldset>
    )
}

export default StepForm