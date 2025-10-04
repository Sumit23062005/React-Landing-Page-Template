import React, { useState, useEffect } from "react";

export const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock weather data for coastal destinations
  const coastalWeatherData = [
    {
      location: "Malibu Beach",
      temperature: "24°C",
      condition: "Sunny",
      conditionColor: "#ff6b35",
      humidity: "65%",
      windSpeed: "12 km/h",
      uvIndex: "8",
      icon: "fas fa-sun"
    },
    {
      location: "Big Sur Coast",
      temperature: "19°C", 
      condition: "Partly Cloudy",
      conditionColor: "#4ea5d9",
      humidity: "70%",
      windSpeed: "18 km/h",
      uvIndex: "6",
      icon: "fas fa-cloud-sun"
    },
    {
      location: "Monterey Bay",
      temperature: "16°C",
      condition: "Foggy",
      conditionColor: "#6c757d",
      humidity: "85%",
      windSpeed: "8 km/h",
      uvIndex: "3",
      icon: "fas fa-smog"
    },
    {
      location: "Santa Barbara",
      temperature: "22°C",
      condition: "Clear",
      conditionColor: "#ffd60a",
      humidity: "60%",
      windSpeed: "15 km/h",
      uvIndex: "9",
      icon: "fas fa-sun"
    }
  ];

  const fetchWeatherData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const randomLocation = coastalWeatherData[Math.floor(Math.random() * coastalWeatherData.length)];
      setWeatherData(randomLocation);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="weather-hero" style={{ background: 'var(--ocean-gradient)' }}>
        <div className="container">
          <div className="weather-header">
            <h1 className="weather-title">
              <div className="weather-icon-header">
                <i className="fas fa-water"></i>
              </div>
              Coastal Weather
            </h1>
            <p className="weather-subtitle">Loading coastal conditions...</p>
          </div>
          <div className="weather-loading">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-hero" style={{ background: 'var(--ocean-gradient)' }}>
        <div className="container">
          <div className="weather-header">
            <h1 className="weather-title">
              <div className="weather-icon-header">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              Weather Unavailable
            </h1>
            <p className="weather-subtitle">Unable to load weather data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-hero" style={{ background: weatherData ? `linear-gradient(135deg, ${weatherData.conditionColor}20, ${weatherData.conditionColor}40)` : 'var(--ocean-gradient)' }}>
      <div className="container">
        <div className="weather-header">
          <h1 className="weather-title">
            <div className="weather-icon-header">
              <i className="fas fa-water"></i>
            </div>
            Coastal Weather
          </h1>
          <p className="weather-subtitle">Real-time conditions for your coastal adventure</p>
        </div>

        {weatherData && (
          <div className="weather-main">
            <div className="current-weather">
              <div className="weather-location">
                <div className="location-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h2>{weatherData.location}</h2>
              </div>
              
              <div className="weather-display">
                <div className="temperature-section">
                  <div className="weather-icon">
                    <i className={weatherData.icon}></i>
                  </div>
                  <div className="temperature">{weatherData.temperature}</div>
                  <div className="condition">{weatherData.condition}</div>
                </div>
                
                <div className="weather-details">
                  <div className="weather-detail-item">
                    <div className="detail-icon">
                      <i className="fas fa-tint"></i>
                    </div>
                    <div className="detail-info">
                      <span className="detail-label">Humidity</span>
                      <span className="detail-value">{weatherData.humidity}</span>
                    </div>
                  </div>
                  
                  <div className="weather-detail-item">
                    <div className="detail-icon">
                      <i className="fas fa-wind"></i>
                    </div>
                    <div className="detail-info">
                      <span className="detail-label">Wind Speed</span>
                      <span className="detail-value">{weatherData.windSpeed}</span>
                    </div>
                  </div>
                  
                  <div className="weather-detail-item">
                    <div className="detail-icon">
                      <i className="fas fa-sun"></i>
                    </div>
                    <div className="detail-info">
                      <span className="detail-label">UV Index</span>
                      <span className="detail-value">{weatherData.uvIndex}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="weather-actions">
              <button className="weather-refresh-btn" onClick={fetchWeatherData}>
                <i className="fas fa-sync-alt"></i>
                Refresh Weather
              </button>
            </div>
          </div>
        )}

        <div className="weather-forecast">
          <h3 className="forecast-title">
            <i className="fas fa-calendar-alt"></i>
            Perfect Coastal Days Ahead
          </h3>
          <div className="forecast-cards">
            {coastalWeatherData.slice(0, 3).map((day, index) => (
              <div key={index} className="forecast-card">
                <div className="forecast-location">{day.location}</div>
                <div className="forecast-icon">
                  <i className={day.icon}></i>
                </div>
                <div className="forecast-temp">{day.temperature}</div>
                <div className="forecast-condition">{day.condition}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="weather-tips">
          <h3 className="tips-title">
            <i className="fas fa-lightbulb"></i>
            Coastal Weather Tips
          </h3>
          <div className="weather-tips-grid">
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-umbrella-beach"></i>
              </div>
              <div className="tip-content">
                <h4>Beach Safety</h4>
                <p>Check UV levels before extended sun exposure</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-water"></i>
              </div>
              <div className="tip-content">
                <h4>Ocean Conditions</h4>
                <p>Monitor wind speeds for water activities</p>
              </div>
            </div>
            <div className="tip-item">
              <div className="tip-icon">
                <i className="fas fa-eye"></i>
              </div>
              <div className="tip-content">
                <h4>Visibility</h4>
                <p>Foggy conditions may affect coastal driving</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;