import { createPortal } from "react-dom";
import { Link, Outlet, useMatch } from 'react-router';


import LogoutButton from '../features/auth/LogoutButton';

const LoggedInLayout = () => {
    const recipeEditMatch = useMatch('/recipe/:recipeId/edit');
    const recipeNewMatch = useMatch('/recipe/new');

    const headerMenu = document.getElementById("header-menu");

    return (
        <>
            {headerMenu && createPortal(
                <>
                    <LogoutButton>
                        Logout
                    </LogoutButton>
                </>,
            headerMenu)}
            <Outlet />
            {!(recipeEditMatch || recipeNewMatch) && (
                <>
                    <Link relative="route" to="/recipe/new"><button type='button' aria-label="Create new recipe" /></Link>
                </>
            )}
        </>
    )
}

export default LoggedInLayout