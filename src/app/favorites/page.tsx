'use client'; // This line marks this file as a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard';
import Navbar from '../../components/Navbar';

const Favorites = () => {
    const [favorites, setFavorites] = useState<any[]>([]); // Specify the type of your favorites array

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const res = await axios.get('/api/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFavorites(res.data);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
                <div className="grid grid-cols-3 gap-4">
                    {favorites.map((favorite) => (
                        <MovieCard key={favorite._id} movie={favorite.movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
