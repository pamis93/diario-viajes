import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/api";
import { useUser } from "../../UserContext";
import HeaderSesion from "./HeaderSesion";
import logo from "../../assets/icon.png";

function Header() {
    const userInfo = useUserInfo();
    const [user] = useUser();

    return (
        <header id="head">
            {user ? (
                <HeaderSesion />
            ) : (
                <div className="flex items-center justify-between  bg-white shadow dark:bg-gray-800 pl-2 m-">

            <div className="">
            <Link to="/">
                            <img
                                className="w-auto h-6 sm:h-12"
                                src={logo}
                                alt="Logo"
                            />
                        </Link>
            </div>

            
            <div className="text-gray-500 dark:text-gray-200 pr-2 ">
                    <Link to="/login">Inicia sesión</Link>
                </div>

            </div>
            )}
        
        </header>
    );
}

export default Header;
