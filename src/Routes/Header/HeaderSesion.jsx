import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../Logout/LogoutButton";

function HeaderSesion() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para mostrar el menú al pasar el ratón

    const handleMouseEnter = () => setIsMenuOpen(true);
    
    // Función para ocultar el menú al salir el ratón
    const handleMouseLeave = () => setIsMenuOpen(false);

    return (
        <div className="nav-header-sesion"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            
                <h1>Menú</h1>
            
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <Link to="/users">Mi perfil</Link>
                    <Link to="entries/new">Nueva entrada</Link>
                    <Link to='mis_entradas'>Mis entradas</Link>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
}

export default HeaderSesion;