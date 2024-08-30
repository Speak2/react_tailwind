import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Heart, ThumbsUp, ThumbsDown } from 'lucide-react';

const VotingComponent = () => {

    const [catImage, setCatImage] = useState({ url: '', id: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCatImage();
    }, []);

    const fetchCatImage = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/random-cat');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCatImage({ url: data.url, id: data.id });
        } catch (error) {
            console.error('Error fetching cat image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavorite = async () => {
        if (!catImage) return;

        try {
            await axios.post('http://localhost:8080/api/favorites', {
                image_id: catImage.id,
                sub_id: 'user-123', // Replace with actual user ID if available
            });
        } catch (error) {
            console.error('Error adding favorite:', error);
        } finally {
            fetchCatImage();
        }
    };

    const handleVote = async (value) => {
        if (!catImage) return;

        try {
            await axios.post('http://localhost:8080/api/votes', {
                image_id: catImage.id,
                sub_id: 'user-123', // Replace with actual user ID if available
                value: value,
            });
        } catch (error) {
            console.error('Error submitting vote:', error);
        } finally {
            fetchCatImage();
        }
    };


    return (
        <div>
            <div className="relative aspect-w-16 aspect-h-9 h-80">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-fade-in-out" >
                        <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-cat.74a07522.svg" alt="cat logo" className="loading_cat"/>
                    </div>
                ) : (
                    <img src={catImage.url} alt="Cat" className="object-cover w-full h-full" />
                )}
            </div>

            <div className="flex justify-between items-center p-4  border-gray-200">
                <button className="text-gray-400 hover:text-red-500">
                    <Heart onClick={handleFavorite} className="h-6 w-6" />
                </button>
                <div className="flex space-x-4">
                    <button onClick={() => handleVote(1)} className="text-gray-400 hover:text-blue-500">
                        <ThumbsUp className="h-6 w-6" />
                    </button>
                    <button onClick={() => handleVote(-1)} className="text-gray-400 hover:text-red-500">
                        <ThumbsDown className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VotingComponent;