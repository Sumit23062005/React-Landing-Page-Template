import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Weather } from "./components/weather";
import { SafetyRecommendations } from "./components/safety";
import { HotelsSection } from "./components/hotels";
import { DayPlanSection } from "./components/dayplan";
import { RestaurantsSection } from "./components/restaurants";
import { PlacesSection } from "./components/places";
import { AuthSection } from "./components/auth";
import { TransportSection } from "./components/transport";
import { SentimentSection } from "./components/sentiment";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [appData, setAppData] = useState({});
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  useEffect(() => {
    setAppData(JsonData);
    // Check for existing user session
    const savedUser = localStorage.getItem('coastAllyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="page-content">
            <Header data={appData.Header} />
            <div className="home-sections">
              <section className="featured-section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="feature-card weather-preview" onClick={() => setCurrentPage('weather')}>
                        <div className="feature-icon">
                          <i className="fas fa-cloud-sun"></i>
                        </div>
                        <h3>Live Weather</h3>
                        <p>Real-time coastal weather updates</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="feature-card safety-preview" onClick={() => setCurrentPage('safety')}>
                        <div className="feature-icon">
                          <i className="fas fa-shield-alt"></i>
                        </div>
                        <h3>Safety First</h3>
                        <p>Comprehensive safety recommendations</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="feature-card hotels-preview" onClick={() => setCurrentPage('hotels')}>
                        <div className="feature-icon">
                          <i className="fas fa-hotel"></i>
                        </div>
                        <h3>Dream Stays</h3>
                        <p>Beachfront accommodations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case 'weather':
        return <Weather data={appData.Weather} />;
      case 'safety':
        return <SafetyRecommendations data={appData.Safety} />;
      case 'hotels':
        return <HotelsSection data={appData.Hotels} />;
      case 'dayplan':
        return <DayPlanSection data={appData.DayPlan} />;
      case 'restaurants':
        return <RestaurantsSection data={appData.Restaurants} />;
      case 'places':
        return <PlacesSection data={appData.Places} />;
      case 'transport':
        return <TransportSection data={appData.Transport} />;
      case 'sentiment':
        return <SentimentSection data={appData.Sentiment} />;
      case 'auth':
        return <AuthSection user={user} setUser={setUser} />;
      case 'contact':
        return <Contact data={appData.Contact} />;
      default:
        return <Header data={appData.Header} />;
    }
  };

  return (
    <div className="coastal-app">
      <Navigation user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="coastal-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; 2025 CoastAlly. Your trusted coastal companion.</p>
            </div>
            <div className="col-md-6 text-right">
              <div className="social-links">
                <a href="#" className="social-link">🌊</a>
                <a href="#" className="social-link">📱</a>
                <a href="#" className="social-link">📧</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
