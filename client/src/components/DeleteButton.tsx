type DeleteButtonProps<T> = {
    index: number;
    setAction: React.Dispatch<React.SetStateAction<T[]>>;
    children?: string | React.ReactNode;
};

const DeleteButton = <T,>({ index, setAction, children } : DeleteButtonProps<T>) => {
    return (
        <button 
            type="button"
            onClick={() =>
                setAction(items => 
                    items.filter((_, i) => i !== index)
                )
            }
        >
            {children}
        </button>
    )
}

export default DeleteButton