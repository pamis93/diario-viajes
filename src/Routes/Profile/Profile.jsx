import React from "react";
import { useUser } from "../../UserContext";
import { Link, Navigate } from "react-router-dom";
import { useUserInfo } from "../../hooks/api";



function Profile() {
    const [user] = useUser();
    const profiles = useUserInfo();


    if (!user) return <Navigate to="/" />;

    if (!profiles || !profiles.data) {

        return <p>Cargando perfiles...</p>;
    }

    return (
        <div className="my-profile">
            <h1>Mi Perfil</h1>
            <ul>
                    <li key={profiles.data.user.id}>
                        <p>Nombre: {profiles.data.user.firstName}</p>
                        <p>Apellidos: {profiles.data.user.lastName}</p>
                        <p>Id: {profiles.data.user.id}</p>
                        <p>Email: {profiles.data.user.email} </p>
                        <br />
                        <Link to="users/edit"> Editar usuario</Link>
                    </li>
            </ul>
        </div>
    );
}

export default Profile;

