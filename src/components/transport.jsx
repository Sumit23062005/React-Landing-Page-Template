import React, { useState } from "react";

export const TransportSection = (props) => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [transportType, setTransportType] = useState('');
  const [routeInfo, setRouteInfo] = useState(null);

  const transportData = {
    'miami': {
      'car': {
        parking: {
          beachParking: "$3/hour, $15/day",
          garageParking: "$5/hour, $25/day",
          streetParking: "Limited, 2-hour zones"
        },
        tips: [
          "Heavy traffic during peak hours",
          "Valet parking available at hotels",
          "Beach parking fills up early on weekends"
        ]
      },
      'public': {
        options: [
          {
            type: "Miami Beach Trolley",
            cost: "Free",
            routes: ["Collins Avenue", "Alton Road", "Washington Avenue"],
            frequency: "Every 15-20 minutes"
          },
          {
            type: "Metrobus",
            cost: "$2.25 per ride",
            routes: ["Route 120 (Airport)", "Route S (South Beach)"],
            frequency: "Every 30 minutes"
          }
        ],
        tips: [
          "Trolley is free and covers main beach areas",
          "Get EASY card for discounted rides",
          "Limited late-night service"
        ]
      },
      'ride': {
        options: ["Uber", "Lyft", "Taxi"],
        estimatedCosts: {
          "Airport to South Beach": "$25-35",
          "Downtown to Beach": "$15-25",
          "Within Beach area": "$8-15"
        },
        tips: [
          "Surge pricing during peak times",
          "Pool rides available for savings",
          "Pickup points designated in busy areas"
        ]
      }
    },
    'malibu': {
      'car': {
        parking: {
          beachParking: "Free at most beaches",
          paidParking: "$5-10/day at popular spots",
          streetParking: "Limited on PCH"
        },
        tips: [
          "Pacific Coast Highway can be slow",
          "Limited parking at popular beaches",
          "Weekend traffic is heavy"
        ]
      },
      'public': {
        options: [
          {
            type: "Metro Bus Line 534",
            cost: "$1.75 per ride",
            routes: ["Santa Monica to Malibu"],
            frequency: "Every hour"
          }
        ],
        tips: [
          "Limited public transport options",
          "Bus service less frequent on weekends",
          "Plan extra time for connections"
        ]
      },
      'ride': {
        options: ["Uber", "Lyft"],
        estimatedCosts: {
          "LAX to Malibu": "$60-80",
          "Santa Monica to Malibu": "$25-35",
          "Within Malibu": "$15-25"
        },
        tips: [
          "Higher costs due to distance",
          "Limited driver availability",
          "Book in advance for airport trips"
        ]
      }
    },
    'virginia': {
      'car': {
        parking: {
          beachParking: "$5/day city lots",
          meterParking: "$1.50/hour",
          hotelParking: "Free at most hotels"
        },
        tips: [
          "Traffic heavy during summer",
          "Free parking further from beach",
          "Many hotels offer free parking"
        ]
      },
      'public': {
        options: [
          {
            type: "HRT Bus",
            cost: "$2.00 per ride",
            routes: ["Route 20 (Oceanfront)", "Route 30 (Norfolk)"],
            frequency: "Every 30 minutes"
          },
          {
            type: "Wave Trolley",
            cost: "$2.00 per ride",
            routes: ["Oceanfront area"],
            frequency: "Every 30 minutes"
          }
        ],
        tips: [
          "Wave trolley covers main tourist areas",
          "Day passes available",
          "Reduced winter service"
        ]
      },
      'ride': {
        options: ["Uber", "Lyft", "Taxi"],
        estimatedCosts: {
          "Airport to Beach": "$20-30",
          "Norfolk to Beach": "$25-35",
          "Within Beach area": "$8-15"
        },
        tips: [
          "More affordable than other beach cities",
          "Good driver availability",
          "Airport shuttle services available"
        ]
      }
    }
  };

  const getRouteInfo = () => {
    if (!selectedRoute || !transportType) return;
    
    const locationData = transportData[selectedRoute];
    if (locationData && locationData[transportType]) {
      setRouteInfo({
        location: selectedRoute,
        type: transportType,
        data: locationData[transportType]
      });
    }
  };

  const getLocationName = (key) => {
    switch(key) {
      case 'miami': return 'Miami Beach, FL';
      case 'malibu': return 'Malibu, CA';
      case 'virginia': return 'Virginia Beach, VA';
      default: return key;
    }
  };

  const getTransportIcon = (type) => {
    switch(type) {
      case 'car': return <i className="fas fa-car"></i>;
      case 'public': return '🚌';
      case 'ride': return '🚕';
      default: return <i className="fas fa-car"></i>;
    }
  };

  return (
    <div id="transport" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>
            <div className="section-icon">
              <i className="fas fa-car"></i>
            </div>
            Transportation Guide
          </h2>
          <p>Get around coastal areas with ease - parking, public transit, and ride options</p>
        </div>
        
        <div className="row search-section">
          <div className="col-md-4">
            <select 
              className="form-control" 
              value={selectedRoute} 
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">Select Destination...</option>
              <option value="miami">Miami Beach, FL</option>
              <option value="malibu">Malibu, CA</option>
              <option value="virginia">Virginia Beach, VA</option>
            </select>
          </div>
          <div className="col-md-4">
            <select 
              className="form-control" 
              value={transportType} 
              onChange={(e) => setTransportType(e.target.value)}
            >
              <option value="">Transportation Type...</option>
              <option value="car">Driving & Parking</option>
              <option value="public">🚌 Public Transit</option>
              <option value="ride">🚕 Rideshare & Taxi</option>
            </select>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-custom" 
              onClick={getRouteInfo}
              disabled={!selectedRoute || !transportType}
            >
              Get Transport Info
            </button>
          </div>
        </div>

        {routeInfo && (
          <div className="row transport-info">
            <div className="col-md-10 col-md-offset-1">
              <div className="transport-details">
                <h3>
                  {getTransportIcon(routeInfo.type)} {getLocationName(routeInfo.location)} Transportation
                </h3>
                
                {routeInfo.type === 'car' && (
                  <div className="car-info">
                    <div className="parking-info">
                      <h4>🅿️ Parking Information</h4>
                      <div className="row">
                        {Object.entries(routeInfo.data.parking).map(([key, value], index) => (
                          <div key={index} className="col-md-4">
                            <div className="parking-option">
                              <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                              <p>{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {routeInfo.type === 'public' && (
                  <div className="public-info">
                    <h4>🚌 Public Transit Options</h4>
                    <div className="transit-options">
                      {routeInfo.data.options.map((option, index) => (
                        <div key={index} className="transit-option">
                          <h5>{option.type}</h5>
                          <div className="option-details">
                            <p><strong>Cost:</strong> {option.cost}</p>
                            <p><strong>Frequency:</strong> {option.frequency}</p>
                            <div className="routes">
                              <strong>Routes:</strong>
                              {option.routes.map((route, i) => (
                                <span key={i} className="route-tag">{route}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {routeInfo.type === 'ride' && (
                  <div className="ride-info">
                    <h4>🚕 Rideshare & Taxi</h4>
                    <div className="ride-options">
                      <div className="available-services">
                        <strong>Available Services:</strong>
                        {routeInfo.data.options.map((service, i) => (
                          <span key={i} className="service-tag">{service}</span>
                        ))}
                      </div>
                      
                      <div className="estimated-costs">
                        <h5>💰 Estimated Costs</h5>
                        {Object.entries(routeInfo.data.estimatedCosts).map(([route, cost], index) => (
                          <div key={index} className="cost-item">
                            <strong>{route}:</strong> {cost}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="transport-tips">
                  <h4>💡 Helpful Tips</h4>
                  <ul>
                    {routeInfo.data.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row general-transport-tips">
          <div className="col-md-8 col-md-offset-2">
            <div className="general-tips">
              <h3>🗺️ General Transportation Tips</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li>🕐 Plan for peak hour delays</li>
                    <li>📱 Download transit apps</li>
                    <li>💳 Keep cash for parking meters</li>
                    <li>🚴 Consider bike rentals for short trips</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="tips-list">
                    <li><i className="fas fa-hotel"></i> Check if hotel offers shuttles</li>
                    <li>🅿️ Book parking in advance when possible</li>
                    <li>🚶 Walking is often faster in crowded areas</li>
                    <li><i className="fas fa-map-marker-alt"></i> Use GPS apps for real-time traffic</li>
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