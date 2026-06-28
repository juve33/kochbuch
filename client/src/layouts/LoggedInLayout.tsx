import { useReducer } from "react";
import { createPortal } from "react-dom";
import { Link, Outlet, useMatch } from 'react-router';


import LogoutButton from '../features/auth/LogoutButton';
import * as gs from '../utils/GlobalState'

const LoggedInLayout = () => {
    const [globalState, dispatchGlobalState] = useReducer(gs.globalStateReducer, {username: null, modalsOpen: 0} as gs.GlobalState)
    
    const recipeEditMatch = useMatch('/recipe/:recipeId/edit');
    const recipeNewMatch = useMatch('/recipe/new');

    const headerMenu = document.getElementById("header-menu");

    return (
        <gs.GlobalStateContext value={globalState}>
            <gs.GlobalStateDispatchContext value={dispatchGlobalState}>
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
            </gs.GlobalStateDispatchContext>
        </gs.GlobalStateContext>
    )
}

export default LoggedInLayout