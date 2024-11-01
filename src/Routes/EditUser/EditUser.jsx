import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../hooks/api";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function EditUser() {
    const [user] = useUser(); //guarda el token
    const userInfo = useUserInfo();
    const userId = userInfo?.data.user.id; // guarda el userId que necesitamos para la edición
    const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [firstName, setFirstName] = useState(userInfo?.firstName || "");
    const [lastName, setLastName] = useState(userInfo?.lastName || "");
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
        }
    }, [userInfo]);

    if (!userInfo) {
        return <div>Cargando información del usuario...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Campos obligatorio
        if (!firstName || !lastName) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        const fd = new FormData();
        fd.append("avatar", avatar);
        fd.append("firstName", firstName);
        fd.append("lastName", lastName);

        const res = await fetch(
            `https://travel-diary-api.anxoso.com/users/edit/${userId}`,
            {
                method: "PUT",
                headers: { Authorization: user.token },
                body: fd,
            }
        );
        const json = await res.json();
        setSuccess(json);
        navigate("/users");
    };

    return (
        <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={userInfo?.firstName || "Nombre actual"}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={userInfo?.lastName || "Apellido actual"}
                    />
                </label>
                <label>
                    Avatar:
                    <input
                        type="file"
                        onChange={(e) => setAvatar(e.target.files[0])}
                    />
                </label>
                <button type="submit">Actualizar</button>

                {errorMessage && <p>{errorMessage}</p>}
                {success && <p>¡Perfil actualizado con éxito!</p>}
            </form>
        </div>
    );
}

export default EditUser;
