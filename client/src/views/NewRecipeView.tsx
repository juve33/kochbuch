import { useState } from 'react';

import RecipeForm from '../features/recipes/RecipeForm';
import { type Ingredient } from '../features/recipes/IngredientForm';
import { type Step } from '../features/recipes/StepForm';

const NewRecipeView = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([{id: 1, amountString: "500", unit:"g", text:"Flour"}]);
    const [steps, setSteps] = useState<Step[]>([{id: 1, text:"In a bowl, mix the flour and the salt"}]);

    return (
        <>
            <RecipeForm
                nameHook={[name, setName]}
                categoryHook={[category, setCategory]}
                ingredientsHook={[ingredients, setIngredients]}
                stepsHook={[steps, setSteps]}
            />
        </>
    )
}

export default NewRecipeView