import { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { type RecipeApi } from '../utils/ApiTypes';

const RecipeView = () => {
    let { recipeId } = useParams();

    const [recipe, setRecipe] = useState<RecipeApi>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost:5000/recipe/" + recipeId, {
                    method: "GET",
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || "Fetching recipe failed");
                }
                
                setRecipe(data as RecipeApi);
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
            <div>
                <h1>
                    {recipe?.name}
                </h1>
                {recipe?.category_id ??
                    <p>
                        {recipe?.category_name}
                    </p>
                }
            </div>
            <div>
                <ul>
                    {recipe?.ingredients.map((ingredient) => (
                        <li>{ingredient.amount} {ingredient.unit} {ingredient.text} {ingredient.comment ?? <em>{ingredient.comment}</em>}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ol>
                    {recipe?.steps.map((step) => (
                        <li>{step.text}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default RecipeView