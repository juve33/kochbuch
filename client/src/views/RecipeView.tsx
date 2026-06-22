import { useEffect, useState } from 'react';
import { Outlet, useParams } from "react-router";

import { type RecipeApi } from '../utils/ApiTypes';

export type RecipeOutletContext = {
    recipe?: RecipeApi;
    disabled?: boolean;
    onFormSubmit?: (e: React.SyntheticEvent<HTMLFormElement>, recipe: RecipeApi) => void | Promise<void>;
};

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
                const response = await fetch("http://localhost:5001/recipe/" + recipeId, {
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
        error ? (
            <p>{error}</p>
        ) : (
            <Outlet context={{ recipe: recipe, disabled: loading} satisfies RecipeOutletContext} />
        )       
    )
}

export default RecipeView