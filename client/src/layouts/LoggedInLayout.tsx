import { Outlet, useMatch } from 'react-router';

import Header from '../components/Header';
import ShareButton from '../features/recipes/ShareButton';

const LoggedInLayout = () => {
    const recipeMatch = useMatch('/recipe/:recipeId');

    return (
        <>
            <Header>
                {recipeMatch?.params.recipeId && (
                    <ShareButton
                        recipeId={recipeMatch.params.recipeId}
                    />
                )}
            </Header>
            <Outlet />
        </>
    )
}

export default LoggedInLayout