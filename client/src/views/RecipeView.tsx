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

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>, recipe: RecipeApi) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5001/recipe/" + recipeId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(recipe)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Modifying recipe failed");
            }

            window.location.href = "/recipe/" + recipeId;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        error ? (
            <p>{error}</p>
        ) : (
            <Outlet context={{ recipe: recipe, disabled: loading, onFormSubmit: handleSubmit} satisfies RecipeOutletContext} />
        )       
    )
}

export default RecipeView