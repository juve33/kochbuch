import { useEffect, useRef, useState } from 'react';

import Modal from '../../components/Modal';
import { useGlobalStateDispatch } from '../../utils/GlobalState';

type Category = {
    id: number | undefined;
    name: string;
};

type CategorySelectorProps = {
    value?: string;
    setAction: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CategorySelector = ({ value, setAction }: CategorySelectorProps) => {
    const dispatchGlobalState = useGlobalStateDispatch();
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [previousSelectedCategory, setPreviousSelectedCategory] = useState<string>("");
    const [newCategory, setNewCategory] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const newCategoryRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5001/recipe/categories", {
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
            const response = await fetch("http://localhost:5001/recipe/categories" , {
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

            setAction(String(data.id));
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (value === "new") {
            newCategoryRef.current?.focus();
        }
    }, [value]);

    return (
        <>
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                onChange={(e => {
                    setPreviousSelectedCategory(value ?? "");
                    setAction(e.target.value)
                    if (e.target.value === "new") {
                        dispatchGlobalState({
                            type: "open modal"
                        });
                    }
                })}
                value={value}
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
            {value === "new" && (
                <Modal
                    onCloseButtonClick={() => setAction(previousSelectedCategory)}
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