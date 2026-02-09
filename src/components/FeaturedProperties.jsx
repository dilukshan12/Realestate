import React from "react";
import properties from "../properties";
import { FaBath, FaBed, FaHeart, FaRuler, FaTrash, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { searchProperties } from "../utils/searchUtils";
import { useFavorites } from "../context/FavoritesContext";

const FeaturedProperties = ({ setSelectedProperty, searchCriteria }) => {
  const { 
    favorites, 
    isFavorite, 
    addToFavorites, 
    removeFromFavorites, 
    clearFavorites,
    addToFavoritesStorageMethod,
    removeFromFavoritesStorageMethod
  } = useFavorites();

  // Convert string inputs to numbers for search function
  const normalizedCriteria = {
    location: searchCriteria.location || '',
    type: searchCriteria.type || '',
    minPrice: searchCriteria.minPrice ? parseFloat(searchCriteria.minPrice) : '',
    maxPrice: searchCriteria.maxPrice ? parseFloat(searchCriteria.maxPrice) : '',
    minBeds: searchCriteria.minBeds ? parseInt(searchCriteria.minBeds) : '',
    maxBeds: searchCriteria.maxBeds ? parseInt(searchCriteria.maxBeds) : '',
    minBaths: searchCriteria.minBaths ? parseFloat(searchCriteria.minBaths) : '',
    maxBaths: searchCriteria.maxBaths ? parseFloat(searchCriteria.maxBaths) : '',
    minSqft: searchCriteria.minSqft ? parseInt(searchCriteria.minSqft) : '',
    maxSqft: searchCriteria.maxSqft ? parseInt(searchCriteria.maxSqft) : '',
  };

  const filteredProperties = searchProperties(properties, normalizedCriteria);

  // Toggle favorite using Context API method
  const handleToggleFavoriteContext = (e, property) => {
    e.stopPropagation();
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  // Toggle favorite using localStorage method (direct)
  const handleToggleFavoriteStorage = (e, property) => {
    e.stopPropagation();
    if (isFavorite(property.id)) {
      removeFromFavoritesStorageMethod(property.id);
    } else {
      addToFavoritesStorageMethod(property);
    }
  };

  // Use Context API method by default, but both are available
  const handleToggleFavorite = (e, property) => handleToggleFavoriteContext(e, property);

  // Remove single favorite
  const handleRemoveFavorite = (e, propertyId) => {
    e.stopPropagation();
    removeFromFavorites(propertyId);
  };

  // Clear all favorites
  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      {/* Favorites List - Prominently Displayed */}
      {favorites.length > 0 && (
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaHeart className="text-red-500" />
              My Favorites ({favorites.length})
            </h2>
            <button
              onClick={handleClearFavorites}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
              title="Clear all favorites"
            >
              <FaTrash /> Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow relative group cursor-pointer"
                onClick={() => setSelectedProperty(favorite)}
              >
                <button
                  onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  title="Remove from favorites"
                >
                  <FaTimes size={12} />
                </button>
                <img
                  src={favorite.image}
                  alt={favorite.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-sm text-gray-800 truncate">{favorite.title}</h3>
                <p className="text-blue-600 font-bold text-sm">{favorite.price}</p>
                <p className="text-gray-500 text-xs truncate">{favorite.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          {filteredProperties.length > 0 ? 'Featured Properties' : 'No Properties Found'}
        </h2>
        <span className="text-gray-600">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </span>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No properties match your search criteria.</p>
          <p className="text-gray-400">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl drop-shadow-lg overflow-hidden hover:drop-shadow-xl hover:scale-105 transition-all duration-300 relative group cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <div className="relative">
              <img
                src={property.image}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={(e) => handleToggleFavorite(e, property)}
                className={`absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white transition-colors duration-200 ${
                  isFavorite(property.id) ? 'bg-white' : ''
                }`}
                title={isFavorite(property.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <FaHeart 
                  className={`transition-colors duration-200 ${
                    isFavorite(property.id) 
                      ? "text-red-500 fill-current" 
                      : "text-gray-600 hover:text-red-500"
                  }`} 
                />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <FaLocationDot className="text-blue-600" />
                <span>{property.location}</span>
              </div>

              <div className="text-2xl font-bold text-blue-600 mb-2">
                {property.price}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {property.title}
              </h3>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  <span className="text-gray-600">{property.beds} Beds</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaBath className="text-blue-600" />
                  <span className="text-gray-600">{property.baths} Baths</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaRuler className="text-blue-600" />
                  <span className="text-gray-600">{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;
