import { useEffect, useState } from 'react';

import { type RecipeOverviewApi } from '../utils/ApiTypes';

import '../assets/css/recipe-list.css';

const RecipeView = () => {
    const [recipes, setRecipes] = useState<RecipeOverviewApi[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost/api/recipe/", {
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
        <div className={loading ? 'loading' : undefined}>
            <h1>Recipes</h1>
            {error ?? <p>{error}</p>}
            <ul className='recipe-list__wrapper'>
                {recipes?.map((recipe) => (
                    <li className='recipe-list-item'>
                        <a href={'/recipe/' + recipe.id}>
                            {recipe.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeView