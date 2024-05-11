import { useState, useEffect } from "react";
import './Prueba.css'

const API_URL = "http://localhost:3010/";

function Prueba() {
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        fetch(`${API_URL}api/v1/movies/findSecondMovie`)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    }, []);


    return (
        <>
            <div className="movieContainer">
                <h2>Segunda Película</h2>
                {movie ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Director</th>
                                <th>Año</th>
                                <th>Duración</th>
                                <th>Clasificación</th>
                                <th>Sinopsis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{movie.title}</td>*
                                <td>{movie.director}</td>
                                <td>{movie.year}</td>
                                <td>{movie.duration}</td>
                                <td>{movie.rating}</td>
                                <td>{movie.synopsis}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </>
    );
}

export default Prueba;
