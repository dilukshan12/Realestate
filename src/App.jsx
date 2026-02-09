import PropertyModal from "./components/PropertyModal";
import FeaturedProperties from "./components/FeaturedProperties";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { useState } from "react";

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
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
  });

  return (
    <FavoritesProvider>
      <div className="min-h-screen w-full bg-gray-50">
        <Home searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} />

        <FeaturedProperties 
          setSelectedProperty={setSelectedProperty} 
          searchCriteria={searchCriteria}
        />

        <Contact />

        <Footer />

        {selectedProperty && (
          <PropertyModal
            properties={[selectedProperty]}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
