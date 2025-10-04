import React, { useState } from 'react';
import geoapifyService from '../services/geoapifyService';

// Example component showing how to use the Geoapify API with coordinates
export const BeachSearchExample = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 18.5,
    lon: 73.85
  });

  const searchNearbyBeaches = async () => {
    setLoading(true);
    try {
      // Set your API key first
      geoapifyService.setApiKey('YOUR_API_KEY'); // Replace with your actual API key
      
      // Search for beaches within 5km of the coordinates
      const beaches = await geoapifyService.searchBeachesByCoords(
        coordinates.lat, 
        coordinates.lon, 
        5000, // 5km radius
        10 // limit to 10 results
      );
      
      setResults(beaches);
      console.log('Found beaches:', beaches);
    } catch (error) {
      console.error('Error searching beaches:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>🏖️ Beach Search Example</h3>
      <p>Search for beaches near specific coordinates using the Geoapify API</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Latitude: 
          <input 
            type="number" 
            step="0.000001"
            value={coordinates.lat} 
            onChange={(e) => setCoordinates({...coordinates, lat: parseFloat(e.target.value)})}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <label style={{ marginLeft: '20px' }}>
          Longitude: 
          <input 
            type="number" 
            step="0.000001"
            value={coordinates.lon} 
            onChange={(e) => setCoordinates({...coordinates, lon: parseFloat(e.target.value)})}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button 
          onClick={searchNearbyBeaches} 
          disabled={loading}
          style={{ 
            marginLeft: '20px', 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : 'Search Beaches'}
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h4>Found {results.length} beaches:</h4>
          {results.map((beach, index) => (
            <div key={index} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h5>🏖️ {beach.name}</h5>
              <p><strong>Address:</strong> {beach.address}</p>
              <p><strong>Rating:</strong> ⭐ {beach.rating}/5</p>
              <p><strong>Description:</strong> {beach.description}</p>
              <p><strong>Coordinates:</strong> {beach.coordinates[1]}, {beach.coordinates[0]}</p>
              {beach.distance && <p><strong>Distance:</strong> {Math.round(beach.distance)}m away</p>}
              
              <div style={{ marginTop: '10px' }}>
                <strong>Highlights:</strong>
                {beach.highlights.map((highlight, i) => (
                  <span key={i} style={{ 
                    background: '#e3f2fd', 
                    padding: '2px 8px', 
                    margin: '2px', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    display: 'inline-block'
                  }}>
                    {highlight}
                  </span>
                ))}
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <strong>Activities:</strong>
                {beach.activities.map((activity, i) => (
                  <span key={i} style={{ 
                    background: '#e8f5e8', 
                    padding: '2px 8px', 
                    margin: '2px', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    display: 'inline-block'
                  }}>
                    {activity}
                  </span>
                ))}
              </div>

              {(beach.contact?.website || beach.contact?.phone) && (
                <div style={{ marginTop: '10px' }}>
                  {beach.contact.website && (
                    <a href={beach.contact.website} target="_blank" rel="noopener noreferrer" 
                       style={{ marginRight: '10px', color: '#007bff' }}>
                      🌐 Website
                    </a>
                  )}
                  {beach.contact.phone && (
                    <a href={`tel:${beach.contact.phone}`} style={{ color: '#007bff' }}>
                      📞 {beach.contact.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h4>📝 API Usage Notes:</h4>
        <ul>
          <li>Replace 'YOUR_API_KEY' with your actual Geoapify API key</li>
          <li>Get your free API key from: <a href="https://www.geoapify.com/" target="_blank" rel="noopener noreferrer">geoapify.com</a></li>
          <li>Free tier includes 3000 requests per day</li>
          <li>The coordinates above are set to the area from your provided API URL</li>
          <li>You can adjust the search radius (currently 5km) and result limit</li>
        </ul>
      </div>
    </div>
  );
};

export default BeachSearchExample;