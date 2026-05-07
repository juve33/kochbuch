import { useEffect, useState } from 'react';

type Category = {
  id: number | undefined;
  name: string;
};

type CategorySelectorProps = {
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const CategorySelector = ({value, onChange}: CategorySelectorProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/recipe/categories", {
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

    return (
        <>
            <label htmlFor="category">Category:</label>
            {
                error ? (
                    <div>{error}</div>) : (
                    <select id="category" onChange={onChange} value={value} disabled={categories.length <= 0} defaultValue={undefined}>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        }
                        <option value={undefined}>None</option>
                    </select>
                )
            }
        </>
    )
}

export default CategorySelector