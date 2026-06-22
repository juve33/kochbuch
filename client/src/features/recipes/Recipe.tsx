import { useContext } from 'react';
import RecipeContext from './RecipeContext.js';

const Recipe = () => {
    const recipe = useContext(RecipeContext)
    
    return (
        <div>
            <div>
                <h1>
                    {recipe?.name}
                </h1>
                {recipe?.category_id ??
                    <p>
                        {recipe?.category_name}
                    </p>
                }
            </div>
            <div>
                <ul>
                    {recipe?.ingredients.map((ingredient) => (
                        <li>{ingredient.amount} {ingredient.unit} {ingredient.text} {ingredient.comment ?? <em>{ingredient.comment}</em>}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ol>
                    {recipe?.steps.map((step) => (
                        <li>{step.text}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default Recipe