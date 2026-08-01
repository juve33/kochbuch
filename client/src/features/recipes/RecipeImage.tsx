import { type ImageApi } from "../../utils/ApiTypes";

type RecipeImageProps = {
    slot: number;
    recipeId: number | undefined;
    images: ImageApi[] |undefined;
}

const RecipeImage = ({ slot, recipeId, images }: RecipeImageProps) => {
    const image = images?.find(image => image.slot === slot);
    
    return (
        <div className={'recipe-image image-' + slot + ((image && recipeId) ? '' : ' empty')}>
            {(image && recipeId) &&
                <>
                    <img src={"/api/uploads/recipe/" + recipeId + "/" + slot + ".webp"} />
                    <div className="recipe-image__text">{image.caption}</div>
                </>
            }
        </div>
    )
}

export default RecipeImage