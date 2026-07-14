import { useEffect, useRef, useState } from 'react';

import Modal from '../../components/Modal';
import { useGlobalStateDispatch } from '../../utils/GlobalState';

export type Category = {
    id: number | undefined;
    name: string;
};

type CategorySelectorProps = {
    className?: string;
    value?: Category;
    setAction: React.Dispatch<React.SetStateAction<Category | undefined>>;
};

const CategorySelector = ({ className, value, setAction }: CategorySelectorProps) => {
    const dispatchGlobalState = useGlobalStateDispatch();
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [previousSelectedCategory, setPreviousSelectedCategory] = useState<Category>({id: undefined, name: ""});
    const [newCategory, setNewCategory] = useState<string>("");
    const [addingCategory, setAddingCategory] = useState(false);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const newCategoryRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost/api/recipe/categories", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || "Fetching categories failed");
                }
                
                setCategories(data as Category[]);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unexpected error";
                setError(message);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError("");

        if (!newCategory) {
            setAction(previousSelectedCategory);
            setLoading(false);
            return;
        };

        const category_parsed = {
            name: newCategory
        }

        try {
            const response = await fetch("http://localhost/api/recipe/categories" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(category_parsed)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Creating category failed");
            }

            setCategories(items => [...items, {id: data.id, name: newCategory}])

            dispatchGlobalState({
                type: "close modal"
            });

            setAction({id: data.id, name: newCategory});
            setAddingCategory(false);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (addingCategory) {
            newCategoryRef.current?.focus();
        }
    }, [value]);

    return (
        <>
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                className={className}
                onChange={(e => {
                    setPreviousSelectedCategory(value ?? {id: undefined, name: ""});
                    if (e.target.value === "new") {
                        dispatchGlobalState({
                            type: "open modal"
                        });
                        setAddingCategory(true);
                        return;
                    }
                    setAction(categories.filter((category) => category.id === parseInt(e.target.value))[0])
                })}
                value={addingCategory ? "new" : value?.id?.toString()}
                disabled={loading}
            >
                <option value={""}>None</option>
                {
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
                <option value={"new"}>Add category</option>
            </select>
            {error && <div>{error}</div>}
            {addingCategory && (
                <Modal
                    onCloseButtonClick={() => {
                        setAction(previousSelectedCategory);
                        setAddingCategory(false);
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="new-category">Enter new category:</label>
                        <input
                            ref={newCategoryRef}
                            id="new-category"
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setAction(previousSelectedCategory);
                                dispatchGlobalState({
                                    type: "close modal"
                                });
                                setAddingCategory(false);
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default CategorySelector