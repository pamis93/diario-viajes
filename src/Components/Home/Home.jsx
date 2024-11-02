import { useUser } from '../../UserContext.jsx';
import { useHome } from '../../hooks/api.js';
import Portada from '../../Routes/Portada/Portada.jsx';
import Votes from '../Votes/Votes.jsx';

function Home() {
    const home = useHome();
    const [user] = useUser();

    const visibleEntries = Array.isArray(home?.data)
        ? home.data.filter((entry) => entry.title !== "" && entry.place !== "")  
        : [];

    // Función para volver a cargar las entradas
    const refreshEntries = async () => {
        await home.fetchEntries(); // Asegúrate de que esta función esté disponible en useHome
    };

    return (
        <>
            {user ? (
                <div className="portada">
                    <ul>
                        {visibleEntries?.map((data) => {
                            console.log(data.votes); // Muestra el objeto de la entrada completo
                            
                            return (
                                <li key={data.id}>
                                    <p>Título: {data.title}</p>
                                    {data.photos && data.photos.length > 0 ? (
                                        <img
                                            src={`https://travel-diary-api.anxoso.com/uploads/${data.photos[0].name}`}
                                            alt="Imagen"
                                        />
                                    ) : null}
                                    <p>🌴 Lugar: {data.place}</p>
                                    <Votes entryId={data.id} votes={data.votes} user={user} onVote={refreshEntries} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <Portada/>
            )}
        </>
    );
}

export default Home;
