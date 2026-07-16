import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { createPortal } from "react-dom";

import { type RecipeApi } from '../utils/ApiTypes';
import { type RecipeOutletContext } from './RecipeView.js';
import BackButton from '../components/BackButton';
import { useGlobalState } from '../utils/GlobalState.js';

const NewRecipeView = () => {
    const globalState = useGlobalState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>, recipe: RecipeApi) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost/api/recipe/", {
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

            navigate({pathname: "/recipe/" + data.id}, {replace: true});
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
            {globalState.refs?.headerMain?.current && createPortal(
                <>
                    <BackButton />
                </>,
            globalState.refs.headerMain.current)}
            <Outlet
                context={{
                    recipe: {
                        name: "",
                        role: 10,
                        servings: 1,
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