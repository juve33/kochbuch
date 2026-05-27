import { Routes, Route } from 'react-router-dom';

import Login from './features/auth/Login';
import AllRecipesView from './views/AllRecipesView';
import NewRecipeView from './views/NewRecipeView';
import RecipeView from './views/RecipeView';

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route path="overview" element={<AllRecipesView />} />
            
            <Route path="recipe">
                <Route path="new" element={<NewRecipeView />} />
                <Route path=":recipeId" element={<RecipeView />} />
            </Route>
        </Routes>
    )
}

export default App
