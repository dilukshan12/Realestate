// localStorage method for favorites management
export const getFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem('realestate_favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('realestate_favorites', JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
    return false;
  }
};

export const addToFavoritesStorage = (property) => {
  const favorites = getFavoritesFromStorage();
  // Check for duplicates by id
  if (!favorites.some(fav => fav.id === property.id)) {
    const updated = [...favorites, property];
    saveFavoritesToStorage(updated);
    return updated;
  }
  return favorites; // Return existing if duplicate
};

export const removeFromFavoritesStorage = (propertyId) => {
  const favorites = getFavoritesFromStorage();
  const updated = favorites.filter(fav => fav.id !== propertyId);
  saveFavoritesToStorage(updated);
  return updated;
};

export const clearFavoritesStorage = () => {
  try {
    localStorage.removeItem('realestate_favorites');
    return [];
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error);
    return getFavoritesFromStorage();
  }
};

export const isFavoriteInStorage = (propertyId) => {
  const favorites = getFavoritesFromStorage();
  return favorites.some(fav => fav.id === propertyId);
};

