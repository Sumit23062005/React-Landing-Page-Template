// API Configuration
// Replace 'YOUR_API_KEY' with your actual Geoapify API key

export const API_CONFIG = {
  // Geoapify API Configuration
  GEOAPIFY: {
    API_KEY: '0ae4c931ec2448fd982a2f3af08c11d7', // Your Geoapify API key
    BASE_URL: 'https://api.geoapify.com/v2/places',
    
    // Rate limiting (requests per minute)
    RATE_LIMIT: 3000, // Free tier allows 3000 requests per day
    
    // Default search parameters
    DEFAULT_LIMIT: 20,
    DEFAULT_RADIUS: 5000, // 5km radius for coordinate-based searches
  },
  
  // You can add other API configurations here
  WEATHER: {
    // Weather API config if needed
  },
  
  MAPS: {
    // Maps API config if needed
  }
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    API_TIMEOUT: 10000, // 10 seconds
    DEBUG_MODE: true,
  },
  production: {
    API_TIMEOUT: 5000, // 5 seconds
    DEBUG_MODE: false,
  }
};

// Get current environment config
export const getCurrentEnvConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

export default API_CONFIG;