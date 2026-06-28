import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { useOutletContext } from 'react-router'

import CategorySelector from './CategorySelector';
import IngredientForm, { type Ingredient } from './IngredientForm';
import StepForm, { type Step } from './StepForm';
import AddButton from '../../components/AddButton';
import DeleteButton from '../../components/DeleteButton';
import SortableFieldset from '../../components/SortableFieldset';
import SortableFieldsetContext from '../../components/SortableFieldsetContext';
import { type RecipeApi } from '../../utils/ApiTypes';
import Fraction from '../../utils/Fraction';
import { type RecipeOutletContext } from '../../views/RecipeView.js';
import BackButton from '../../components/BackButton.js';

import '../../assets/css/recipe.css';

const RecipeForm = () => {
    const { recipe, disabled, onFormSubmit } = useOutletContext<RecipeOutletContext>()

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>();
    const [servings, setServings] = useState<string>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setCategory(recipe.category_id ? recipe.category_id.toString() : undefined);
            setServings(recipe.servings ? recipe.servings.toString() : undefined);
            setIngredients(recipe.ingredients.map((ingredient): Ingredient => ({
                id: ingredient.id ?? Date.now(),
                apiId: ingredient.id,
                amount: ingredient.amount ? new Fraction(ingredient.amount): undefined,
                unit: ingredient.unit,
                text: ingredient.text,
                comment: ingredient.comment
            })));
            setSteps(recipe.steps.map((step): Step => ({
                id: step.id ?? Date.now(),
                apiId: step.id,
                text: step.text,
            })))
        }
    }, [recipe]);

    const headerMain = document.getElementById("header-main");

    const newRecipe = (): RecipeApi => {
        return {
            name: name,
            category_id: category ? parseInt(category) : undefined,
            role: recipe?.role ?? 0,
            servings: servings ? parseInt(servings) : undefined,

            ingredients:
                ingredients.map((ingredient, index) => ({
                    id: ingredient.apiId,
                    index_number: index,
                    amount: ingredient.amount?.valueAsNumber,
                    unit: ingredient.unit,
                    text: ingredient.text,
                    comment: ingredient.comment
                })),
            steps:
                steps.map((step, index) => ({
                    id: step.apiId,
                    index_number: index,
                    text: step.text,
                }))
            }
    }

    return (
        <form className='form form-recipe recipe' onSubmit={(e) => onFormSubmit?.(e, newRecipe())} aria-disabled={disabled}>
            {headerMain && createPortal(
                <>
                    <BackButton />
                </>,
            headerMain)}
            <div className='input-group input-group-head recipe-group-head'>
                <input
                    type="text"
                    id="recipe-name"
                    placeholder="New recipe"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <CategorySelector setAction={setCategory} value={category} />
                <input
                    type="number"
                    id="servings"
                    min={1}
                    onChange={(e) => setServings(e.target.value)}
                    value={servings}
                />
            </div>
            <fieldset className='input-group input-group-ingredients recipe-group-ingredients'>
                <SortableFieldsetContext
                    value={ingredients}
                    setAction={setIngredients}
                >
                    {ingredients.map((ingredient, index) => (
                            <SortableFieldset
                                key={ingredient.id}
                                id={ingredient.id}
                                className='input-item input-item-ingredients recipe-item-ingredients'
                            >
                                <IngredientForm
                                    index={index}
                                    value={ingredient}
                                    setAction={setIngredients}
                                />
                                <DeleteButton
                                    index={index}
                                    setAction={setIngredients}
                                    aria-label='Delete this ingredient'
                                />
                            </SortableFieldset>
                        ))}
                </SortableFieldsetContext>
                <AddButton
                    createItem={() => ({
                        id: Date.now(),
                        text: "",
                    })}
                    setAction={setIngredients}
                    aria-label='Add an ingredient'
                />
            </fieldset>
            <fieldset className='input-group input-group-steps recipe-group-steps'>
                <SortableFieldsetContext
                    value={steps}
                    setAction={setSteps}
                >
                    {steps.map((step, index) => (
                        <SortableFieldset
                            key={step.id}
                            id={step.id}
                            className='input-item input-item-steps recipe-item-steps'
                        >
                            <StepForm
                                index={index}
                                value={step}
                                setAction={setSteps}
                            />
                            <DeleteButton
                                index={index}
                                setAction={setSteps}
                                aria-label='Delete this step'
                            />
                        </SortableFieldset>
                    ))}
                </SortableFieldsetContext>
                <AddButton
                    createItem={() => ({
                        id: Date.now(),
                        text: "",
                    })}
                    setAction={setSteps}
                    aria-label='Add a step'
                />
            </fieldset>
            <button
                type="submit"
                disabled={disabled}
            >
                Save
            </button>
        </form>
    )
}

export default RecipeForm