import React, { useState } from "react";

export const SentimentSection = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sentimentData, setSentimentData] = useState(null);
  const [userReview, setUserReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const sentimentAnalysisData = {
    'miami': {
      overall: 4.2,
      totalReviews: 15743,
      categories: {
        cleanliness: { score: 3.8, reviews: 2341, trend: "improving" },
        safety: { score: 4.1, reviews: 1876, trend: "stable" },
        facilities: { score: 4.5, reviews: 3210, trend: "improving" },
        crowd: { score: 3.6, reviews: 1987, trend: "declining" },
        value: { score: 4.0, reviews: 2156, trend: "stable" }
      },
      recentFeedback: [
        { 
          sentiment: "positive", 
          text: "Beautiful beach with great facilities! The new beach cleanup initiative is working well.",
          category: "cleanliness",
          date: "2024-09-20"
        },
        { 
          sentiment: "negative", 
          text: "Very crowded during weekends, hard to find a good spot on the beach.",
          category: "crowd",
          date: "2024-09-19"
        },
        { 
          sentiment: "positive", 
          text: "Lifeguards are very professional and safety measures are excellent.",
          category: "safety",
          date: "2024-09-18"
        }
      ],
      cleanlinessData: {
        beachCleanliness: 4.1,
        waterQuality: 4.3,
        facilities: 3.9,
        maintenance: 3.7
      }
    },
    'malibu': {
      overall: 4.6,
      totalReviews: 8934,
      categories: {
        cleanliness: { score: 4.7, reviews: 1234, trend: "stable" },
        safety: { score: 4.4, reviews: 987, trend: "improving" },
        facilities: { score: 4.2, reviews: 1456, trend: "stable" },
        crowd: { score: 4.8, reviews: 1123, trend: "stable" },
        value: { score: 4.3, reviews: 1089, trend: "stable" }
      },
      recentFeedback: [
        { 
          sentiment: "positive", 
          text: "Pristine beaches with excellent water quality. Perfect for a peaceful getaway.",
          category: "cleanliness",
          date: "2024-09-21"
        },
        { 
          sentiment: "positive", 
          text: "Great hiking trails and beautiful scenery. Well-maintained paths.",
          category: "facilities",
          date: "2024-09-20"
        }
      ],
      cleanlinessData: {
        beachCleanliness: 4.8,
        waterQuality: 4.9,
        facilities: 4.5,
        maintenance: 4.6
      }
    },
    'virginia': {
      overall: 4.0,
      totalReviews: 12456,
      categories: {
        cleanliness: { score: 3.9, reviews: 1876, trend: "improving" },
        safety: { score: 4.3, reviews: 1654, trend: "stable" },
        facilities: { score: 4.2, reviews: 2341, trend: "improving" },
        crowd: { score: 3.7, reviews: 1987, trend: "stable" },
        value: { score: 4.4, reviews: 2234, trend: "improving" }
      },
      recentFeedback: [
        { 
          sentiment: "positive", 
          text: "Great family destination with excellent boardwalk and activities for kids.",
          category: "facilities",
          date: "2024-09-21"
        },
        { 
          sentiment: "neutral", 
          text: "Beach is okay, can get crowded during peak season but still enjoyable.",
          category: "crowd",
          date: "2024-09-19"
        }
      ],
      cleanlinessData: {
        beachCleanliness: 4.0,
        waterQuality: 4.1,
        facilities: 3.8,
        maintenance: 3.9
      }
    }
  };

  const analyzeSentiment = () => {
    if (!selectedLocation) return;
    
    const data = sentimentAnalysisData[selectedLocation];
    if (data) {
      setSentimentData(data);
    }
  };

  const submitReview = () => {
    if (!userReview.trim()) return;
    
    // Simulate sentiment analysis
    const words = userReview.toLowerCase();
    let sentiment = 'neutral';
    
    const positiveWords = ['great', 'excellent', 'beautiful', 'amazing', 'love', 'perfect', 'clean', 'safe'];
    const negativeWords = ['bad', 'terrible', 'dirty', 'crowded', 'expensive', 'poor', 'awful'];
    
    const positiveCount = positiveWords.filter(word => words.includes(word)).length;
    const negativeCount = negativeWords.filter(word => words.includes(word)).length;
    
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    alert(`Thank you for your review! Detected sentiment: ${sentiment}`);
    setUserReview('');
    setShowReviewForm(false);
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positive': return '#28a745';
      case 'negative': return '#dc3545';
      case 'neutral': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➖';
      default: return '➖';
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

  const getLocationName = (key) => {
    switch(key) {
      case 'miami': return 'Miami Beach, FL';
      case 'malibu': return 'Malibu, CA';
      case 'virginia': return 'Virginia Beach, VA';
      default: return key;
    }
  };

  return (
    <div id="sentiment" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>📊 Visitor Sentiment & Cleanliness Analysis</h2>
          <p>Real-time analysis of visitor reviews and cleanliness ratings</p>
        </div>
        
        <div className="row search-section">
          <div className="col-md-6 col-md-offset-3">
            <div className="sentiment-controls">
              <select 
                className="form-control" 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={{marginBottom: '15px'}}
              >
                <option value="">Select Location for Analysis...</option>
                <option value="miami">Miami Beach, FL</option>
                <option value="malibu">Malibu, CA</option>
                <option value="virginia">Virginia Beach, VA</option>
              </select>
              <button 
                className="btn btn-custom" 
                onClick={analyzeSentiment}
                disabled={!selectedLocation}
              >
                Analyze Sentiment
              </button>
            </div>
          </div>
        </div>

        {sentimentData && (
          <div className="row sentiment-results">
            <div className="col-md-10 col-md-offset-1">
              <div className="sentiment-overview">
                <h3>
                  <i className="fas fa-map-marker-alt"></i>
                  {getLocationName(selectedLocation)} - Sentiment Analysis
                </h3>
                
                <div className="overall-rating">
                  <div className="rating-display">
                    <h4>Overall Rating</h4>
                    <div className="rating-value">
                      {renderStars(sentimentData.overall)}
                      <span className="rating-number">({sentimentData.overall}/5)</span>
                    </div>
                    <p>Based on {sentimentData.totalReviews.toLocaleString()} reviews</p>
                  </div>
                </div>

                <div className="category-breakdown">
                  <h4>
                    <i className="fas fa-clipboard-list"></i>
                    Category Breakdown
                  </h4>
                  <div className="row">
                    {Object.entries(sentimentData.categories).map(([category, data], index) => (
                      <div key={index} className="col-md-4 category-item">
                        <div className="category-card">
                          <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                          <div className="category-score">
                            {renderStars(data.score)}
                            <span className="score-number">({data.score}/5)</span>
                          </div>
                          <p>{data.reviews} reviews</p>
                          <div className="trend">
                            {getTrendIcon(data.trend)} {data.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cleanliness-details">
                  <h4>🧹 Cleanliness Breakdown</h4>
                  <div className="row">
                    {Object.entries(sentimentData.cleanlinessData).map(([aspect, score], index) => (
                      <div key={index} className="col-md-3">
                        <div className="cleanliness-item">
                          <h5>{aspect.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{
                                width: `${(score/5) * 100}%`,
                                backgroundColor: score >= 4 ? '#28a745' : score >= 3 ? '#ffc107' : '#dc3545'
                              }}
                            ></div>
                          </div>
                          <span className="score-text">{score}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recent-feedback">
                  <h4>💬 Recent Visitor Feedback</h4>
                  <div className="feedback-list">
                    {sentimentData.recentFeedback.map((feedback, index) => (
                      <div key={index} className="feedback-item">
                        <div className="feedback-header">
                          <span 
                            className="sentiment-badge"
                            style={{backgroundColor: getSentimentColor(feedback.sentiment)}}
                          >
                            {feedback.sentiment.toUpperCase()}
                          </span>
                          <span className="feedback-category">{feedback.category}</span>
                          <span className="feedback-date">{feedback.date}</span>
                        </div>
                        <p className="feedback-text">"{feedback.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="user-review-section">
                  <h4>✍️ Share Your Experience</h4>
                  {!showReviewForm ? (
                    <button 
                      className="btn btn-custom-outline"
                      onClick={() => setShowReviewForm(true)}
                    >
                      Write a Review
                    </button>
                  ) : (
                    <div className="review-form">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Share your experience about this location..."
                        value={userReview}
                        onChange={(e) => setUserReview(e.target.value)}
                      ></textarea>
                      <div className="review-actions">
                        <button 
                          className="btn btn-custom"
                          onClick={submitReview}
                        >
                          Submit Review
                        </button>
                        <button 
                          className="btn btn-default"
                          onClick={() => {
                            setShowReviewForm(false);
                            setUserReview('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row sentiment-info">
          <div className="col-md-8 col-md-offset-2">
            <div className="info-section">
              <h3>📈 How Our Analysis Works</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="info-list">
                    <li>🔍 Real-time review analysis</li>
                    <li>🤖 AI-powered sentiment detection</li>
                    <li>📊 Trending sentiment tracking</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="info-list">
                    <li>🧹 Cleanliness monitoring</li>
                    <li><i className="fas fa-star"></i> Multi-category rating system</li>
                    <li>📱 Crowd-sourced data</li>
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