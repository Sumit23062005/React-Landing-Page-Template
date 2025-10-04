import React, { useState } from "react";

export const SafetyRecommendations = (props) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const safetyData = {
    2024: [
      {
        location: "Miami Beach, FL",
        incidents: 12,
        warnings: ["Strong rip currents", "Jellyfish presence increased"],
        rating: "Moderate",
        recommendations: ["Swim near lifeguards", "Check daily beach conditions"]
      },
      {
        location: "Malibu, CA",
        incidents: 8,
        warnings: ["Rocky areas", "Strong waves during high tide"],
        rating: "Good",
        recommendations: ["Avoid isolated areas", "Wear proper footwear"]
      },
      {
        location: "Virginia Beach, VA",
        incidents: 15,
        warnings: ["Seasonal strong currents", "Marine life encounters"],
        rating: "Moderate",
        recommendations: ["Follow lifeguard instructions", "Stay in designated areas"]
      }
    ],
    2023: [
      {
        location: "Miami Beach, FL",
        incidents: 18,
        warnings: ["Hurricane season impacts", "Increased rip currents"],
        rating: "High Risk",
        recommendations: ["Extra caution during storms", "Monitor weather alerts"]
      },
      {
        location: "Malibu, CA",
        incidents: 6,
        warnings: ["Occasional strong waves"],
        rating: "Good",
        recommendations: ["Standard safety precautions"]
      }
    ],
    2022: [
      {
        location: "Miami Beach, FL",
        incidents: 14,
        warnings: ["Seasonal jellyfish", "Moderate rip currents"],
        rating: "Moderate",
        recommendations: ["Beach safety awareness", "First aid knowledge helpful"]
      }
    ]
  };

  const getRatingColor = (rating) => {
    switch(rating.toLowerCase()) {
      case 'good': return '#28a745';
      case 'moderate': return '#ffc107';
      case 'high risk': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div id="safety" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            <div className="section-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            Safety Recommendations
          </h2>
          <p>Safety data and recommendations for coastal areas over the past 3 years</p>
        </div>
        
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="year-selector">
              <label>Select Year:</label>
              <select 
                className="form-control" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row safety-data">
          {safetyData[selectedYear] && safetyData[selectedYear].map((item, index) => (
            <div key={index} className="col-md-4 safety-card">
              <div className="safety-item">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>
                  {item.location}
                </h3>
                <div className="safety-rating" style={{backgroundColor: getRatingColor(item.rating)}}>
                  <strong>{item.rating}</strong>
                </div>
                <div className="incident-count">
                  <p><strong>📊 Incidents in {selectedYear}: {item.incidents}</strong></p>
                </div>
                
                <div className="warnings">
                  <h4>⚠️ Current Warnings:</h4>
                  <ul>
                    {item.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>

                <div className="recommendations">
                  <h4>💡 Recommendations:</h4>
                  <ul>
                    {item.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row general-safety">
          <div className="col-md-8 col-md-offset-2">
            <div className="general-tips">
              <h3>
                <i className="fas fa-umbrella-beach"></i>
                General Coastal Safety Tips
              </h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="safety-list">
                    <li><i className="fas fa-swimmer"></i> Always swim near lifeguards</li>
                    <li><i className="fas fa-water"></i> Check tide conditions before entering water</li>
                    <li><i className="fas fa-sun"></i> Use sunscreen SPF 30+ and reapply frequently</li>
                    <li><i className="fas fa-exclamation-triangle"></i> Know how to identify rip currents</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="safety-list">
                    <li><i className="fas fa-mobile-alt"></i> Keep emergency contacts handy</li>
                    <li><i className="fas fa-users"></i> Never swim alone</li>
                    <li><i className="fas fa-thermometer-half"></i> Stay hydrated and take breaks</li>
                    <li><i className="fas fa-fish"></i> Be aware of local marine life</li>
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