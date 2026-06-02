import { Outlet } from 'react-router';

import Header from '../components/Header';

const LoggedInLayout = () => {
    return (
        <>
            <Header>
            </Header>
            <Outlet />
        </>
    )
}

export default LoggedInLayout