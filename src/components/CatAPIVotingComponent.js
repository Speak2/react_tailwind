import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowUpDown, Search, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import BreedsSection from './BreedsSection';
import VotingComponent from './votingcomponent';
import FavoritesSection from './FavoritesSection';

const CatAPIVotingComponent = () => {
    const [activeTab, setActiveTab] = useState('voting');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Set the active tab based on the current route
        const path = location.pathname;
        if (path === '/') setActiveTab('voting');
        else if (path === '/breeds') setActiveTab('breeds');
        else if (path === '/favorites') setActiveTab('favorites');
    }, [location]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'voting') navigate('/');
        else if (tab === 'breeds') navigate('/breeds');
        else if (tab === 'favorites') navigate('/favorites');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <header className="w-full max-w-7xl px-2 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="https://thecatapi.com/_app/immutable/assets/thecatapi-logo.78868573.svg" alt="The Cat API Logo" className="w-40 h-8" />
                </div>
                <nav className="flex space-x-11">
                    <button className="text-gray-600 hover:text-gray-800 font-semibold">PRICING</button>
                    <button className="text-gray-600 hover:text-gray-800 font-semibold">DOCUMENTATION</button>
                    <button className="text-gray-600 hover:text-gray-800 font-semibold">MORE APIS</button>
                    <button className="text-gray-600 hover:text-gray-800 font-semibold">SHOWCASE</button>
                </nav>
            </header>

            <main className="w-full max-w-7xl px-2 py-10 flex justify-between items-start mt-12">
                <div className="w-1/2">
                    <h1 className="font-bold text-4x1 sm:text-5xl md:text-7xl">
                        <span className="heading-highlight"><span>The Cat API</span></span>
                        <br />
                        Cats as a service.
                    </h1>
                    <h3 className="mt-6 font-bold text-xl md:text-2xl">Because everyday is a Caturday.</h3>
                    <p className="text-lg text-gray-600 mb-6 max-w-xl mt-2">
                        An API all about cats.<br />
                        60k+ Images. Breeds. Facts.
                    </p>
                    <div className="space-x-4">
                        <button className="bg-black text-white px-6 py-3 rounded-md font-bold">GET YOUR API KEY</button>
                        <button className="border-2 border-black text-black px-6 py-3 rounded-md font-bold">READ OUR GUIDES</button>
                    </div>
                </div>

                <div className="w-full p-5 max-w-screen-sm h-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="flex justify-between items-center p-4 mb-2 mx-10 border-gray-200">
                        <button
                            className={`flex items-center space-x-2 font-semibold ${activeTab === 'voting' ? 'text-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabChange('voting')}
                        >
                            <ArrowUpDown className="w-5 h-5" />
                            <span>Voting</span>
                        </button>
                        <button
                            className={`flex items-center space-x-2 font-semibold ${activeTab === 'breeds' ? 'text-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabChange('breeds')}
                        >
                            <Search className="w-5 h-5" />
                            <span>Breeds</span>
                        </button>
                        <button
                            className={`flex items-center space-x-2 font-semibold ${activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-600'}`}
                            onClick={() => handleTabChange('favorites')}
                        >
                            <Heart className="w-5 h-5" />
                            <span>Favs</span>
                        </button>
                    </div>

                    <Routes>
                        <Route path="/" element={<VotingComponent />} />
                        <Route path="/breeds" element={<BreedsSection />} />
                        <Route path="/favorites" element={<FavoritesSection />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

const RoutedCatAPIVotingComponent = () => (
    <Router>
        <CatAPIVotingComponent />
    </Router>
);

export default RoutedCatAPIVotingComponent;