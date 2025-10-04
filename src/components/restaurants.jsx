import React, { useState } from "react";

export const RestaurantsSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const restaurantData = {
    'miami': [
      {
        name: "Ocean Grill",
        cuisine: "seafood",
        rating: 4.6,
        priceRange: "$$$",
        specialties: ["Fresh Lobster", "Grilled Fish", "Seafood Paella"],
        distance: "Beachfront",
        hours: "11 AM - 11 PM",
        atmosphere: "Upscale casual",
        oceanView: true
      },
      {
        name: "Beachside Cafe",
        cuisine: "american",
        rating: 4.3,
        priceRange: "$$",
        specialties: ["Fish Tacos", "Burgers", "Tropical Salads"],
        distance: "50m from beach",
        hours: "8 AM - 9 PM",
        atmosphere: "Casual",
        oceanView: true
      },
      {
        name: "Havana Dreams",
        cuisine: "cuban",
        rating: 4.7,
        priceRange: "$$",
        specialties: ["Mojo Pork", "Cuban Sandwich", "Plantains"],
        distance: "2 blocks from beach",
        hours: "12 PM - 10 PM",
        atmosphere: "Traditional",
        oceanView: false
      },
      {
        name: "Sushi Wave",
        cuisine: "japanese",
        rating: 4.4,
        priceRange: "$$$",
        specialties: ["Fresh Sashimi", "Specialty Rolls", "Sake Selection"],
        distance: "1 block from beach",
        hours: "5 PM - 12 AM",
        atmosphere: "Modern",
        oceanView: false
      }
    ],
    'malibu': [
      {
        name: "Pacific Catch",
        cuisine: "seafood",
        rating: 4.8,
        priceRange: "$$$$",
        specialties: ["Santa Barbara Uni", "Dungeness Crab", "Pacific Oysters"],
        distance: "Beachfront",
        hours: "5 PM - 10 PM",
        atmosphere: "Fine dining",
        oceanView: true
      },
      {
        name: "Surfrider Cafe",
        cuisine: "american",
        rating: 4.2,
        priceRange: "$$",
        specialties: ["Acai Bowls", "Fish & Chips", "California Wraps"],
        distance: "Beach adjacent",
        hours: "7 AM - 8 PM",
        atmosphere: "Surf casual",
        oceanView: true
      },
      {
        name: "Malibu Farm",
        cuisine: "organic",
        rating: 4.5,
        priceRange: "$$$",
        specialties: ["Farm-to-table", "Organic Salads", "Sustainable Seafood"],
        distance: "On the pier",
        hours: "8 AM - 9 PM",
        atmosphere: "Rustic chic",
        oceanView: true
      }
    ],
    'virginia': [
      {
        name: "Catch 31",
        cuisine: "seafood",
        rating: 4.4,
        priceRange: "$$$",
        specialties: ["Blue Crab Cakes", "Fresh Catch", "Chesapeake Oysters"],
        distance: "Boardwalk",
        hours: "4 PM - 11 PM",
        atmosphere: "Upscale",
        oceanView: true
      },
      {
        name: "Boardwalk Burgers",
        cuisine: "american",
        rating: 4.1,
        priceRange: "$",
        specialties: ["Classic Burgers", "Boardwalk Fries", "Milkshakes"],
        distance: "On boardwalk",
        hours: "11 AM - 10 PM",
        atmosphere: "Family friendly",
        oceanView: true
      }
    ]
  };

  const searchRestaurants = () => {
    if (!selectedLocation) return;
    
    let restaurants = restaurantData[selectedLocation] || [];
    
    if (selectedCuisine) {
      restaurants = restaurants.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }
    
    setFilteredRestaurants(restaurants);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    return stars;
  };

  return (
    <div id="restaurants" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            <div className="section-icon">
              <i className="fas fa-utensils"></i>
            </div>
            Restaurant Recommendations
          </h2>
          <p>Discover the best dining experiences near the coast</p>
        </div>
        
        <div className="row search-section">
          <div className="col-md-4">
            <select 
              className="form-control" 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location...</option>
              <option value="miami">Miami Beach, FL</option>
              <option value="malibu">Malibu, CA</option>
              <option value="virginia">Virginia Beach, VA</option>
            </select>
          </div>
          <div className="col-md-4">
            <select 
              className="form-control" 
              value={selectedCuisine} 
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              <option value="">All Cuisines</option>
              <option value="seafood">Seafood</option>
              <option value="american">American</option>
              <option value="cuban">Cuban</option>
              <option value="japanese">Japanese</option>
              <option value="organic">Organic/Farm-to-table</option>
            </select>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-custom" 
              onClick={searchRestaurants}
              disabled={!selectedLocation}
            >
              Find Restaurants
            </button>
          </div>
        </div>

        <div className="row restaurants-grid">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="col-md-6 restaurant-card">
              <div className="restaurant-item">
                <div className="restaurant-header">
                  <h3>{restaurant.name}</h3>
                  {restaurant.oceanView && <span className="ocean-view-badge"><i className="fas fa-water"></i> Ocean View</span>}
                </div>
                
                <div className="restaurant-info">
                  <div className="rating-price">
                    <div className="rating">
                      {renderStars(restaurant.rating)}
                      <span className="rating-text">({restaurant.rating})</span>
                    </div>
                    <div className="price-range">
                      <strong>{restaurant.priceRange}</strong>
                    </div>
                  </div>
                  
                  <div className="cuisine-type">
                    <strong>Cuisine:</strong> {restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1)}
                  </div>
                  
                  <div className="specialties">
                    <strong>Specialties:</strong>
                    <div className="specialty-tags">
                      {restaurant.specialties.map((specialty, i) => (
                        <span key={i} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="restaurant-details">
                    <p><strong><i className="fas fa-map-marker-alt"></i> Distance:</strong> {restaurant.distance}</p>
                    <p><strong>🕒 Hours:</strong> {restaurant.hours}</p>
                    <p><strong>🎭 Atmosphere:</strong> {restaurant.atmosphere}</p>
                  </div>
                  
                  <div className="restaurant-actions">
                    <button className="btn btn-custom-outline">View Menu</button>
                    <button className="btn btn-custom">Make Reservation</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && selectedLocation && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p>No restaurants found for your criteria. Try adjusting your filters.</p>
            </div>
          </div>
        )}

        <div className="row dining-tips">
          <div className="col-md-8 col-md-offset-2">
            <div className="tips-section">
              <h3>🍴 Coastal Dining Tips</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li>🦞 Try local seafood specialties</li>
                    <li>📅 Make reservations for sunset dining</li>
                    <li><i className="fas fa-sunrise"></i> Book early for ocean view tables</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li><i className="fas fa-cocktail"></i> Don't miss happy hour specials</li>
                    <li>👔 Check dress codes for upscale spots</li>
                    <li>💰 Ask about daily fresh catch specials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};