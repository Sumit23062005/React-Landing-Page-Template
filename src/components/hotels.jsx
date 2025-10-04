import React, { useState } from "react";

export const HotelsSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);

  const hotelData = {
    'miami': [
      {
        name: "Ocean View Resort",
        rating: 4.5,
        price: 180,
        distance: "50m from beach",
        amenities: ["Pool", "Spa", "Restaurant", "WiFi"],
        image: "/img/hotel1.jpg"
      },
      {
        name: "Beachside Inn",
        rating: 4.2,
        price: 120,
        distance: "100m from beach",
        amenities: ["Pool", "Breakfast", "WiFi"],
        image: "/img/hotel2.jpg"
      },
      {
        name: "Luxury Oceanfront",
        rating: 4.8,
        price: 300,
        distance: "Beachfront",
        amenities: ["Pool", "Spa", "Restaurant", "Gym", "WiFi"],
        image: "/img/hotel3.jpg"
      }
    ],
    'malibu': [
      {
        name: "Pacific Coast Hotel",
        rating: 4.3,
        price: 220,
        distance: "Beachfront",
        amenities: ["Restaurant", "WiFi", "Parking"],
        image: "/img/hotel4.jpg"
      },
      {
        name: "Malibu Beach Lodge",
        rating: 4.6,
        price: 280,
        distance: "25m from beach",
        amenities: ["Pool", "Spa", "Restaurant", "WiFi"],
        image: "/img/hotel5.jpg"
      }
    ],
    'virginia': [
      {
        name: "Boardwalk Hotel",
        rating: 4.1,
        price: 95,
        distance: "200m from beach",
        amenities: ["Pool", "WiFi", "Breakfast"],
        image: "/img/hotel6.jpg"
      },
      {
        name: "Atlantic Shores Resort",
        rating: 4.4,
        price: 160,
        distance: "Beachfront",
        amenities: ["Pool", "Restaurant", "Gym", "WiFi"],
        image: "/img/hotel7.jpg"
      }
    ]
  };

  const searchHotels = () => {
    if (!selectedLocation) return;
    
    let hotels = hotelData[selectedLocation] || [];
    
    if (priceRange) {
      hotels = hotels.filter(hotel => {
        switch(priceRange) {
          case 'budget': return hotel.price < 150;
          case 'mid': return hotel.price >= 150 && hotel.price < 250;
          case 'luxury': return hotel.price >= 250;
          default: return true;
        }
      });
    }
    
    setFilteredHotels(hotels);
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
    <div id="hotels" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            <div className="section-icon">
              <i className="fas fa-hotel"></i>
            </div>
            Hotel Recommendations
          </h2>
          <p>Find the perfect beachfront accommodations for your coastal getaway</p>
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
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Price Ranges</option>
              <option value="budget">Budget (Under $150)</option>
              <option value="mid">Mid-range ($150-$250)</option>
              <option value="luxury">Luxury ($250+)</option>
            </select>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-custom" 
              onClick={searchHotels}
              disabled={!selectedLocation}
            >
              Search Hotels
            </button>
          </div>
        </div>

        <div className="row hotels-grid">
          {filteredHotels.map((hotel, index) => (
            <div key={index} className="col-md-4 hotel-card">
              <div className="hotel-item">
                <div className="hotel-image">
                  <div className="placeholder-image">
                    <i className="fas fa-hotel"></i>
                  </div>
                </div>
                <div className="hotel-info">
                  <h3>{hotel.name}</h3>
                  <div className="rating">
                    {renderStars(hotel.rating)}
                    <span className="rating-text">({hotel.rating})</span>
                  </div>
                  <div className="price">
                    <strong>${hotel.price}/night</strong>
                  </div>
                  <div className="distance">
                    <i className="fas fa-map-marker-alt"></i> {hotel.distance}
                  </div>
                  <div className="amenities">
                    <strong>Amenities:</strong>
                    <div className="amenity-tags">
                      {hotel.amenities.map((amenity, i) => (
                        <span key={i} className="amenity-tag">{amenity}</span>
                      ))}
                    </div>
                  </div>
                  <button className="btn btn-custom-outline">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHotels.length === 0 && selectedLocation && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p>No hotels found for your criteria. Try adjusting your filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};