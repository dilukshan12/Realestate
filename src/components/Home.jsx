import React, { useState } from "react";
import homeImage from "../../public/homeImage.jpg";
import { FaLocationDot } from "react-icons/fa6";

const Home = ({ searchCriteria, setSearchCriteria }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localCriteria, setLocalCriteria] = useState(searchCriteria);

  const handleInputChange = (field, value) => {
    const updated = { ...localCriteria, [field]: value };
    setLocalCriteria(updated);
    setSearchCriteria(updated);
  };

  const handleQuickLocation = (location) => {
    const updated = { ...localCriteria, location };
    setLocalCriteria(updated);
    setSearchCriteria(updated);
  };

  const clearSearch = () => {
    const cleared = {
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      maxBeds: '',
      minBaths: '',
      maxBaths: '',
      minSqft: '',
      maxSqft: '',
    };
    setLocalCriteria(cleared);
    setSearchCriteria(cleared);
  };

  return (
    <div className="relative h-[100vh]">
      <img src={homeImage} className="w-full h-full object-cover" alt="" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-sky-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent tracking-tight p-3">
          Where Luxury Feels Like Home
          </h1>

          <p className="text-lg md:text-2xl mb-8 text-gray-200">
            Exclusive estates and architectural masterpieces in Srilanka
          </p>

          <div className="bg-white/30 p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-4xl mx-auto">
            {/* Basic Search */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="Search by Location"
                value={localCriteria.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 hover:bg-blue-50 focus:bg-white text-black transition-colors duration-200"
              />

              <select 
                value={localCriteria.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="px-4 py-3 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>

              <button 
                onClick={clearSearch}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>



            {/* Advanced Search Options */}
            {showAdvanced && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 p-4 bg-white/20 rounded-lg">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Min Price (RS)</label>
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={localCriteria.minPrice}
                    onChange={(e) => handleInputChange('minPrice', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Max Price (RS)</label>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={localCriteria.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Min Beds</label>
                  <input
                    type="number"
                    placeholder="Min Beds"
                    value={localCriteria.minBeds}
                    onChange={(e) => handleInputChange('minBeds', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Max Beds</label>
                  <input
                    type="number"
                    placeholder="Max Beds"
                    value={localCriteria.maxBeds}
                    onChange={(e) => handleInputChange('maxBeds', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Min Baths</label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Min Baths"
                    value={localCriteria.minBaths}
                    onChange={(e) => handleInputChange('minBaths', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-white">Min Sqft</label>
                  <input
                    type="number"
                    placeholder="Min Sqft"
                    value={localCriteria.minSqft}
                    onChange={(e) => handleInputChange('minSqft', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
            )}

            {/* Quick Location Filters */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div 
                onClick={() => handleQuickLocation('Colombo')}
                className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <FaLocationDot className="text-blue-600 mb-2" />
                <span className="font-semibold text-white">Colombo</span>
              </div>

              <div 
                onClick={() => handleQuickLocation('Galle')}
                className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <FaLocationDot className="text-blue-600 mb-2" />
                <span className="font-semibold text-white">Galle</span>
              </div>

              <div 
                onClick={() => handleQuickLocation('Ella')}
                className="flex flex-col p-3 items-center bg-slate-50/20 rounded-lg transition-transform hover:scale-105 cursor-pointer"
              >
                <FaLocationDot className="text-blue-600 mb-2" />
                <span className="font-semibold text-white">Ella</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
