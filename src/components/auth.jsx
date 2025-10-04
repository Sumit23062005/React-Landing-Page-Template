import React, { useState } from "react";

export const AuthSection = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        setMessage('Password must be at least 6 characters!');
        return;
      }
    }

    // Simulate authentication
    if (isLogin) {
      // Login simulation
      if (formData.email && formData.password) {
        const userData = {
          name: formData.email.split('@')[0],
          email: formData.email,
          joinDate: new Date().toISOString(),
          preferences: {
            favoriteLocations: [],
            savedPlans: [],
            notifications: true
          }
        };
        
        localStorage.setItem('coastAllyUser', JSON.stringify(userData));
        setUser(userData);
        setMessage('Login successful! Welcome to CoastAlly!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setMessage('Please fill in all fields!');
      }
    } else {
      // Signup simulation
      if (formData.name && formData.email && formData.password) {
        const userData = {
          name: formData.name,
          email: formData.email,
          joinDate: new Date().toISOString(),
          preferences: {
            favoriteLocations: [],
            savedPlans: [],
            notifications: true
          }
        };
        
        localStorage.setItem('coastAllyUser', JSON.stringify(userData));
        setUser(userData);
        setMessage('Account created successfully! Welcome to CoastAlly!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setMessage('Please fill in all fields!');
      }
    }
  };

  if (user) {
    return (
      <div id="auth" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>👤 User Profile</h2>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="user-profile">
                <div className="profile-header">
                  <h3>Welcome back, {user.name}! 👋</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="join-date">
                    Member since: {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="profile-stats">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="stat-item">
                        <h4>
                          <i className="fas fa-map-marker-alt"></i>
                          Saved Places
                        </h4>
                        <p className="stat-number">
                          {user.preferences?.favoriteLocations?.length || 0}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-item">
                        <h4>📅 Saved Plans</h4>
                        <p className="stat-number">
                          {user.preferences?.savedPlans?.length || 0}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-item">
                        <h4>🏆 Level</h4>
                        <p className="stat-number">Explorer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-features">
                  <h4>
                    <i className="fas fa-bullseye"></i>
                    Your CoastAlly Benefits
                  </h4>
                  <div className="benefits-list">
                    <div className="benefit-item">
                      ✅ Personalized recommendations
                    </div>
                    <div className="benefit-item">
                      ✅ Save favorite places and plans
                    </div>
                    <div className="benefit-item">
                      ✅ Weather alerts for saved locations
                    </div>
                    <div className="benefit-item">
                      ✅ Exclusive member discounts
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="btn btn-custom">Edit Profile</button>
                  <button className="btn btn-custom-outline">View Saved Items</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="auth" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>🔐 Join CoastAlly</h2>
          <p>Create your account to save preferences and get personalized recommendations</p>
        </div>
        
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="auth-container">
              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${isLogin ? 'active' : ''}`}
                  onClick={() => {
                    setIsLogin(true);
                    setMessage('');
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                >
                  Login
                </button>
                <button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => {
                    setIsLogin(false);
                    setMessage('');
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                
                <button type="submit" className="btn btn-custom">
                  {isLogin ? 'Login' : 'Create Account'}
                </button>
              </form>

              {message && (
                <div className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="auth-benefits">
                <h4>
                  <i className="fas fa-star"></i>
                  Why Join CoastAlly?
                </h4>
                <ul className="benefits-list">
                  <li>💾 Save your favorite coastal destinations</li>
                  <li>📅 Create and save custom day plans</li>
                  <li>🌤️ Get weather alerts for your locations</li>
                  <li><i className="fas fa-hotel"></i> Access exclusive hotel deals</li>
                  <li><i className="fas fa-bullseye"></i> Receive personalized recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};