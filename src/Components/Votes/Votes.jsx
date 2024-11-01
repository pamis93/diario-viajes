import { useState, useEffect } from 'react';
import './votes.css';

function Votes({ entryId, votes, user, onVote }) {
    const [currentVotes, setCurrentVotes] = useState(votes || 0); // Inicializa con `votes` o 0

    // Función para manejar el voto
    const handleVote = async () => {
        try {
            const response = await fetch(
                `https://travel-diary-api.anxoso.com/entries/${entryId}/votes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user.token,
                    },
                    body: JSON.stringify({ value: 1 }), // Enviar el voto
                }
            );

            if (response.ok) {
                console.log("Voto registrado correctamente.");
                setCurrentVotes(prevVotes => prevVotes + 1); // Incrementa localmente
                if (onVote) {
                    onVote(); // Llama a la función de actualización
                }
            } else {
                console.error("Error al registrar el voto.");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <div className="votes"> 
            {/* Botón para votar */}
            <button className="buttonVote" onClick={handleVote}>❤️</button>
            {/* Mostrar los votos */}
            <p className="iconVotes">{Math.floor(currentVotes)}</p>
        </div>
    );
}

export default Votes;
