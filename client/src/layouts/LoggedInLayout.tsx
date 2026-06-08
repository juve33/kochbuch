import { Outlet, useMatch } from 'react-router';

import Header from '../components/Header';
import ShareButton from '../features/recipes/ShareButton';

const LoggedInLayout = () => {
    const recipeMatch = useMatch('/recipe/:recipeId');

    const recipeId = Number(recipeMatch?.params.recipeId);

    return (
        <>
            <Header>
                {Number.isInteger(recipeId) && (
                    <ShareButton
                        recipeId={recipeId}
                    />
                )}
            </Header>
            <Outlet />
        </>
    )
}

export default LoggedInLayout