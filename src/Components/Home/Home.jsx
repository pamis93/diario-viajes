import { useUser } from "../../UserContext.jsx";
import { useHome } from "../../hooks/api.js";
import Portada from "../../Routes/Portada/Portada.jsx";
import Votes from "../Votes/Votes.jsx";

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
            <div className="bg-black w-full flex items-center justify-center h-full">
                {user ? (
                    <div className="p-4 flex flex-wrap justify-center gap-4 bg-white max-w-xl w-full h-full opacity-100" >
                        <ul>
                            {visibleEntries.map((data) => (
                                <li
                                    key={data.id}
                                    className="w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-4 "
                                >
                                    {data.photos && data.photos.length > 0 ? (
                                        <img
                                            className="object-cover w-full h-56"
                                            src={`https://travel-diary-api.anxoso.com/uploads/${data.photos[0].name}`}
                                            alt="Imagen"
                                        />
                                    ) : null}
                                    <div className="py-5 text-center">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                            {data.title}
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-200">
                                            🌴 Lugar: {data.place}
                                        </p>
                                        <Votes
                                            entryId={data.id}
                                            votes={data.votes}
                                            user={user}
                                            onVote={refreshEntries}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <Portada />
                )}
            </div>
        </>
    );
}

export default Home;

/* <div className='w-full max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800'>
                                <li  className='py-5 text-center' key={data.id}>
                                    {data.photos && data.photos.length > 0 ? (
                                        <img className='object-cover w-full h-56'
                                            src={`https://travel-diary-api.anxoso.com/uploads/${data.photos[0].name}`}
                                            alt="Imagen"
                                        />
                                    ) : null}
                                    <p>Título: {data.title}</p>
                                    <p>🌴 Lugar: {data.place}</p>
                                    <Votes className='' entryId={data.id} votes={data.votes} user={user} onVote={refreshEntries} />
                                </li>
                            </div> */
