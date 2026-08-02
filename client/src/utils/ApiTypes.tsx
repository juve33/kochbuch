export type RecipeApi = {
    id?: number;
    name: string;
    category_id?: number;
    category_name?: string;
    role: number;
    servings?: number;
    duration?: number;
    author?: string;
    
    images: ImageApi[];
    ingredients: IngredientApi[];
    steps: StepApi[];
}

type RecipeSimplifiedApi = {
    id: number;
    name: string;
}

export type RecipeListByCategoryApi = {
    category_name?: string;
    recipes: RecipeSimplifiedApi[];
}

export type ImageApi = {
    id?: number;
    slot: number;
    caption?: string;
}

export type IngredientApi = {
    id?: number;
    index_number: number;
    amount?: number;
    unit?: string;
    text: string;
    comment?: string;
}

export type StepApi = {
    id?: number;
    index_number: number;
    text: string;
}

export type ShareableUserApi = {
    name: string;
    key_id: number;
}

export type ShareableUserListApi = {
    local: ShareableUserApi[];
    foreign: ShareableUserApi[];
}

export type UserApi = {
    id: number;
    name: string;
    role: number;
}