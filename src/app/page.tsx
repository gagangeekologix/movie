'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            router.push('/login');
            return;
        }

        // Fetch favorites if authenticated
        const fetchFavorites = async () => {
            try {
                const res = await axios.get('/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFavorites(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavorites();
    }, [router]);

    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/search`, { params: { query } });
            setMovies(res.data.Search || []);
        } catch (error) {
            console.error(error);
        }
    };

    const addFavorite = async (movie) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/favorites/add', movie, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFavorites([...favorites, movie]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFavorite = async (movie) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/favorites/remove', { imdbID: movie.imdbID }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
        } catch (error) {
            console.error(error);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <form onSubmit={searchMovies}>
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for movies"
                        className="border p-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
                </form>
                <div className="mt-4">
                    <h2>Favorites</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {favorites.map(movie => (
                            <MovieCard 
                                key={movie.imdbID} 
                                movie={movie} 
                                isFavorite={true} 
                                onRemoveFavorite={removeFavorite} 
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h2>Search Results</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {movies.map(movie => (
                            <MovieCard 
                                key={movie.imdbID} 
                                movie={movie} 
                                isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)} 
                                onFavorite={addFavorite} 
                                onRemoveFavorite={removeFavorite} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
