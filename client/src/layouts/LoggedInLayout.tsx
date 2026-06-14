import { Outlet, useMatch } from 'react-router';

import Header from '../components/Header';
import LogoutButton from '../features/auth/LogoutButton';
import ShareButton from '../features/recipes/ShareButton';

const LoggedInLayout = () => {
    const recipeMatch = useMatch('/recipe/:recipeId');

    const recipeId = Number(recipeMatch?.params.recipeId);

    return (
        <>
            <Header>
                <LogoutButton>
                    Logout
                </LogoutButton>
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