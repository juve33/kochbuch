import { type RecipeApi } from '../../utils/ApiTypes';

type RecipeProps = {
    recipe?: RecipeApi;
};

const Recipe = ({ recipe }: RecipeProps) => {
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