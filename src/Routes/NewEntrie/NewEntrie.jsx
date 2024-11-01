import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function NewEntrie() {
    const [user] = useUser();
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [success, setSuccess] = useState(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleFile = (e) => {
        // para seleccionar varias fotos:
        const selectFiles = Array.from(e.target.files);
        setFiles(selectFiles);

        // previsualización de varias fotos:
        const selectedPreviews = selectFiles.map(file => URL.createObjectURL(file));
        setPreviews(selectedPreviews);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Subiendo:", files);

        const fd = new FormData();
        fd.append('title', title)
        fd.append('place', place)
        fd.append('description', description)

        // con esto añadimos todas las fotos seleccionadas:
        files.forEach(files => {
            fd.append("images[]", files); 
        }); 
    
        const res = await fetch("https://travel-diary-api.anxoso.com/entries", {
            method: "POST",
            headers: { Authorization: user.token },
            body: fd,
        });
        const json = await res.json();
        setSuccess(json);
        navigate("/");
    };

    if (!user) return <Navigate to="/" />;

    return (
        <div id="upload" className="page">
            <h1>Subir imagen</h1>
            <form onSubmit={handleSubmit}>
            <input 
                    type="text" 
                    placeholder="Título" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Lugar" 
                    value={place} 
                    onChange={(e) => setPlace(e.target.value)} 
                />
                <textarea 
                    placeholder="Descripción" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <label>
                    {previews.length > 0 ? (
                        previews.map((preview, id) => (
                            <img key={id} className="image-preview" src={preview} alt={`preview ${id}`} />
                        ))
                    ) : (
                        <div className="add-image" />
                    )}
                    <input type="file" multiple onChange={handleFile} />
                </label>
                <button>Subir</button>
            </form>
            {success && (
                <div>
                    Imagen subida con éxito!
                    <br />
                    <a href={success.url} target="_blank">
                        {success.url}
                    </a>
                </div>
            )}
        </div>
    );
}

export default NewEntrie;
