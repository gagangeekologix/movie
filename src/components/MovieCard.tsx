import { useState } from 'react';
import axios from 'axios';

interface MovieCardProps {
    movie: {
        Title: string;
        Year: string;
        Poster: string;
        imdbID: string;
    };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [error, setError] = useState('');

    const handleAddToFavorites = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('You must be logged in to add favorites.');
            return;
        }

        try {
            await axios.post('/api/favorites', movie, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Movie added to favorites');
        } catch (error) {
            setError('Failed to add movie to favorites');
            console.error('Error adding to favorites:', error);
        }
    };

    return (
        <div className="border p-4 rounded">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4" />
            <h2 className="text-lg font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
            <button onClick={handleAddToFavorites} className="bg-blue-500 text-white p-2 mt-2">
                Add to Favorites
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default MovieCard;
