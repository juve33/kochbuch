import { useEffect, useRef, type JSX } from "react";
import { createPortal } from "react-dom";

import { useGlobalStateDispatch } from "../utils/GlobalState";

type HeaderProps = {
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Header = ({ children } : HeaderProps) => {
    const dispatchGlobalState = useGlobalStateDispatch();

    const headerMainRef = useRef<HTMLDivElement | null>(null);
    const headerMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatchGlobalState({
            type: "set header refs",
            headerMainRef,
            headerMenuRef,
        });
    }, []);

    return createPortal(
        <header>
            <div ref={headerMainRef}></div>
            {children}
            <div ref={headerMenuRef}></div>
        </header>,
        document.body
    )
}

export default Header