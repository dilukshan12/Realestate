import React from "react";
import properties from "../properties";
import { FaBath, FaBed, FaHeart, FaRuler } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { searchProperties } from "../utils/searchUtils";

const FeaturedProperties = ({ setSelectedProperty, searchCriteria }) => {
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

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
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
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white transition-colors duration-200">
                <FaHeart className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
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
