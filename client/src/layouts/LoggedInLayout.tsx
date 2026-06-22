import { Link, Outlet, useMatch } from 'react-router';

import Header from '../components/Header';
import LogoutButton from '../features/auth/LogoutButton';
import ShareButton from '../features/recipes/ShareButton';

const LoggedInLayout = () => {
    const recipeMatch = useMatch('/recipe/:recipeId');
    const recipeEditMatch = useMatch('/recipe/:recipeId/edit');
    const recipeNewMatch = useMatch('/recipe/new');

    const recipeId = Number(recipeMatch?.params.recipeId);

    return (
        <>
            <Header>
                <LogoutButton>
                    Logout
                </LogoutButton>
                {Number.isInteger(recipeId) && (
                    <>
                        <ShareButton
                            recipeId={recipeId}
                        />
                        <Link to="edit"><button type='button'>Edit</button></Link>
                    </>
                )}
                {recipeEditMatch && (
                    <Link relative="path" to=".."><button type='button'>Back</button></Link>
                )}
            </Header>
            <Outlet />
            {(Number.isInteger(recipeId) || recipeEditMatch || recipeNewMatch) && (
                <>
                    <Link relative="route" to="/overview"><button type='button'>Back to overview</button></Link>
                </>
            )}
            {!(recipeEditMatch || recipeNewMatch) && (
                <>
                    <Link relative="route" to="/recipe/new"><button type='button'>Create new recipe</button></Link>
                </>
            )}
        </>
    )
}

export default LoggedInLayout