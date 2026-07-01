import { useState } from 'react';
import { Outlet } from 'react-router';

import { type RecipeApi } from '../utils/ApiTypes';
import { type RecipeOutletContext } from './RecipeView.js';

const NewRecipeView = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>, recipe: RecipeApi) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5001/recipe/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(recipe)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Creating recipe failed");
            }

            window.location.href = "/recipe/" + data.id;
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Outlet
                context={{
                    recipe: {
                        name: "",
                        role: 10,
                        ingredients: [{index_number: 0, amount: 500, unit:"g", text:"Flour"}],
                        steps: [{index_number: 0, text:"In a bowl, mix the flour and the salt"}]
                    },
                    disabled: loading,
                    onFormSubmit: handleSubmit
                } satisfies RecipeOutletContext}
            />
            { error ?? (<p>{error}</p>)}
        </>
    )
}

export default NewRecipeView