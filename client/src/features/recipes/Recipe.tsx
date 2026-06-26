import { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import { Link, useOutletContext } from 'react-router'

import { type RecipeOutletContext } from '../../views/RecipeView.js';
import ShareButton from './ShareButton.js';

const Recipe = () => {
    const { recipe } = useOutletContext<RecipeOutletContext>()

    const [servings, setServings] = useState<number>(1);

    useEffect(() => {
        if (recipe) {
            setServings(recipe?.servings ?? 1)
        }
    }, [recipe]);

    const headerMain = document.getElementById("header-main");
    const headerMenu = document.getElementById("header-menu");
    
    return (
        <div>
            {headerMain && createPortal(
                <>
                    <Link relative="route" to="/overview"><button type='button'>Back</button></Link>
                </>,
            headerMain)
            }
            {headerMenu && createPortal(
                <>
                    {(recipe?.id && recipe.role == 10) &&
                        <ShareButton
                            recipeId={recipe.id}
                        />
                    }
                    {(recipe?.role == 10) &&
                        <Link to="edit"><button type='button'>Edit</button></Link>
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
                <input type='number' id='servings' min={0.5} step={0.5} value={servings} onChange={(e) => setServings(Number(e.target.value))} />
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