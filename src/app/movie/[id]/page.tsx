'use client'; // This line marks this file as a Client Component

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../../components/MovieCard';
import Navbar from '../../../components/Navbar';

interface MoviePageProps {
    params: {
        id: string;
    };
}

const MoviePage = ({ params }: MoviePageProps) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await axios.get(`/api/search`, { params: { query: params.id } });
            setMovie(res.data);
        };
        fetchMovie();
    }, [params.id]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                {movie ? (
                    <MovieCard movie={movie} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
