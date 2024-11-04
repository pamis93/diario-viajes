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
        <div className="flex items-center justify-center mt-2"> 
            {/* Botón para votar */}
            <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={handleVote}>❤️</button>
            {/* Mostrar los votos */}
            <p className="ml-2 text-gray-700 dark:text-gray-200">{Math.floor(currentVotes)}</p>
        </div>
    );
}

export default Votes;
