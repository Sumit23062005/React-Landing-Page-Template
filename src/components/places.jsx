import React, { useState } from "react";

export const PlacesSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const placesData = {
    'miami': [
      {
        name: "South Beach",
        category: "beach",
        rating: 4.7,
        description: "Famous white sand beach with Art Deco backdrop",
        highlights: ["White sand", "Clear water", "Vibrant nightlife", "Art Deco architecture"],
        bestTime: "Early morning or sunset",
        crowdLevel: "Very busy",
        activities: ["Swimming", "Sunbathing", "Photography", "People watching"]
      },
      {
        name: "Wynwood Walls",
        category: "culture",
        rating: 4.5,
        description: "Outdoor street art museum with colorful murals",
        highlights: ["Street art", "Photography", "Galleries", "Unique shops"],
        bestTime: "Late afternoon",
        crowdLevel: "Moderate",
        activities: ["Art viewing", "Photography", "Shopping", "Gallery hopping"]
      },
      {
        name: "Vizcaya Museum",
        category: "historic",
        rating: 4.4,
        description: "Historic European-style villa with beautiful gardens",
        highlights: ["Architecture", "Gardens", "History", "Waterfront views"],
        bestTime: "Morning",
        crowdLevel: "Moderate",
        activities: ["Museum tour", "Garden walk", "Photography", "Learning"]
      },
      {
        name: "Bayside Marketplace",
        category: "shopping",
        rating: 4.2,
        description: "Waterfront shopping and entertainment complex",
        highlights: ["Shopping", "Dining", "Live music", "Boat tours"],
        bestTime: "Evening",
        crowdLevel: "Busy",
        activities: ["Shopping", "Dining", "Entertainment", "Boat tours"]
      }
    ],
    'malibu': [
      {
        name: "El Matador Beach",
        category: "beach",
        rating: 4.8,
        description: "Dramatic rocky beach perfect for photography",
        highlights: ["Rock formations", "Tide pools", "Photography", "Secluded"],
        bestTime: "Sunset",
        crowdLevel: "Light",
        activities: ["Photography", "Tide pooling", "Sunset viewing", "Relaxation"]
      },
      {
        name: "Point Dume",
        category: "nature",
        rating: 4.6,
        description: "Scenic hiking trail with panoramic ocean views",
        highlights: ["Hiking", "Ocean views", "Wildlife", "Photography"],
        bestTime: "Morning or late afternoon",
        crowdLevel: "Moderate",
        activities: ["Hiking", "Photography", "Wildlife viewing", "Meditation"]
      },
      {
        name: "Getty Villa",
        category: "culture",
        rating: 4.7,
        description: "Museum featuring ancient Greek and Roman art",
        highlights: ["Ancient art", "Architecture", "Gardens", "Free admission"],
        bestTime: "Mid-morning",
        crowdLevel: "Moderate",
        activities: ["Museum visit", "Garden walk", "Learning", "Photography"]
      },
      {
        name: "Malibu Pier",
        category: "historic",
        rating: 4.3,
        description: "Historic pier with fishing, dining, and ocean views",
        highlights: ["Historic pier", "Fishing", "Dining", "Ocean views"],
        bestTime: "Sunrise or sunset",
        crowdLevel: "Moderate",
        activities: ["Fishing", "Dining", "Walking", "Photography"]
      }
    ],
    'virginia': [
      {
        name: "Virginia Beach Boardwalk",
        category: "beach",
        rating: 4.5,
        description: "3-mile boardwalk with beach access and entertainment",
        highlights: ["Boardwalk", "Beach access", "Entertainment", "Dining"],
        bestTime: "Evening",
        crowdLevel: "Very busy",
        activities: ["Walking", "Biking", "Entertainment", "Dining"]
      },
      {
        name: "First Landing State Park",
        category: "nature",
        rating: 4.4,
        description: "Natural area with hiking trails and diverse ecosystems",
        highlights: ["Hiking trails", "Wildlife", "Beach", "History"],
        bestTime: "Morning",
        crowdLevel: "Light",
        activities: ["Hiking", "Wildlife viewing", "Beach walking", "Photography"]
      },
      {
        name: "Virginia Aquarium",
        category: "family",
        rating: 4.6,
        description: "Marine science museum with interactive exhibits",
        highlights: ["Marine life", "Interactive exhibits", "IMAX theater", "Educational"],
        bestTime: "Mid-morning",
        crowdLevel: "Moderate",
        activities: ["Learning", "Interactive exhibits", "IMAX movies", "Family fun"]
      }
    ]
  };

  const searchPlaces = () => {
    if (!selectedLocation) return;
    
    let places = placesData[selectedLocation] || [];
    
    if (selectedCategory) {
      places = places.filter(place => 
        place.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredPlaces(places);
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

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'beach': return <i className="fas fa-umbrella-beach"></i>;
      case 'culture': return <i className="fas fa-palette"></i>;
      case 'historic': return '🏛️';
      case 'nature': return '🌲';
      case 'shopping': return '🛍️';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return <i className="fas fa-map-marker-alt"></i>;
    }
  };

  const getCrowdColor = (crowdLevel) => {
    switch(crowdLevel.toLowerCase()) {
      case 'light': return '#28a745';
      case 'moderate': return '#ffc107';
      case 'busy': return '#fd7e14';
      case 'very busy': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div id="places" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            <div className="section-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            Recommended Places
          </h2>
          <p>Discover must-visit attractions and hidden gems near the coast</p>
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
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="beach">Beaches</option>
              <option value="culture">Culture & Arts</option>
              <option value="historic">Historic Sites</option>
              <option value="nature">Nature & Parks</option>
              <option value="shopping">Shopping</option>
              <option value="family">Family Fun</option>
            </select>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-custom" 
              onClick={searchPlaces}
              disabled={!selectedLocation}
            >
              Discover Places
            </button>
          </div>
        </div>

        <div className="row places-grid">
          {filteredPlaces.map((place, index) => (
            <div key={index} className="col-md-6 place-card">
              <div className="place-item">
                <div className="place-header">
                  <h3>
                    {getCategoryIcon(place.category)} {place.name}
                  </h3>
                  <div className="rating">
                    {renderStars(place.rating)}
                    <span className="rating-text">({place.rating})</span>
                  </div>
                </div>
                
                <div className="place-info">
                  <p className="description">{place.description}</p>
                  
                  <div className="place-details">
                    <div className="detail-item">
                      <strong>🕒 Best Time:</strong> {place.bestTime}
                    </div>
                    <div className="detail-item">
                      <strong>👥 Crowd Level:</strong> 
                      <span 
                        className="crowd-indicator" 
                        style={{color: getCrowdColor(place.crowdLevel)}}
                      >
                        {place.crowdLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="highlights">
                    <strong><i className="fas fa-star"></i> Highlights:</strong>
                    <div className="highlight-tags">
                      {place.highlights.map((highlight, i) => (
                        <span key={i} className="highlight-tag">{highlight}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="activities">
                    <strong><i className="fas fa-bullseye"></i> Activities:</strong>
                    <div className="activity-tags">
                      {place.activities.map((activity, i) => (
                        <span key={i} className="activity-tag">{activity}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="place-actions">
                    <button className="btn btn-custom-outline">
                      <i className="fas fa-directions"></i> Get Directions
                    </button>
                    <button className="btn btn-custom">💾 Save to Trip</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && selectedLocation && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p>No places found for your criteria. Try adjusting your filters.</p>
            </div>
          </div>
        )}

        <div className="row planning-tips">
          <div className="col-md-8 col-md-offset-2">
            <div className="tips-section">
              <h3>🗺️ Trip Planning Tips</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li><i className="fas fa-sunrise"></i> Visit popular spots early morning</li>
                    <li>📱 Download offline maps</li>
                    <li>🎫 Check for advance ticket requirements</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li><i className="fas fa-car"></i> Plan parking in advance</li>
                    <li>☀️ Bring sun protection</li>
                    <li>📸 Charge your camera/phone</li>
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