import { Routes, Route } from 'react-router';

import LoggedInLayout from './layouts/LoggedInLayout';
import Login from './features/auth/Login';
import AllRecipesView from './views/AllRecipesView';
import NewRecipeView from './views/NewRecipeView';
import RecipeView from './views/RecipeView';
import Recipe from './features/recipes/Recipe';
import RecipeForm from './features/recipes/RecipeForm';

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route element={<LoggedInLayout />}>
                <Route path="overview" element={<AllRecipesView />} />
                
                <Route path="recipe">
                    <Route path="new" element={<NewRecipeView />}>
                        <Route index element={<RecipeForm />} />
                    </Route>
                    <Route path=":recipeId" element={<RecipeView />}>
                        <Route path="edit" element={<RecipeForm />} />
                        <Route index element={<Recipe />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
