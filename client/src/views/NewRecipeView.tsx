import { useState } from 'react';

import RecipeForm from '../features/recipes/RecipeForm';
import { type Ingredient } from '../features/recipes/IngredientForm';
import { type Step } from '../features/recipes/StepForm';
import { type RecipeApi } from '../utils/ApiTypes';
import Fraction from '../utils/Fraction';

const NewRecipeView = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([{id: 1, amount: new Fraction(500), unit:"g", text:"Flour"}]);
    const [steps, setSteps] = useState<Step[]>([{id: 1, text:"In a bowl, mix the flour and the salt"}]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const recipe_parsed: RecipeApi = {
            name: name,
            category_id: category ? parseInt(category) : undefined,

            ingredients:
                ingredients.map((ingredient, index) => ({
                    index_number: index,
                    amount: ingredient.amount?.valueAsNumber,
                    unit: ingredient.unit,
                    text: ingredient.text,
                    comment: ingredient.comment
                })),
            steps:
                steps.map((step, index) => ({
                    index_number: index,
                    text: step.text,
                }))
        }

        try {
            const response = await fetch("http://localhost:5001/recipe/new" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(recipe_parsed)
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
            <RecipeForm
                nameHook={[name, setName]}
                categoryHook={[category, setCategory]}
                ingredientsHook={[ingredients, setIngredients]}
                stepsHook={[steps, setSteps]}
                disabled={loading}
                onFormSubmit={handleSubmit}
            />
            { error ?? (<p>{error}</p>)}
        </>
    )
}

export default NewRecipeView