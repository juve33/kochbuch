export type RecipeApi = {
    id?: number;
    name: string;
    category_id?: number;
    category_name?: string;
    servings?: number;
    duration?: number;
    
    ingredients: IngredientApi[];
    steps: StepApi[];
}

export type RecipeOverviewApi = {
    id: number;
    name: string;
    category_name?: string;
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