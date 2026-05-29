import { useEffect, useState } from 'react';

import { type RecipeOverviewApi } from '../utils/ApiTypes';

const RecipeView = () => {
    const [recipes, setRecipes] = useState<RecipeOverviewApi[]>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost:5001/recipe/all", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || "Fetching recipes failed");
                }
                
                setRecipes(data as RecipeOverviewApi[]);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Unexpected error";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, []);

    return (
        <div>
            <h1>All recipes</h1>
            <div>
                {recipes?.map((recipe) => (
                    <div>
                        <a href={'/recipe/' + recipe.id}>
                            {recipe.name}
                        </a>
                    </div>
                ))}
                {error ?? error}
            </div>
        </div>
    )
}

export default RecipeView