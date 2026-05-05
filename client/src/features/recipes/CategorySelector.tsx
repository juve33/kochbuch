import { useState } from 'react';

const Login = () => {
    const [error, setError] = useState("");

    try {
        const response = await fetch("http://localhost:5000/recipe/categories" , {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || "Login failed");
        }
    } catch (err) {
        setError(err.message);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    }

    return (
        <select>
        </select>
    )
}

export default Login