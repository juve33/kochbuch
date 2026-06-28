import { useNavigate } from "react-router"

type BackButtonProps =
    Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "onClick" | "type" | "children"
    > & {
        delta?: number;
        children?: string | React.ReactNode;
    }

const BackButton = ({ delta=-1, children, ...props } : BackButtonProps) => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            aria-label={props["aria-label"] ?? "Back"}
            onClick={() =>
                navigate(delta)
            }
            {...props}
        >
            {children}
        </button>
    )
}

export default BackButton