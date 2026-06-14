import { useState } from 'react';

type LogoutButtonProps = {
    children?: string | React.ReactNode;
};

const LogoutButton = ({ children }: LogoutButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5001/auth/logout" , {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Logging out failed");
            }

            window.location.href = "/login";
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            console.error(message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <button 
            type="button"
            onClick={handleClick}
            disabled={loading}
        >
            {children}
        </button>
    )
}

export default LogoutButton