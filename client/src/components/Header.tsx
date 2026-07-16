import { type JSX } from "react";
import { createPortal } from "react-dom";

import { useGlobalStateDispatch } from "../utils/GlobalState";

type HeaderProps = {
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Header = ({ children } : HeaderProps) => {
    const dispatchGlobalState = useGlobalStateDispatch();

    return createPortal(
        <header>
            <div ref={headerMainRef => dispatchGlobalState({type: "set header main ref", headerMainRef: headerMainRef})}></div>
            {children}
            <div ref={headerMenuRef => dispatchGlobalState({type: "set header menu ref", headerMenuRef: headerMenuRef})}></div>
        </header>,
        document.body
    )
}

export default Header