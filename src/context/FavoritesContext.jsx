import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getFavoritesFromStorage, 
  saveFavoritesToStorage,
  addToFavoritesStorage,
  removeFromFavoritesStorage,
  clearFavoritesStorage,
  isFavoriteInStorage
} from '../utils/favoritesUtils';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  // Context API method - state management
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = getFavoritesFromStorage();
    setFavorites(storedFavorites);
  }, []);

  // Sync context state with localStorage
  const syncWithStorage = (newFavorites) => {
    setFavorites(newFavorites);
    saveFavoritesToStorage(newFavorites);
  };

  // Add to favorites using Context API method
  const addToFavorites = (property) => {
    // Check for duplicates
    if (!favorites.some(fav => fav.id === property.id)) {
      const updated = [...favorites, property];
      syncWithStorage(updated);
      return true;
    }
    return false; // Duplicate prevented
  };

  // Remove from favorites using Context API method
  const removeFromFavorites = (propertyId) => {
    const updated = favorites.filter(fav => fav.id !== propertyId);
    syncWithStorage(updated);
  };

  // Clear all favorites using Context API method
  const clearFavorites = () => {
    const cleared = clearFavoritesStorage();
    setFavorites(cleared);
  };

  // Check if property is favorite using Context API method
  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  // Add to favorites using localStorage method (direct)
  const addToFavoritesStorageMethod = (property) => {
    const updated = addToFavoritesStorage(property);
    setFavorites(updated);
    return updated.length > favorites.length; // Returns true if added, false if duplicate
  };

  // Remove from favorites using localStorage method (direct)
  const removeFromFavoritesStorageMethod = (propertyId) => {
    const updated = removeFromFavoritesStorage(propertyId);
    setFavorites(updated);
  };

  const value = {
    favorites,
    addToFavorites, // Context API method
    removeFromFavorites, // Context API method
    clearFavorites, // Context API method
    isFavorite, // Context API method
    addToFavoritesStorageMethod, // localStorage method
    removeFromFavoritesStorageMethod, // localStorage method
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

