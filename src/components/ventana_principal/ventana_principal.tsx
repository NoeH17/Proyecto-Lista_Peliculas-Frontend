import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ventana_principal.css';

type Movie = {
    title: string;
    director: string;
    year: number;
    duration: string;
    rating: string;
    synopsis: string;
    cast: string[];
    imageUrl: string;
};

type OMDBMovie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<OMDBMovie[]>([]);
    const [userMovies, setUserMovies] = useState<Movie[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("user");
        if (userInStorageString) {
          const userInStorage = JSON.parse(userInStorageString);
          setUser(userInStorage);
        }
      }, []);

    useEffect(() => {
        if (user) {
            const fetchUserMovies = async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/v1/movies', {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserMovies(data);
                    } else {
                        console.error('Error fetching user movies:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching user movies:', error);
                }
            };
            fetchUserMovies();
        }
    }, [user]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`);
            if (response.data.Search) {
                setSearchResults(response.data.Search);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleAddMovie = async (movie: OMDBMovie) => {
        if (!user) {
            console.error('User is not logged in');
            return;
        }
    
        const newMovie: Movie = {
            title: movie.Title,
            director: '', // Agrega detalles adicionales si son necesarios
            year: parseInt(movie.Year),
            duration: '', // Agrega detalles adicionales si son necesarios
            rating: '', // Agrega detalles adicionales si son necesarios
            synopsis: '', // Agrega detalles adicionales si son necesarios
            cast: [], // Agrega detalles adicionales si son necesarios
            imageUrl: movie.Poster,
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/v1/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newMovie)
            });
    
            if (response.ok) {
                const data = await response.json();
                setUserMovies([...userMovies, data]); // Asumiendo que el servidor devuelve la película creada
            } else {
                console.error('Error adding movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };
    
    
    
    

    return (
        <div className="App">
            <h1>Movie Search</h1>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button onClick={handleSearch}>Search</button>
            <div className="search-results">
                {searchResults.map((movie, index) => (
                    <div key={index} className="movie">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h2>{movie.Title}</h2>
                        <button onClick={() => handleAddMovie(movie)}>Add to List</button>
                    </div>
                ))}
            </div>
            <h2>My Movies</h2>
            <div className="user-movies">
                {userMovies.map((movie, index) => (
                    <div key={index} className="movie">
                        <img src={movie.imageUrl} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.synopsis}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
