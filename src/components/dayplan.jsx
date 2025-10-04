import React, { useState } from "react";

export const DayPlanSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const dayPlans = {
    'miami-1day': {
      title: "Miami Beach - 1 Day Adventure",
      activities: [
        {
          time: "8:00 AM",
          activity: "Sunrise at South Beach",
          icon: "fas fa-sunrise",
          icon: "fas fa-sunrise",
          duration: "1 hour",
          description: "Watch the beautiful sunrise over the Atlantic Ocean"
        },
        {
          time: "9:30 AM",
          activity: "Breakfast at Ocean Drive",
          icon: "fas fa-coffee",
          duration: "1 hour",
          description: "Enjoy breakfast with ocean views"
        },
        {
          time: "11:00 AM",
          activity: "Beach Time & Swimming",
          icon: "fas fa-umbrella-beach",
          duration: "3 hours",
          description: "Relax on the beach, swim, and sunbathe"
        },
        {
          time: "2:00 PM",
          activity: "Art Deco Walk",
          icon: "fas fa-walking",
          duration: "2 hours",
          description: "Explore the famous Art Deco architecture"
        },
        {
          time: "5:00 PM",
          activity: "Sunset Cocktails",
          icon: "fas fa-cocktail",
          duration: "2 hours",
          description: "Enjoy drinks with sunset views"
        },
        {
          time: "8:00 PM",
          activity: "🦞 Seafood Dinner",
          duration: "2 hours",
          description: "Fresh seafood at a beachfront restaurant"
        }
      ],
      tips: [
        "Bring sunscreen SPF 30+",
        "Stay hydrated",
        "Wear comfortable walking shoes",
        "Check tide times for best swimming"
      ]
    },
    'malibu-1day': {
      title: "Malibu - 1 Day Coastal Experience",
      activities: [
        {
          time: "9:00 AM",
          activity: "Malibu Pier Walk",
          icon: "fas fa-water",
          duration: "1 hour",
          description: "Stroll along the historic Malibu Pier"
        },
        {
          time: "10:30 AM",
          activity: "🏄 Surfing or Beach Activities",
          duration: "2.5 hours",
          description: "Try surfing or enjoy beach volleyball"
        },
        {
          time: "1:00 PM",
          activity: "🥗 Healthy Lunch",
          duration: "1 hour",
          description: "Fresh California cuisine with ocean views"
        },
        {
          time: "2:30 PM",
          activity: "🎭 Getty Villa Visit",
          duration: "2 hours",
          description: "Explore ancient art and beautiful gardens"
        },
        {
          time: "5:00 PM",
          activity: "📸 Point Dume Hiking",
          duration: "1.5 hours",
          description: "Hike for stunning coastal views"
        },
        {
          time: "7:00 PM",
          activity: "Sunset Dinner",
          icon: "fas fa-sunset",
          duration: "2 hours",
          description: "Romantic dinner watching the sunset"
        }
      ],
      tips: [
        "Bring layers - can get windy",
        "Good hiking shoes recommended",
        "Camera for scenic views",
        "Check surf conditions if surfing"
      ]
    },
    'miami-3day': {
      title: "Miami Beach - 3 Day Complete Experience",
      days: [
        {
          day: 1,
          theme: "Beach & Culture",
          activities: [
            "Sunrise yoga on beach",
            "Beach relaxation",
            "Wynwood Walls art tour",
            "Cuban dinner in Little Havana"
          ]
        },
        {
          day: 2,
          theme: "Water Adventures",
          activities: [
            "🚤 Boat tour to Key Biscayne",
            "🤿 Snorkeling adventure",
            "Beach picnic",
            "Nightlife in South Beach"
          ]
        },
        {
          day: 3,
          theme: "Exploration & Relaxation",
          activities: [
            "Everglades day trip",
            "🛍️ Lincoln Road shopping",
            "💆 Spa treatment",
            "🦞 Final seafood feast"
          ]
        }
      ],
      tips: [
        "Book boat tours in advance",
        "Rent a car for Everglades trip",
        "Make dinner reservations",
        "Pack snorkeling gear or rent locally"
      ]
    }
  };

  const generatePlan = () => {
    const key = `${selectedLocation}-${selectedDuration}`;
    const plan = dayPlans[key];
    
    if (plan) {
      setGeneratedPlan(plan);
    } else {
      setGeneratedPlan({
        title: "Custom Plan Coming Soon!",
        message: "We're working on more customized plans for this combination."
      });
    }
  };

  return (
    <div id="dayplan" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>📅 Day Plan Generator</h2>
          <p>Get personalized daily itineraries for your coastal adventure</p>
        </div>
        
        <div className="row plan-generator">
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
              value={selectedDuration} 
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              <option value="">Select Duration...</option>
              <option value="1day">1 Day</option>
              <option value="3day">3 Days</option>
              <option value="week">1 Week</option>
            </select>
          </div>
          <div className="col-md-4">
            <button 
              className="btn btn-custom" 
              onClick={generatePlan}
              disabled={!selectedLocation || !selectedDuration}
            >
              Generate Plan
            </button>
          </div>
        </div>

        {generatedPlan && (
          <div className="row generated-plan">
            <div className="col-md-10 col-md-offset-1">
              <div className="plan-container">
                <h3>{generatedPlan.title}</h3>
                
                {generatedPlan.activities && (
                  <div className="day-schedule">
                    <h4>
                      <i className="fas fa-clipboard-list"></i>
                      Your Schedule
                    </h4>
                    <div className="activities-list">
                      {generatedPlan.activities.map((activity, index) => (
                        <div key={index} className="activity-item">
                          <div className="activity-time">
                            <strong>{activity.time}</strong>
                          </div>
                          <div className="activity-content">
                            <h5>{activity.activity}</h5>
                            <p>{activity.description}</p>
                            <small>Duration: {activity.duration}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedPlan.days && (
                  <div className="multi-day-plan">
                    {generatedPlan.days.map((day, index) => (
                      <div key={index} className="day-plan">
                        <h4>Day {day.day}: {day.theme}</h4>
                        <ul className="day-activities">
                          {day.activities.map((activity, i) => (
                            <li key={i}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {generatedPlan.tips && (
                  <div className="plan-tips">
                    <h4>💡 Helpful Tips</h4>
                    <ul>
                      {generatedPlan.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {generatedPlan.message && (
                  <div className="custom-message">
                    <p>{generatedPlan.message}</p>
                  </div>
                )}

                <div className="plan-actions">
                  <button className="btn btn-custom">💾 Save Plan</button>
                  <button className="btn btn-custom-outline">📤 Share Plan</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};