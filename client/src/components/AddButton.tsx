type AddButtonProps<T> = {
    createItem: () => T;
    setAction: React.Dispatch<React.SetStateAction<T[]>>;
    children?: string | React.ReactNode;
};

const AddButton = <T,>({ createItem, setAction, children } : AddButtonProps<T>) => {
    return (
        <button
            type="button"
            onClick={() =>
                setAction(items => [...items, createItem()])
            }
        >
            {children}
        </button>
    )
}

export default AddButton