import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext.jsx";


function EditEntry() {
    const { entryId } = useParams(); // Obtén el id de la entrada desde la URL
    const [entryData, setEntryData] = useState(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Foto seleccionada
    const [errorMessage, setErrorMessage] = useState(null);
    const [user] = useUser();
    const navigate = useNavigate();

    // Obtener los datos de la entrada por su id
    useEffect(() => {     
        fetch(`https://travel-diary-api.anxoso.com/entries/${entryId}`, {
            headers: {
                Authorization: user.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA: ", data);
                
                setEntryData(data);
                setTitle(data.title || '');
                setPlace(data.place || '');
                setDescription(data.description || '');
                setPhotos(data.data.photos || []);  // ASI ES COMO SE ACCEDE A LA FOTO ACTUAL.
            })
            .catch((error) => {
                setErrorMessage("Error al cargar la entrada");
            });
    }, [entryId, user.token]);
    


    const handleSave = () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("place", place);
        formData.append('description', description)


        fetch(`https://travel-diary-api.anxoso.com/entries/${entryId}/edit`, {
            method: "PUT",
            headers: {
                Authorization: user.token,
            },
            body: formData, // Enviamos los datos como FormData
        })
            .then((res) => {
                if (res.ok) {
                    navigate("/mis_entradas"); // Redirige de nuevo a las entradas
                } else {
                    throw new Error("Error al guardar la entrada");
                }
            })
            .catch((error) => setErrorMessage(error.message));
    };


    return (
        <div>
            {entryData ? (
                <div>
                    <h2>Editar Entrada</h2>
                    {errorMessage && <p>{errorMessage}</p>}
                    <label>
                        Título: 
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Lugar:
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Fotos:
                        {photos.length > 0 ? (
                            <div>
                                {photos.map(photo => (
                                    <div key={photo.id}>
                                        <img
                                            src={`https://travel-diary-api.anxoso.com/uploads/${photo.name}`}
                                            alt="Foto actual"
                                            style={{ width: "200px", height: "auto" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay fotos disponibles</p>
                        )}
                    </label>
                    <br />
                    <button onClick={handleSave}>Guardar Cambios</button>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
}

export default EditEntry;
