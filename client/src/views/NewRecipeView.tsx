import { useState } from 'react';

import CategorySelector from '../features/recipes/CategorySelector';
import IngredientForm, { type Ingredient } from '../features/recipes/IngredientForm';
import StepForm, { type Step } from '../features/recipes/StepForm';
import AddButton from '../components/AddButton';
import DeleteButton from '../components/DeleteButton';
import SortableFieldset from '../components/SortableFieldset';
import SortableFieldsetContext from '../components/SortableFieldsetContext';

const NewRecipeView = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([{id: 1, text:""}]);
    const [steps, setSteps] = useState<Step[]>([{id: 1, text:""}]);

    return (
        <form>
            <input
                type="text"
                id="recipe-name"
                placeholder="Cake"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
            <CategorySelector onChange={(e) => setCategory(e.target.value)} value={category} />
            <fieldset>
                <SortableFieldsetContext
                    value={ingredients}
                    setAction={setIngredients}
                >
                    {ingredients.map((ingredient, index) => (
                            <SortableFieldset
                                key={ingredient.id}
                                id={ingredient.id}
                            >
                                <IngredientForm
                                    index={index}
                                    value={ingredient}
                                    setAction={setIngredients}
                                />
                                <DeleteButton
                                    index={index}
                                    setAction={setIngredients}
                                >
                                    x
                                </DeleteButton>
                            </SortableFieldset>
                        ))}
                </SortableFieldsetContext>
                <AddButton
                    createItem={() => ({
                        id: Date.now(),
                        text: "",
                    })}
                    setAction={setIngredients}
                >
                    Add ingredient
                </AddButton>
            </fieldset>
            <fieldset>
                <SortableFieldsetContext
                    value={steps}
                    setAction={setSteps}
                >
                    {steps.map((step, index) => (
                        <SortableFieldset
                            key={step.id}
                            id={step.id}
                        >
                            <StepForm
                                index={index}
                                value={step}
                                setAction={setSteps}
                            />
                            <DeleteButton
                                index={index}
                                setAction={setSteps}
                            >
                                x
                            </DeleteButton>
                        </SortableFieldset>
                    ))}
                </SortableFieldsetContext>
                <AddButton
                    createItem={() => ({
                        id: Date.now(),
                        text: "",
                    })}
                    setAction={setSteps}
                >
                    Add step
                </AddButton>
            </fieldset>
        </form>
    )
}

export default NewRecipeView