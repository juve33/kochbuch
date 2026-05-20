import React from 'react';

import CategorySelector from './CategorySelector';
import IngredientForm, { type Ingredient } from './IngredientForm';
import StepForm, { type Step } from './StepForm';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import SortableFieldset from '../../components/SortableFieldset';
import SortableFieldsetContext from '../../components/SortableFieldsetContext';

import '../../assets/css/recipe.css';
import Fraction from '../../utils/Fraction';

type RecipeFormProps = {
    nameHook: [string, React.Dispatch<React.SetStateAction<string>>];
    categoryHook: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>];
    ingredientsHook: [Ingredient[], React.Dispatch<React.SetStateAction<Ingredient[]>>];
    stepsHook: [Step[], React.Dispatch<React.SetStateAction<Step[]>>];
    disabled?: boolean;
    onFormSubmit?: React.SubmitEventHandler<HTMLFormElement>;
};

const RecipeForm = ({nameHook, categoryHook, ingredientsHook, stepsHook, disabled, onFormSubmit }: RecipeFormProps) => {
    const [name, setName] = nameHook;
    const [category, setCategory] = categoryHook;
    const [ingredients, setIngredients] = ingredientsHook;
    const [steps, setSteps] = stepsHook;

    return (
        <form className='form form-recipe' onSubmit={onFormSubmit} aria-disabled={disabled}>
            <div className='input-group input-group-head'>
                <input
                    type="text"
                    id="recipe-name"
                    placeholder="New recipe"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <CategorySelector onChange={(e) => setCategory(e.target.value)} value={category} />
            </div>
            <fieldset className='input-group input-group-ingredients'>
                <SortableFieldsetContext
                    value={ingredients}
                    setAction={setIngredients}
                >
                    {ingredients.map((ingredient, index) => (
                            <SortableFieldset
                                key={ingredient.id}
                                id={ingredient.id}
                                className='input-item input-item-ingredients'
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
            <fieldset className='input-group input-group-steps'>
                <SortableFieldsetContext
                    value={steps}
                    setAction={setSteps}
                >
                    {steps.map((step, index) => (
                        <SortableFieldset
                            key={step.id}
                            id={step.id}
                            className='input-item input-item-steps'
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
            <button
                type="submit"
                disabled={disabled}
            >
                Submit
            </button>
        </form>
    )
}

export default RecipeForm