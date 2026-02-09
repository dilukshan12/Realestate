import React, { useState } from "react";
import {
  FaBath,
  FaBed,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRuler,
} from "react-icons/fa";
import { FaLocationDot, FaX } from "react-icons/fa6";
import { useFavorites } from "../context/FavoritesContext";

const PropertyModal = ({ onClose, properties }) => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isFavorite, addToFavorites, removeFromFavorites, addToFavoritesStorageMethod, removeFromFavoritesStorageMethod } = useFavorites();

  if (!properties || properties.length === 0) {
    return null;
  }

  const currentProperty = properties[currentPropertyIndex];
  const favoriteStatus = isFavorite(currentProperty?.id);
  const images = currentProperty.images && currentProperty.images.length > 0 
    ? currentProperty.images 
    : [currentProperty.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Toggle favorite using Context API method
  const handleToggleFavoriteContext = (e) => {
    e.stopPropagation();
    if (favoriteStatus) {
      removeFromFavorites(currentProperty.id);
    } else {
      addToFavorites(currentProperty);
    }
  };

  // Toggle favorite using localStorage method (direct)
  const handleToggleFavoriteStorage = (e) => {
    e.stopPropagation();
    if (favoriteStatus) {
      removeFromFavoritesStorageMethod(currentProperty.id);
    } else {
      addToFavoritesStorageMethod(currentProperty);
    }
  };

  // Use Context API method by default, but both are available
  const handleToggleFavorite = handleToggleFavoriteContext;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full md:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[300px] md:h-[400px]">
          <img
            src={images[currentImageIndex]}
            alt=""
            className="w-full h-full object-cover"
          />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <FaChevronRight size={20} />
          </button>

          <button
            onClick={onClose}
            className="absolute text-white top-10 right-5 -translate-y-1/2 bg-red-500 p-2 rounded-full"
          >
            <FaX size={20} />
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-4">
            <button
              onClick={handleToggleFavorite}
              className={`bg-white/80 p-2 rounded-full transition-colors ${
                favoriteStatus ? "text-red-500" : "text-gray-500"
              } hover:text-red-500`}
              title={favoriteStatus ? "Remove from favorites" : "Add to favorites"}
            >
              <FaHeart className={favoriteStatus ? "fill-current" : ""} />
            </button>
            <div className="bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <FaLocationDot className="text-blue-600" />
            <span>{currentProperty.location}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentProperty.title}
          </h2>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {currentProperty.price}
          </div>

          <div className="flex gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FaBed className="text-blue-600" />
              <span className="text-gray-600">{currentProperty.beds} Beds</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBath className="text-blue-600" />
              <span className="text-gray-600">
                {currentProperty.baths} Baths
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaRuler className="text-blue-600" />
              <span className="text-gray-600">{currentProperty.sqft} sqft</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{currentProperty.description}</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
