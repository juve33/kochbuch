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
        <div className='recipe'>
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
            <div className='recipe-group-head'>
                <h1 className='recipe-name'>
                    {recipe?.name}
                </h1>
                {recipe?.category_id &&
                    <p className='recipe-category'>
                        {recipe?.category_name}
                    </p>
                }
                <input
                    type='number'
                    className='recipe-servings'
                    id='servings'
                    min={0.5}
                    step={0.5}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    disabled={globalState.modalsOpen > 0}
                />
                <label className='recipe-servings-label' htmlFor='servings'>Servings</label>
            </div>
            <div className='recipe-group-ingredients'>
                <ul>
                    {recipe?.ingredients.map((ingredient) => (
                        <li className='recipe-ingredient__wrapper recipe-ingredient__content'>
                            {ingredient.amount ? ingredient.amount * servings / (recipe.servings ?? 1) : undefined} {ingredient.unit} {ingredient.text} {ingredient.comment && <em>{ingredient.comment}</em>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='recipe-group-steps'>
                <ol>
                    {recipe?.steps.map((step, index) => (
                        <div className='recipe-step__wrapper'>
                            <input
                                type='checkbox'
                                className='recipe-step-checkbox'
                                id={'step-' + step.id?.toString()}
                                disabled={globalState.modalsOpen > 0}
                            />
                            <li>
                                <label className='recipe-step__content' htmlFor={'step-' + step.id?.toString()}>
                                    <div className='recipe-step-index'>
                                        {index + 1}
                                    </div>
                                    {step.text}
                                </label>
                            </li>
                        </div>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Recipe