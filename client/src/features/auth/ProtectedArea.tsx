import { createPortal } from "react-dom";
import { Link, Outlet, Navigate, useMatch } from 'react-router';


import LogoutButton from './LogoutButton';
import { useGlobalState } from '../../utils/GlobalState'

const ProtectedArea = () => {
    const globalState = useGlobalState();
    
    const recipeEditMatch = useMatch('/recipe/:recipeId/edit');
    const recipeNewMatch = useMatch('/recipe/new');

    const headerMenu = document.getElementById("header-menu");

    return (
        globalState.authStatus === "unauthenticated" ?
            <Navigate to="/login" replace />
        :
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
                        <Link relative="route" to="/recipe/new" tabIndex={-1}>
                            <button
                                type='button'
                                aria-label="Create new recipe"
                                disabled={globalState.modalsOpen > 0}
                            />
                        </Link>
                    </>
                )}
            </>
    )
}

export default ProtectedArea