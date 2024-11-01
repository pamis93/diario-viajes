import { Link } from "react-router-dom";
import "./Header.css";
import { useUserInfo } from "../../hooks/api";
import { useUser } from "../../UserContext";

import HeaderSesion from "./HeaderSesion";


function Header() {
    const userInfo = useUserInfo();
    const [user] = useUser();

    return (
        <header id="head">
            <Link to="/">
                <h1 className="text-3xl font-bold underline" >Inicio</h1>
            </Link>
            {user ? (
                <>
                    <HeaderSesion />
                </>
            ) : (
                <Link to="login">Inicia sesión</Link>
            )}
        </header>
    );
}

export default Header;
