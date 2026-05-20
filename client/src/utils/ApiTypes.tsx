export type RecipeApi = {
    id?: number;
    name: string;
    category_id?: number;
    servings?: number;
    duration?: number;
    
    ingredients: IngredientApi[];
    steps: StepApi[];
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