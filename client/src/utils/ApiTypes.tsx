export type RecipeApi = {
    id?: number;
    name: string;
    category_id?: number;
    category_name?: string;
    role: number;
    servings?: number;
    duration?: number;
    
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