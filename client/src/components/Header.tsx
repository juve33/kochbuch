import { type JSX } from "react";

type HeaderProps = {
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Header = ({ children } : HeaderProps) => {
    return (
        <header>
            {children}
        </header>
    )
}

export default Header