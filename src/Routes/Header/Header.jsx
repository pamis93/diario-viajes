import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/api";
import { useUser } from "../../UserContext";
import HeaderSesion from "./HeaderSesion";

function Header() {
    const userInfo = useUserInfo();
    const [user] = useUser();

    return (
        <header id="head">
            <div className="flex items-center justify-between">
                <Link to="/">
                    {user ? null : <h1>INICIO</h1>} 
                </Link>
            </div>
            {user ? (
                <HeaderSesion />
            ) : (
                <div className="text-gray-500 dark:text-gray-200 ">
                    <Link to="/login">Inicia sesión</Link>
                </div>
            )}
        </header>
    );
}

export default Header;
