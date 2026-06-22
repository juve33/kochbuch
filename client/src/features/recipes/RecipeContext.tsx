import { createContext } from 'react';

import { type RecipeApi } from '../../utils/ApiTypes'

const RecipeContext = createContext<RecipeApi | undefined>(undefined);

export default RecipeContext