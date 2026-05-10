import { Routes, Route } from 'react-router-dom';

import Login from './features/auth/Login';
import NewRecipeView from './views/NewRecipeView';

function App() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            
            <Route path="recipe">
                <Route path="new" element={<NewRecipeView />} />
            </Route>
        </Routes>
    )
}

export default App
