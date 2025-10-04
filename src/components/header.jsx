import React, { useState, useEffect } from "react";

export const Header = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherEmoji, setWeatherEmoji] = useState('☀️');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulate weather icon changes
    const weatherOptions = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-water', 'fas fa-cloud'];
    const weatherTimer = setInterval(() => {
      setWeatherEmoji(weatherOptions[Math.floor(Math.random() * weatherOptions.length)]);
    }, 5000);
    
    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  return (
    <header id="header" className="coastal-header">
      <div className="intro">
        <div className="animated-waves">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        <div className="overlay coastal-overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <div className="coastal-welcome">
                  <div className="live-info">
                    <span className="current-time">
                      <i className="far fa-clock"></i>
                      {currentTime.toLocaleTimeString()}
                    </span>
                    <span className="weather-preview">
                      <i className={weatherEmoji}></i>
                      Perfect Beach Day
                    </span>
                  </div>
                  <h1 className="coastal-title">
                    <div className="title-icon-container">
                      <i className="fas fa-water title-icon"></i>
                    </div>
                    CoastAlly
                    <div className="title-subtitle">Your Coastal Journey Begins Here</div>
                  </h1>
                  <div className="hero-description">
                    <p className="main-description">
                      Discover pristine beaches, get real-time coastal conditions, safety insights, 
                      and create unforgettable seaside memories with your ultimate coastal companion.
                    </p>
                    <div className="feature-highlights">
                      <div className="highlight-item">
                        <div className="highlight-icon">
                          <i className="fas fa-water"></i>
                        </div>
                        <span>Live Weather & Tides</span>
                      </div>
                      <div className="highlight-item">
                        <div className="highlight-icon">
                          <i className="fas fa-shield-alt"></i>
                        </div>
                        <span>Safety Insights</span>
                      </div>
                      <div className="highlight-item">
                        <div className="highlight-icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <span>Hidden Gems</span>
                      </div>
                    </div>
                  </div>
                  <div className="cta-buttons">
                    <button className="btn btn-coastal-primary btn-lg">
                      <i className="fas fa-rocket btn-icon"></i>
                      Start Your Adventure
                    </button>
                    <button className="btn btn-coastal-secondary btn-lg">
                      <i className="fas fa-mobile-alt btn-icon"></i>
                      Download App
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
