import React, { useState, useEffect } from "react";
import geoapifyService from "../services/geoapifyService";
import "./places.css";

export const PlacesSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [liveSearchEnabled, setLiveSearchEnabled] = useState(false);

  // Test API function
  const testAPI = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const testUrl = 'https://api.geoapify.com/v2/places?categories=beach&filter=rect:73.80088790553927,18.56939352002724,73.90515903154818,18.468189133652153&limit=5&apiKey=0ae4c931ec2448fd982a2f3af08c11d7';
      console.log('Testing API directly:', testUrl);
      
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('Direct API test - Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Direct API test - Error:', errorText);
        throw new Error(`API test failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Direct API test - Success:', data);
      
      if (data.features && data.features.length > 0) {
        setError(`✅ API test successful! Found ${data.features.length} places. The API is working correctly.`);
        
        // Convert and display the results
        const formattedResults = data.features.map(feature => {
          const props = feature.properties;
          return {
            id: props.place_id || Math.random().toString(36),
            name: props.name || 'Unnamed Place',
            category: 'beach',
            coordinates: feature.geometry.coordinates,
            address: [props.street, props.housenumber, props.suburb, props.city, props.state, props.country].filter(Boolean).join(', ') || 'Address not available',
            rating: '4.0',
            description: `Real place from Geoapify API: ${props.name || 'A beautiful coastal location'}`,
            highlights: ['Real API data', 'Live location', 'Geoapify verified'],
            activities: ['Beach activities', 'Exploration', 'Photography'],
            bestTime: 'Anytime',
            crowdLevel: 'Variable',
            contact: {
              phone: props.phone,
              website: props.website
            }
          };
        });
        
        setFilteredPlaces(formattedResults);
      } else {
        setError('⚠️ API working but no places found in this specific area. Try a different location.');
        setFilteredPlaces([]);
      }
      
    } catch (error) {
      console.error('Direct API test failed:', error);
      setError(`❌ API test failed: ${error.message}. Check console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Static fallback data (your existing data)
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

  // Set up API key when component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('geoapify_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      geoapifyService.setApiKey(savedApiKey);
      setLiveSearchEnabled(true);
    } else {
      // Use the default API key from configuration
      const defaultApiKey = '0ae4c931ec2448fd982a2f3af08c11d7';
      setApiKey(defaultApiKey);
      geoapifyService.setApiKey(defaultApiKey);
      setLiveSearchEnabled(true);
    }
  }, []);

  // Save API key to localStorage and enable live search
  const saveApiKey = () => {
    if (apiKey && apiKey !== 'YOUR_API_KEY') {
      localStorage.setItem('geoapify_api_key', apiKey);
      geoapifyService.setApiKey(apiKey);
      setLiveSearchEnabled(true);
      setShowApiKeyInput(false);
      setError(null);
    } else {
      setError('Please enter a valid API key');
    }
  };

  // Live search using Geoapify API
  const searchPlacesLive = async () => {
    if (!selectedLocation) {
      searchPlacesStatic();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let places = [];
      
      if (selectedCategory === 'beach' || !selectedCategory) {
        // Search for beaches
        const beaches = await geoapifyService.searchBeaches(selectedLocation, 15);
        places = [...places, ...beaches];
      }
      
      if (selectedCategory && selectedCategory !== 'beach') {
        // Search for other categories
        const otherPlaces = await geoapifyService.searchPlacesByCategory(
          selectedLocation, 
          selectedCategory, 
          10
        );
        places = [...places, ...otherPlaces];
      }

      // Remove duplicates based on name and coordinates
      const uniquePlaces = places.filter((place, index, self) => 
        index === self.findIndex(p => 
          p.name === place.name && 
          Math.abs(p.coordinates[0] - place.coordinates[0]) < 0.001
        )
      );

      setFilteredPlaces(uniquePlaces);
      
      // Show success message if using mock data
      if (uniquePlaces.length > 0 && uniquePlaces[0].id?.includes('mock')) {
        setError('Using demo data - Add your Geoapify API key for real-time results!');
      }
      
    } catch (err) {
      console.error('Error fetching live data:', err);
      
      if (err.message.includes('API key not configured')) {
        setError('🔑 API key required for live search. Using static data instead.');
      } else if (err.message.includes('HTTP error')) {
        setError('🌐 API service unavailable. Check your API key or try again later.');
      } else {
        setError('❌ Failed to fetch live data. Using static data instead.');
      }
      
      searchPlacesStatic();
    } finally {
      setIsLoading(false);
    }
  };

  // Static search (your original method)
  const searchPlacesStatic = () => {
    if (!selectedLocation) return;
    
    let places = placesData[selectedLocation] || [];
    
    if (selectedCategory) {
      places = places.filter(place => 
        place.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setFilteredPlaces(places);
  };

  // Main search function
  const searchPlaces = () => {
    if (liveSearchEnabled) {
      searchPlacesLive();
    } else {
      searchPlacesStatic();
    }
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
      case 'restaurant': return <i className="fas fa-utensils"></i>;
      case 'hotel': return <i className="fas fa-bed"></i>;
      case 'attraction': return <i className="fas fa-camera"></i>;
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
            {liveSearchEnabled && <span className="live-badge">🟢 Live Search</span>}
          </h2>
          <p>Discover must-visit attractions and hidden gems near the coast</p>
          
          {!liveSearchEnabled && (
            <div className="api-setup-notice">
              <p>
                <i className="fas fa-info-circle"></i> 
                Enable live beach search with Geoapify API for real-time results!
              </p>
              <div className="setup-buttons">
                <button 
                  className="btn btn-custom-outline btn-sm"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                >
                  {showApiKeyInput ? 'Hide' : 'Setup Live Search'}
                </button>
                <button 
                  className="btn btn-custom btn-sm"
                  onClick={() => {
                    setLiveSearchEnabled(true);
                    setError('Demo mode: Using sample data to show API functionality');
                  }}
                >
                  🚀 Try Demo Mode
                </button>
              </div>
            </div>
          )}

          {showApiKeyInput && (
            <div className="api-key-input">
              <div className="row">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Geoapify API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-custom" onClick={saveApiKey}>
                    Enable Live Search
                  </button>
                </div>
              </div>
              <small className="help-text">
                Get your free API key from <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">geoapify.com</a>
              </small>
            </div>
          )}
        </div>
        
        <div className="row search-section">
          {error && (
            <div className="col-md-12">
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            </div>
          )}
          
          <div className="col-md-3">
            <select 
              className="form-control" 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location...</option>
              {liveSearchEnabled ? (
                <>
                  <option value="mumbai">Mumbai Beaches</option>
                  <option value="goa">Goa Beaches</option>
                  <option value="kerala">Kerala Beaches</option>
                  <option value="custom">Custom Location</option>
                </>
              ) : (
                <>
                  <option value="miami">Miami Beach, FL</option>
                  <option value="malibu">Malibu, CA</option>
                  <option value="virginia">Virginia Beach, VA</option>
                </>
              )}
            </select>
          </div>
          <div className="col-md-3">
            <select 
              className="form-control" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="beach">Beaches</option>
              {liveSearchEnabled ? (
                <>
                  <option value="restaurant">Restaurants</option>
                  <option value="hotel">Hotels</option>
                  <option value="attraction">Attractions</option>
                  <option value="shopping">Shopping</option>
                </>
              ) : (
                <>
                  <option value="culture">Culture & Arts</option>
                  <option value="historic">Historic Sites</option>
                  <option value="nature">Nature & Parks</option>
                  <option value="shopping">Shopping</option>
                  <option value="family">Family Fun</option>
                </>
              )}
            </select>
          </div>
          <div className="col-md-3">
            <button 
              className="btn btn-custom" 
              onClick={searchPlaces}
              disabled={!selectedLocation || isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Searching...
                </>
              ) : (
                'Discover Places'
              )}
            </button>
          </div>
          <div className="col-md-3">
            {liveSearchEnabled && (
              <button 
                className="btn btn-custom-outline"
                onClick={() => {
                  localStorage.removeItem('geoapify_api_key');
                  setLiveSearchEnabled(false);
                  setApiKey('');
                  setFilteredPlaces([]);
                }}
              >
                <i className="fas fa-cog"></i> Settings
              </button>
            )}
            <button 
              className="btn btn-success"
              onClick={testAPI}
              disabled={isLoading}
              style={{ marginLeft: liveSearchEnabled ? '10px' : '0' }}
            >
              🧪 Test API
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
                    {place.address && (
                      <div className="detail-item">
                        <strong>📍 Address:</strong> 
                        <span className="address-text">{place.address}</span>
                      </div>
                    )}
                    {place.distance && (
                      <div className="detail-item">
                        <strong>📏 Distance:</strong> {Math.round(place.distance)}m away
                      </div>
                    )}
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
                    {place.contact?.website && (
                      <a 
                        href={place.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-custom-outline"
                      >
                        <i className="fas fa-external-link-alt"></i> Website
                      </a>
                    )}
                    {place.contact?.phone && (
                      <a 
                        href={`tel:${place.contact.phone}`}
                        className="btn btn-custom-outline"
                      >
                        <i className="fas fa-phone"></i> Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && selectedLocation && !isLoading && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No places found for your criteria. Try adjusting your filters.</p>
                {!liveSearchEnabled && (
                  <p><small>Enable live search for more comprehensive results!</small></p>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <p>Searching for amazing places...</p>
              </div>
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
              
              {liveSearchEnabled && (
                <div className="api-info">
                  <h4>🌐 Live Search Features</h4>
                  <ul>
                    <li>✅ Real-time beach and resort data</li>
                    <li>✅ Contact information and websites</li>
                    <li>✅ Distance calculations</li>
                    <li>✅ Multiple location support</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};