import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { Link, useOutletContext } from 'react-router'

import { type RecipeOutletContext } from '../../views/RecipeView.js';
import ShareButton from './ShareButton.js';
import { useGlobalState } from '../../utils/GlobalState.js';

const Recipe = () => {
    const { recipe } = useOutletContext<RecipeOutletContext>()

    const globalState = useGlobalState();

    const [servings, setServings] = useState<number>(1);

    useEffect(() => {
        if (recipe) {
            setServings(recipe?.servings ?? 1)
        }
    }, [recipe]);

    const headerMenu = document.getElementById("header-menu");
    
    return (
        <div>
            {headerMenu && createPortal(
                <>
                    {(recipe?.id && recipe.role == 10) &&
                        <ShareButton
                            recipeId={recipe.id}
                        />
                    }
                    {(recipe?.role == 10) &&
                        <Link to="edit" tabIndex={-1}><button type='button' disabled={globalState.modalsOpen > 0}>Edit</button></Link>
                    }
                </>,
            headerMenu)
            }
            <div>
                <h1>
                    {recipe?.name}
                </h1>
                {recipe?.category_id &&
                    <p>
                        {recipe?.category_name}
                    </p>
                }
                <input
                    type='number'
                    id='servings'
                    min={0.5}
                    step={0.5}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    disabled={globalState.modalsOpen > 0}
                />
                <label htmlFor='servings'>Servings</label>
            </div>
            <div>
                <ul>
                    {recipe?.ingredients.map((ingredient) => (
                        <li>
                            {ingredient.amount ? ingredient.amount * servings / (recipe.servings ?? 1) : undefined} {ingredient.unit} {ingredient.text} {ingredient.comment && <em>{ingredient.comment}</em>}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ol>
                    {recipe?.steps.map((step) => (
                        <li>
                            <input
                                type='checkbox'
                                id={step.id?.toString()}
                                disabled={globalState.modalsOpen > 0}
                            />
                            <label htmlFor={step.id?.toString()}>
                                {step.text}
                            </label>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Recipe