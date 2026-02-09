/**
 * Utility function to parse price string to numeric value
 * Handles formats like "RS.56,950,000" or "RS10,100,000"
 */
export const parsePrice = (priceString) => {
  if (!priceString) return 0;
  // Remove RS, dots, spaces, and commas, then parse to number
  const cleaned = priceString.replace(/RS\.?/i, '').replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
};

/**
 * Robust search function that handles 1-5 criteria combinations
 * @param {Array} properties - Array of property objects
 * @param {Object} searchCriteria - Search criteria object
 * @param {string} searchCriteria.location - Location search term
 * @param {string} searchCriteria.type - Property type (House, Apartment, Villa)
 * @param {number} searchCriteria.minPrice - Minimum price
 * @param {number} searchCriteria.maxPrice - Maximum price
 * @param {number} searchCriteria.minBeds - Minimum number of beds
 * @param {number} searchCriteria.maxBeds - Maximum number of beds
 * @param {number} searchCriteria.minBaths - Minimum number of baths
 * @param {number} searchCriteria.maxBaths - Maximum number of baths
 * @param {number} searchCriteria.minSqft - Minimum square footage
 * @param {number} searchCriteria.maxSqft - Maximum square footage
 * @returns {Array} Filtered array of properties
 */
export const searchProperties = (properties, searchCriteria) => {
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  // If no search criteria provided, return all properties
  const hasCriteria = Object.values(searchCriteria).some(
    value => value !== '' && value !== null && value !== undefined
  );

  if (!hasCriteria) {
    return properties;
  }

  return properties.filter(property => {
    // Location search (case-insensitive partial match)
    if (searchCriteria.location && searchCriteria.location.trim() !== '') {
      const locationLower = (property.location || '').toLowerCase();
      const searchLower = searchCriteria.location.toLowerCase().trim();
      if (!locationLower.includes(searchLower)) {
        return false;
      }
    }

    // Property type search (exact match)
    if (searchCriteria.type && searchCriteria.type !== '') {
      if (property.type !== searchCriteria.type) {
        return false;
      }
    }

    // Price range search
    const propertyPrice = parsePrice(property.price);
    if (searchCriteria.minPrice !== '' && searchCriteria.minPrice !== null && searchCriteria.minPrice !== undefined) {
      const minPrice = Number(searchCriteria.minPrice);
      if (!isNaN(minPrice) && minPrice > 0 && propertyPrice < minPrice) {
        return false;
      }
    }
    if (searchCriteria.maxPrice !== '' && searchCriteria.maxPrice !== null && searchCriteria.maxPrice !== undefined) {
      const maxPrice = Number(searchCriteria.maxPrice);
      if (!isNaN(maxPrice) && maxPrice > 0 && propertyPrice > maxPrice) {
        return false;
      }
    }

    // Beds range search
    if (searchCriteria.minBeds !== '' && searchCriteria.minBeds !== null && searchCriteria.minBeds !== undefined) {
      const minBeds = Number(searchCriteria.minBeds);
      if (!isNaN(minBeds) && minBeds > 0 && property.beds < minBeds) {
        return false;
      }
    }
    if (searchCriteria.maxBeds !== '' && searchCriteria.maxBeds !== null && searchCriteria.maxBeds !== undefined) {
      const maxBeds = Number(searchCriteria.maxBeds);
      if (!isNaN(maxBeds) && maxBeds > 0 && property.beds > maxBeds) {
        return false;
      }
    }

    // Baths range search
    if (searchCriteria.minBaths !== '' && searchCriteria.minBaths !== null && searchCriteria.minBaths !== undefined) {
      const minBaths = Number(searchCriteria.minBaths);
      if (!isNaN(minBaths) && minBaths > 0 && property.baths < minBaths) {
        return false;
      }
    }
    if (searchCriteria.maxBaths !== '' && searchCriteria.maxBaths !== null && searchCriteria.maxBaths !== undefined) {
      const maxBaths = Number(searchCriteria.maxBaths);
      if (!isNaN(maxBaths) && maxBaths > 0 && property.baths > maxBaths) {
        return false;
      }
    }

    // Square footage range search
    if (searchCriteria.minSqft !== '' && searchCriteria.minSqft !== null && searchCriteria.minSqft !== undefined) {
      const minSqft = Number(searchCriteria.minSqft);
      if (!isNaN(minSqft) && minSqft > 0 && property.sqft < minSqft) {
        return false;
      }
    }
    if (searchCriteria.maxSqft !== '' && searchCriteria.maxSqft !== null && searchCriteria.maxSqft !== undefined) {
      const maxSqft = Number(searchCriteria.maxSqft);
      if (!isNaN(maxSqft) && maxSqft > 0 && property.sqft > maxSqft) {
        return false;
      }
    }

    // If all criteria match, include this property
    return true;
  });
};

