import { useUser } from "../../UserContext.jsx";
import { useHome, useUserInfo } from "../../hooks/api.js";
import Portada from "../../Routes/Portada/Portada.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Asegúrate de ajustar la ruta
import ErrorModal from "./ErrorModal"; // Asegúrate de ajustar la ruta

function Entries() {
    const home = useHome();
    const [user] = useUser();
    const userId = useUserInfo();
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para el modal de confirmación
    const [showErrorModal, setShowErrorModal] = useState(false); // Estado para el modal de error
    const [entryToDelete, setEntryToDelete] = useState(null); // Entrada a eliminar
    const navigate = useNavigate();

    const userEntries = Array.isArray(home?.data)
        ? home.data.filter((data) => data.userId === userId?.data.user.id)
        : [];

    const handleEdit = (id) => {
        navigate(`/edit-entry/${id}`);
    };

    const handleDelete = (id) => {
        setEntryToDelete(id);
        setShowModal(true); // Muestra el modal de confirmación
    };

    const confirmDelete = () => {
        if (entryToDelete) {
            fetch(`https://travel-diary-api.anxoso.com/entries/${entryToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: user.token,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        setSuccess("Entrada eliminada exitosamente");
                        setErrorMessage(null);
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        throw new Error("Error al eliminar la entrada");
                    }
                })
                .catch((error) => {
                    setErrorMessage(error.message); // Guarda el mensaje de error
                    setShowErrorModal(true); // Muestra el modal de error
                    setSuccess(null);
                })
                .finally(() => {
                    setShowModal(false); // Cierra el modal de confirmación
                    setEntryToDelete(null); // Resetea la entrada a eliminar
                });
        }
    };

    return (
        <>
            {user ? (
                <div className="portada">
                    <ul>
                        {userEntries.length > 0 ? (
                            userEntries.map((data) => (
                                <li key={data.id}>
                                    <p>Título: {data.title}</p>
                                    {data.photos && data.photos.length > 0 ? (
                                        <img
                                            src={`https://travel-diary-api.anxoso.com/uploads/${data.photos[0].name}`}
                                            alt="Imagen"
                                        />
                                    ) : null}
                                    <p>🌴 Lugar: {data.place}</p>
                                    <p className="votes">❤️ {Math.floor(data.votes)}</p>
                                    <button onClick={() => handleEdit(data.id)}>Editar</button>
                                    <button onClick={() => handleDelete(data.id)}>Eliminar</button>
                                </li>
                            ))
                        ) : (
                            <p>No tienes entradas publicadas.</p>
                        )}
                    </ul>
                    {errorMessage && <p>{errorMessage}</p>}
                    {success && <p>{success}</p>}

                    {showModal && (
                        <Modal
                            message="¿Estás seguro de que deseas eliminar esta entrada?"
                            onConfirm={confirmDelete}
                            onCancel={() => setShowModal(false)} // Cierra el modal de confirmación
                        />
                    )}

                    {showErrorModal && (
                        <ErrorModal
                            message={errorMessage}
                            onClose={() => setShowErrorModal(false)} // Cierra el modal de error
                        />
                    )}
                </div>
            ) : (
                <Portada />
            )}
        </>
    );
}

export default Entries;
