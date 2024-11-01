import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext.jsx";
import { useHome, useUserInfo } from "../../hooks/api.js";
import Modal from "../../Components/Modal/Modal.jsx";
import ErrorModal from "../../Components/ErrorModal/ErrorModal.jsx";
import Portada from "../../Routes/Portada/Portada.jsx";

function Entries() {
    const home = useHome();
    const [user] = useUser();
    const userId = useUserInfo();
    const [errorMessage, setErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const navigate = useNavigate();

    // Obtener las entradas del usuario
    const userEntries = Array.isArray(home?.data)
        ? home.data.filter((data) => data.userId === userId?.data.user.id && data.title !== "" && data.place !== "")
        : [];

        

    // Función para vaciar los campos de la entrada
    const handleDeleteEntry = (id) => {
        setEntryToDelete(id); // Guardar la entrada a eliminar
        setShowModal(true); // Mostrar modal de confirmación
    };

    // Confirmar eliminación de entrada (vaciar campos y enviarlo a la API)
    const confirmDeleteEntry = () => {
        if (entryToDelete) {
            fetch(
                `https://travel-diary-api.anxoso.com/entries/${entryToDelete}/edit`,
                {
                    method: "PUT", // Actualización de la entrada con PUT
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user.token, // Asegúrate de pasar el token de autenticación correcto
                    },
                    body: JSON.stringify({
                        title: "", // Vaciar campos
                        place: "",
                        description: "a", // Asignar "a" al campo description
                        photos: [],
                        votes: 0,
                    }),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        setSuccess(true); // Mostrar mensaje de éxito
                        setErrorMessage(null);
                        // Aquí puedes actualizar el estado local si es necesario
                    } else {
                        throw new Error("Error al eliminar la entrada");
                    }
                })
                .catch((error) => {
                    setErrorMessage(error.message); // Mostrar el mensaje de error
                    setShowErrorModal(true); // Mostrar modal de error
                    setSuccess(false);
                })
                .finally(() => {
                    setShowModal(false); // Cerrar modal
                    setEntryToDelete(null); // Resetear entrada a eliminar
                });
        }
    };

    // Función para editar una entrada
    const handleEdit = (id) => {
        navigate(`/entries/${id}/edit`);
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
                                    {data.photos && data.photos.length > 0 && data.description !== "a" && (
                                        <div>
                                            <img
                                                src={`https://travel-diary-api.anxoso.com/uploads/${data.photos[0].name}`}
                                                alt="Imagen"
                                            />
                                        </div>
                                    )}
                                    <p>🌴 Lugar: {data.place}</p>
                                    <p className="votes">❤️ {Math.floor(data.votes)}</p>

                                    {/* Botón para editar entrada */}
                                    <button onClick={() => handleEdit(data.id)}>Editar entrada</button>

                                    {/* Botón para eliminar entrada */}
                                    <button onClick={() => handleDeleteEntry(data.id)}>Eliminar entrada</button>
                                </li>
                            ))
                    ) : (
                        <p>No tienes entradas publicadas.</p>
                    )}
                </ul>

                {success && <p>¡Entrada eliminada con éxito!</p>}

                {showModal && (
                    <Modal
                        message="¿Estás seguro de que deseas eliminar esta entrada?"
                        onConfirm={confirmDeleteEntry}
                        onCancel={() => setShowModal(false)}
                    />
                )}

                {showErrorModal && (
                    <ErrorModal
                        message={errorMessage}
                        onClose={() => setShowErrorModal(false)}
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
