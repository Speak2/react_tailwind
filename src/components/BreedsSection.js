import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BreedsSection = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedImages, setBreedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      fetchBreedImages(selectedBreed.id);
    }
  }, [selectedBreed]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % breedImages.length
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [breedImages]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/breeds');
      setBreeds(response.data);
      if (response.data.length > 0) {
        setSelectedBreed(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching breeds:', error);
      setLoading(false);
    }
  };

  const fetchBreedImages = async (breedId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/breed-images?breed_id=${breedId}`);
      setBreedImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching breed images:', error);
      setLoading(false);
    }
  };

  const handleBreedChange = (event) => {
    const breed = breeds.find(b => b.id === event.target.value);
    setSelectedBreed(breed);
    setCurrentImageIndex(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 animate-fade-in-out">
        <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-cat.74a07522.svg" alt="cat logo" className="loading_cat"/>
      </div>
    );
  }

  return (
    <div  >
      <div className="p-4">
        <div className="relative">
          <select 
            className="w-full p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            onChange={handleBreedChange}
            value={selectedBreed?.id || ''}
          >
            {breeds.map(breed => (
              <option key={breed.id} value={breed.id}>{breed.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
      {selectedBreed && (
        <div className="p-4">
          <div className="relative mb-4 h-64">
            {breedImages.length > 0 && (
              <img 
                src={breedImages[currentImageIndex].url} 
                alt={selectedBreed.name} 
                className="w-full h-full object-contain rounded-lg"
              />
            )}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              {breedImages.map((_, index) => (
                <span 
                  key={index} 
                  className={`h-2 w-2 mx-1 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-800 inline">{selectedBreed.name}</h3>
            <p className="text-sm text-gray-600 ml-2 mb-2 inline ">({selectedBreed.origin})</p>
            <p className="text-base font-normal text-gray-500 mb-4">{selectedBreed.description}</p>
            <a href="#!" className="text-sm font-medium text-orange-500 hover:text-orange-600">WIKIPEDIA</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedsSection;