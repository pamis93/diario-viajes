import "./Login.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "../../UserContext";


function Login() {
    const [user, setUser] = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    if (user) return <Navigate to="/"/>

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await fetch(
            "https://travel-diary-api.anxoso.com/users/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );
        const json = await res.json();
        if (res.ok) {
            setUser(json.token);
        } else {
            setError(json.error);
        }
    };


    return (
        <div id="login" className="page">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Usuario:</span>
                    <input
                        name="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Contraseña:</span>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button>Entrar</button>
                <Link to='/register'>Registrate</Link>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Login;
