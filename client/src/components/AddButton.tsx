type AddButtonProps<T> =
    Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "createItem" | "onClick" | "setAction" | "type" | "children"
    > & {
        createItem: () => T;
        setAction: React.Dispatch<React.SetStateAction<T[]>>;
        children?: string | React.ReactNode;
    }

const AddButton = <T,>({ createItem, setAction, children, ...props } : AddButtonProps<T>) => {
    return (
        <button
            type="button"
            onClick={() =>
                setAction(items => [...items, createItem()])
            }
            {...props}
        >
            {children}
        </button>
    )
}

export default AddButton