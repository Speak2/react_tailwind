import React, { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';

const FavoritesSection = () => {
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/get_favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Favs</h2>
        <div className="flex space-x-2">
          <button
            className={`p-2 ${viewMode === 'grid' ? 'text-orange-500' : 'text-gray-500'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={24} />
          </button>
          <button
            className={`p-2 ${viewMode === 'list' ? 'text-orange-500' : 'text-gray-500'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={24} />
          </button>
        </div>
      </div>
      <div className="h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full animate-fade-in-out">
            <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-cat.74a07522.svg" alt="cat logo" className="loading_cat"/>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 gap-2' : 'grid-cols-1 gap-2'}`}>
            {favorites.map((favorite) => (
              <div key={favorite.id} className={viewMode === 'grid' ? 'aspect-square' : 'h-min'}>
                <img 
                  src={favorite.image.url} 
                  alt="Favorite cat" 
                  className={`w-full h-full object-cover rounded-lg ${viewMode === 'list' ? 'object-contain' : ''}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesSection;