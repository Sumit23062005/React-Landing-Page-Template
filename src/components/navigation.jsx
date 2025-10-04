import React from "react";

export const Navigation = ({ user, currentPage, setCurrentPage }) => {
  const handleLogout = () => {
    localStorage.removeItem('coastAllyUser');
    setCurrentPage('home');
    window.location.reload();
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'weather', label: 'Weather' },
    { id: 'safety', label: 'Safety' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'dayplan', label: 'Day Plan' },
    { id: 'restaurants', label: 'Dining' },
    { id: 'places', label: 'Places' },
    { id: 'transport', label: 'Transport' },
  ];

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top coastal-nav">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a 
            className="navbar-brand coastal-brand" 
            onClick={() => setCurrentPage('home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-logo">
              <div className="logo-icon">
                <i className="fas fa-water"></i>
              </div>
              <span className="brand-text">CoastAlly</span>
            </div>
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {navItems.map(item => (
              <li key={item.id} className={currentPage === item.id ? 'active' : ''}>
                <a 
                  onClick={() => setCurrentPage(item.id)}
                  className="nav-link coastal-nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {user ? (
              <li className={`dropdown user-dropdown ${currentPage === 'profile' ? 'active' : ''}`}>
                <a href="#" className="dropdown-toggle coastal-nav-link user-nav-link" data-toggle="dropdown">
                  {user.name} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu coastal-dropdown">
                  <li><a onClick={() => setCurrentPage('profile')} style={{ cursor: 'pointer' }}>Profile</a></li>
                  <li><a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a></li>
                </ul>
              </li>
            ) : (
              <li className={`login-item ${currentPage === 'auth' ? 'active' : ''}`}>
                <a 
                  onClick={() => setCurrentPage('auth')}
                  className="coastal-login-btn"
                  style={{ cursor: 'pointer' }}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
