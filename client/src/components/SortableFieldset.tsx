import { useSortable } from '@dnd-kit/sortable';
import type { UniqueIdentifier } from "@dnd-kit/core";

type SortableFieldsetProps = {
    id: UniqueIdentifier;
    children?: React.ReactNode;
};

const SortableFieldset = ({ id, children }: SortableFieldsetProps) => {
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
            {children}
        </fieldset>
    )
}

export default SortableFieldset