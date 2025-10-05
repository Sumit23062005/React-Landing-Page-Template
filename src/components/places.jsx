// components/places.jsx
import React, { useState, useEffect } from "react";
import geoapifyService from "../services/geoapifyService";
import { PlaceDetails } from "./placeDetails";
import "./places.css";

export const PlacesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [beaches, setBeaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Set API key on mount
  useEffect(() => {
    const apiKey = '0ae4c931ec2448fd982a2f3af08c11d7';
    geoapifyService.setApiKey(apiKey);
  }, []);

  // Search for places as user types
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setError(null);

    if (value.length > 2) {
      try {
        const results = await geoapifyService.searchPlaces(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // When user selects a place from suggestions
  const handlePlaceSelect = async (place) => {
    setSearchQuery(place.properties.formatted);
    setShowSuggestions(false);
    setSuggestions([]);
    setError(null);

    // Fetch beaches for this place
    setIsLoading(true);
    try {
      const placeId = place.properties.place_id;
      const beachList = await geoapifyService.getBeachesForPlace(placeId);
      
      if (beachList.length === 0) {
        setError('No beaches found in this location. Try searching for a coastal area.');
      }
      
      setBeaches(beachList);
    } catch (err) {
      setError('Failed to fetch beaches. Please try again.');
      setBeaches([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Get Details button click
  const handleGetDetails = (beach) => {
    setSelectedPlace(beach);
    setShowDetails(true);
  };

  // Handle back to search
  const handleBackToSearch = () => {
    setShowDetails(false);
    setSelectedPlace(null);
  };

  // If showing details, render the details page
  if (showDetails) {
    return <PlaceDetails place={selectedPlace} onBack={handleBackToSearch} />;
  }

  return (
    <div id="places" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>
            <i className="fas fa-umbrella-beach"></i> Discover Beaches
          </h2>
          <p>Search for a location to find nearby beaches</p>
        </div>

        {/* Single Search Box with Autocomplete */}
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search for a city or location (e.g., Mumbai, Goa)"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-list">
                  {suggestions.map((place, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{place.properties.formatted}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="alert alert-info">
                <i className="fas fa-info-circle"></i> {error}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <p>Searching for beaches...</p>
              </div>
            </div>
          </div>
        )}

        {/* Beach Results */}
        <div className="row places-grid">
          {beaches.map((beach, index) => (
            <div key={index} className="col-md-6">
              <div className="place-item">
                <div className="place-header">
                  <h3>
                    <i className="fas fa-umbrella-beach"></i> {beach.name}
                  </h3>
                  <div className="location-badges">
                    {beach.city && (
                      <span className="location-badge">{beach.city}</span>
                    )}
                    {beach.state && (
                      <span className="location-badge">{beach.state}</span>
                    )}
                    <span className="location-badge">{beach.surface} beach</span>
                  </div>
                </div>

                <div className="place-info">
                  <div className="place-details">
                    <div className="detail-item">
                      <strong>📍 Address:</strong>
                      <span>{beach.address}</span>
                    </div>
                    <div className="detail-item">
                      <strong>🌍 Coordinates:</strong>
                      <span>
                        {beach.coordinates[1].toFixed(4)}, {beach.coordinates[0].toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="place-actions">
                    <button 
                      className="btn btn-custom btn-get-details"
                      onClick={() => handleGetDetails(beach)}
                    >
                      <i className="fas fa-info-circle"></i> Get Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {beaches.length === 0 && !isLoading && searchQuery && !showSuggestions && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No beaches found</h3>
                <p>Try searching for a coastal city or region</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Tips */}
        {beaches.length === 0 && !searchQuery && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="search-tips">
                <h3>🔍 Search Tips</h3>
                <ul>
                  <li>Try searching for coastal cities like "Mumbai", "Goa", or "Chennai"</li>
                  <li>You can also search for specific regions or areas</li>
                  <li>Select a location from the dropdown to see nearby beaches</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
