// Geoapify API Service for Beach Search
const GEOAPIFY_API_KEY = '0ae4c931ec2448fd982a2f3af08c11d7'; // Your API key
const BASE_URL = 'https://api.geoapify.com/v2/places';

// Beach search configurations for India
const INDIA_SEARCH_CONFIG = {
  country: 'India',
  categories: 'beach,beach.beach_resort,leisure.beach_resort,tourism.beach',
  // India bounding box coordinates
  bbox: '68.1766451354,7.96553477623,97.4025614766,35.4940095078'
};

// Popular Indian coastal states for focused searches
const INDIAN_COASTAL_REGIONS = {
  'goa': {
    bbox: '73.6813,15.1960,73.8370,15.6989',
    name: 'Goa'
  },
  'kerala': {
    bbox: '74.8520,8.2972,77.4021,12.7842',
    name: 'Kerala'
  },
  'mumbai': {
    bbox: '72.7760,18.8900,72.9965,19.2728',
    name: 'Mumbai & Maharashtra Coast'
  },
  'tamil_nadu': {
    bbox: '77.0824,8.0681,80.3430,13.4324',
    name: 'Tamil Nadu Coast'
  },
  'karnataka': {
    bbox: '74.0855,12.2958,75.1240,15.3173',
    name: 'Karnataka Coast'
  },
  'odisha': {
    bbox: '84.3291,17.7804,87.5395,22.5670',
    name: 'Odisha Coast'
  },
  'west_bengal': {
    bbox: '87.7465,21.4551,89.0423,22.9868',
    name: 'West Bengal Coast'
  },
  'gujarat': {
    bbox: '68.1623,20.0631,74.4700,24.7047',
    name: 'Gujarat Coast'
  }
};

class GeoapifyService {
  constructor() {
    this.apiKey = GEOAPIFY_API_KEY;
    this.baseUrl = BASE_URL;
  }

  // Set API key dynamically
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  // Search beaches across India with text query
  async searchBeachesInIndia(searchQuery = '', limit = 20) {
    try {
      const params = new URLSearchParams({
        text: searchQuery || 'beach',
        filter: `countrycode:in`,
        categories: INDIA_SEARCH_CONFIG.categories,
        limit: limit.toString(),
        apiKey: this.apiKey,
        format: 'json'
      });

      const url = `${this.baseUrl}?${params}`;
      console.log('Searching beaches in India:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('India beach search - Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('India beach search - Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('India beach search - Response:', data);
      
      if (!data.features || data.features.length === 0) {
        console.warn('No beaches found for query:', searchQuery);
        return this.getPopularIndianBeaches();
      }
      
      return this.formatBeachData(data.features);
    } catch (error) {
      console.error('Error searching Indian beaches:', error);
      
      if (error.message.includes('API key')) {
        return this.getPopularIndianBeaches();
      }
      
      throw error;
    }
  }

  // Autocomplete search for beaches
  async autocompleteBeachSearch(query, limit = 10) {
    try {
      if (!query || query.length < 2) {
        return this.getPopularIndianBeaches().slice(0, limit);
      }

      const params = new URLSearchParams({
        text: `${query} beach India`,
        filter: `countrycode:in`,
        categories: INDIA_SEARCH_CONFIG.categories,
        limit: limit.toString(),
        apiKey: this.apiKey,
        format: 'json'
      });

      const url = `${this.baseUrl}?${params}`;
      console.log('Autocomplete search:', url);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return this.formatBeachData(data.features || []);
    } catch (error) {
      console.error('Autocomplete search error:', error);
      return this.getPopularIndianBeaches().filter(beach => 
        beach.name.toLowerCase().includes(query.toLowerCase()) ||
        beach.address.toLowerCase().includes(query.toLowerCase())
      ).slice(0, limit);
    }
  }

  // Search in specific coastal region
  async searchInRegion(region, query = '', limit = 15) {
    try {
      const regionConfig = INDIAN_COASTAL_REGIONS[region];
      if (!regionConfig) {
        return this.searchBeachesInIndia(query, limit);
      }

      const params = new URLSearchParams({
        text: query || 'beach',
        filter: `rect:${regionConfig.bbox}`,
        categories: INDIA_SEARCH_CONFIG.categories,
        limit: limit.toString(),
        apiKey: this.apiKey,
        format: 'json'
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return this.formatBeachData(data.features || []);
    } catch (error) {
      console.error('Region search error:', error);
      throw error;
    }
  }

  // Search beaches by coordinates
  async searchBeachesByCoords(lat, lon, radius = 5000, limit = 20) {
    try {
      const params = new URLSearchParams({
        categories: INDIA_SEARCH_CONFIG.categories,
        filter: `circle:${lon},${lat},${radius}`,
        limit: limit.toString(),
        apiKey: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return this.formatBeachData(data.features || []);
    } catch (error) {
      console.error('Error fetching beach data by coordinates:', error);
      throw error;
    }
  }

  // Search places by category and location
  async searchPlacesByCategory(location, category, limit = 20) {
    try {
      const regionConfig = INDIAN_COASTAL_REGIONS[location];
      const bbox = regionConfig ? regionConfig.bbox : INDIA_SEARCH_CONFIG.bbox;
      
      const categoryMap = {
        beach: 'beach,beach.beach_resort',
        restaurant: 'catering.restaurant,catering.cafe',
        hotel: 'accommodation.hotel,accommodation.resort',
        attraction: 'tourism.attraction,tourism.sights',
        shopping: 'commercial.shopping_mall,commercial.marketplace'
      };

      const params = new URLSearchParams({
        categories: categoryMap[category] || category,
        filter: `rect:${bbox}`,
        limit: limit.toString(),
        apiKey: this.apiKey
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return this.formatPlaceData(data.features || []);
    } catch (error) {
      console.error('Error fetching places by category:', error);
      throw error;
    }
  }

  // Format beach data for consistent use in components
  formatBeachData(features) {
    return features.map(feature => {
      const props = feature.properties;
      return {
        id: feature.properties.place_id || Math.random().toString(36),
        name: props.name || 'Unnamed Beach',
        category: 'beach',
        coordinates: feature.geometry.coordinates,
        address: this.formatAddress(props),
        rating: this.calculateRating(props),
        description: this.generateDescription(props),
        highlights: this.extractHighlights(props),
        activities: ['Swimming', 'Sunbathing', 'Photography', 'Beach walks'],
        bestTime: this.getBestTime(),
        crowdLevel: this.estimateCrowdLevel(props),
        amenities: this.extractAmenities(props),
        contact: {
          phone: props.phone,
          website: props.website
        },
        distance: props.distance || null
      };
    });
  }

  // Format general place data
  formatPlaceData(features) {
    return features.map(feature => {
      const props = feature.properties;
      return {
        id: feature.properties.place_id || Math.random().toString(36),
        name: props.name || 'Unnamed Place',
        category: this.categorizePlace(props.categories),
        coordinates: feature.geometry.coordinates,
        address: this.formatAddress(props),
        rating: this.calculateRating(props),
        description: props.description || this.generateDescription(props),
        highlights: this.extractHighlights(props),
        activities: this.suggestActivities(props.categories),
        contact: {
          phone: props.phone,
          website: props.website,
          email: props.email
        },
        openingHours: props.opening_hours,
        distance: props.distance || null
      };
    });
  }

  // Helper methods
  formatAddress(props) {
    const parts = [
      props.street,
      props.housenumber,
      props.suburb,
      props.city,
      props.state,
      props.postcode,
      props.country
    ].filter(Boolean);
    
    return parts.join(', ') || 'Address not available';
  }

  calculateRating(props) {
    // Generate a rating based on available data
    let rating = 3.5; // Base rating
    
    if (props.name && props.name.toLowerCase().includes('resort')) rating += 0.5;
    if (props.website) rating += 0.2;
    if (props.phone) rating += 0.1;
    if (props.opening_hours) rating += 0.2;
    
    return Math.min(5, Math.max(1, rating)).toFixed(1);
  }

  generateDescription(props) {
    const category = props.categories?.[0] || '';
    const name = props.name || 'this location';
    
    if (category.includes('beach')) {
      return `Beautiful coastal destination perfect for relaxation and water activities. ${name} offers scenic views and a peaceful atmosphere.`;
    } else if (category.includes('restaurant')) {
      return `Delightful dining experience with local and international cuisine. ${name} provides quality food and service.`;
    } else if (category.includes('hotel')) {
      return `Comfortable accommodation with modern amenities. ${name} ensures a pleasant stay for travelers.`;
    } else {
      return `Popular destination offering unique experiences. ${name} is worth visiting for its distinctive features.`;
    }
  }

  extractHighlights(props) {
    const highlights = [];
    
    if (props.categories) {
      props.categories.forEach(cat => {
        if (cat.includes('beach')) highlights.push('Beach access', 'Ocean views');
        if (cat.includes('resort')) highlights.push('Resort amenities', 'Luxury facilities');
        if (cat.includes('restaurant')) highlights.push('Dining', 'Local cuisine');
        if (cat.includes('hotel')) highlights.push('Accommodation', 'Comfortable stay');
      });
    }
    
    if (props.website) highlights.push('Online booking');
    if (props.phone) highlights.push('Phone booking');
    
    return highlights.length > 0 ? highlights : ['Scenic location', 'Great atmosphere'];
  }

  extractAmenities(props) {
    const amenities = [];
    
    if (props.categories) {
      props.categories.forEach(cat => {
        if (cat.includes('restaurant')) amenities.push('Restaurant');
        if (cat.includes('parking')) amenities.push('Parking');
        if (cat.includes('wifi')) amenities.push('WiFi');
        if (cat.includes('resort')) amenities.push('Resort facilities');
      });
    }
    
    return amenities;
  }

  categorizePlace(categories) {
    if (!categories || categories.length === 0) return 'attraction';
    
    const mainCategory = categories[0];
    if (mainCategory.includes('beach')) return 'beach';
    if (mainCategory.includes('restaurant') || mainCategory.includes('cafe')) return 'restaurant';
    if (mainCategory.includes('hotel') || mainCategory.includes('accommodation')) return 'hotel';
    if (mainCategory.includes('shopping')) return 'shopping';
    if (mainCategory.includes('tourism')) return 'attraction';
    
    return 'attraction';
  }

  suggestActivities(categories) {
    const activities = new Set();
    
    if (categories) {
      categories.forEach(cat => {
        if (cat.includes('beach')) {
          activities.add('Swimming');
          activities.add('Sunbathing');
          activities.add('Beach volleyball');
          activities.add('Water sports');
        }
        if (cat.includes('restaurant')) {
          activities.add('Dining');
          activities.add('Food tasting');
        }
        if (cat.includes('tourism')) {
          activities.add('Sightseeing');
          activities.add('Photography');
        }
      });
    }
    
    if (activities.size === 0) {
      return ['Exploration', 'Photography', 'Relaxation'];
    }
    
    return Array.from(activities);
  }

  getBestTime() {
    const times = ['Early morning', 'Morning', 'Afternoon', 'Sunset', 'Evening'];
    return times[Math.floor(Math.random() * times.length)];
  }

  estimateCrowdLevel(props) {
    // Estimate crowd level based on available data
    if (props.name && props.name.toLowerCase().includes('resort')) return 'Busy';
    if (props.website && props.phone) return 'Moderate';
    return 'Light';
  }

  // Get available search locations
  getAvailableLocations() {
    return Object.keys(INDIAN_COASTAL_REGIONS).map(key => ({
      value: key,
      label: INDIAN_COASTAL_REGIONS[key].name
    }));
  }

  // Popular Indian beaches for fallback/demo
  getPopularIndianBeaches() {
    return [
      {
        id: 'popular-1',
        name: 'Goa - Baga Beach',
        category: 'beach',
        coordinates: [73.7519, 15.5557],
        address: 'Baga Beach, North Goa, Goa, India',
        rating: '4.5',
        description: 'Famous beach in North Goa known for water sports, nightlife, and beach shacks. Popular among tourists and party enthusiasts.',
        highlights: ['Water sports', 'Nightlife', 'Beach shacks', 'Tourism hub'],
        activities: ['Parasailing', 'Jet skiing', 'Beach volleyball', 'Nightlife'],
        bestTime: 'October to March',
        crowdLevel: 'Very busy',
        amenities: ['Beach shacks', 'Water sports', 'Parking', 'ATM'],
        contact: {
          phone: null,
          website: 'https://www.goatourism.gov.in'
        },
        distance: null
      },
      {
        id: 'popular-2',
        name: 'Kerala - Kovalam Beach',
        category: 'beach',
        coordinates: [76.9786, 8.4004],
        address: 'Kovalam Beach, Thiruvananthapuram, Kerala, India',
        rating: '4.4',
        description: 'Crescent-shaped beach with coconut palm groves. Famous for Ayurvedic treatments and lighthouse views.',
        highlights: ['Lighthouse', 'Ayurveda', 'Coconut palms', 'Surfing'],
        activities: ['Swimming', 'Surfing', 'Ayurvedic massage', 'Lighthouse visit'],
        bestTime: 'October to March',
        crowdLevel: 'Moderate',
        amenities: ['Resorts', 'Ayurvedic centers', 'Restaurants', 'Shops'],
        contact: {
          phone: null,
          website: 'https://www.keralatourism.org'
        },
        distance: null
      },
      {
        id: 'popular-3',
        name: 'Mumbai - Juhu Beach',
        category: 'beach',
        coordinates: [72.8265, 19.0990],
        address: 'Juhu Beach, Mumbai, Maharashtra, India',
        rating: '4.0',
        description: 'Popular urban beach famous for street food, bollywood celebrity homes, and sunset views.',
        highlights: ['Street food', 'Celebrity homes', 'Sunset views', 'Urban beach'],
        activities: ['Street food tasting', 'Beach walks', 'People watching', 'Photography'],
        bestTime: 'October to February',
        crowdLevel: 'Very busy',
        amenities: ['Food stalls', 'Hotels nearby', 'Public transport', 'Parking'],
        contact: {
          phone: null,
          website: null
        },
        distance: null
      },
      {
        id: 'popular-4',
        name: 'Tamil Nadu - Marina Beach',
        category: 'beach',
        coordinates: [80.2785, 13.0475],
        address: 'Marina Beach, Chennai, Tamil Nadu, India',
        rating: '4.2',
        description: 'Longest urban beach in India. Perfect for morning walks, cultural programs, and local food.',
        highlights: ['Longest beach', 'Cultural events', 'Morning walks', 'Local food'],
        activities: ['Beach walks', 'Cultural events', 'Food tasting', 'Photography'],
        bestTime: 'November to February',
        crowdLevel: 'Busy',
        amenities: ['Food stalls', 'Aquarium nearby', 'Public facilities', 'Parking'],
        contact: {
          phone: null,
          website: 'https://www.tamilnadutourism.org'
        },
        distance: null
      },
      {
        id: 'popular-5',
        name: 'Karnataka - Om Beach',
        category: 'beach',
        coordinates: [74.3236, 14.3391],
        address: 'Om Beach, Gokarna, Karnataka, India',
        rating: '4.6',
        description: 'Sacred beach shaped like Om symbol. Popular for spirituality, yoga, and pristine natural beauty.',
        highlights: ['Om shape', 'Spiritual significance', 'Pristine nature', 'Yoga retreats'],
        activities: ['Yoga', 'Meditation', 'Trekking', 'Beach camping'],
        bestTime: 'October to March',
        crowdLevel: 'Light to moderate',
        amenities: ['Beach cafes', 'Yoga centers', 'Guesthouses', 'Temples nearby'],
        contact: {
          phone: null,
          website: 'https://www.karnatakatourism.org'
        },
        distance: null
      },
      {
        id: 'popular-6',
        name: 'Odisha - Puri Beach',
        category: 'beach',
        coordinates: [85.8245, 19.8135],
        address: 'Puri Beach, Puri, Odisha, India',
        rating: '4.3',
        description: 'Holy beach near Jagannath Temple. Famous for religious significance and annual Rath Yatra festival.',
        highlights: ['Religious significance', 'Jagannath Temple', 'Rath Yatra', 'Sand art'],
        activities: ['Temple visit', 'Religious ceremonies', 'Sand art viewing', 'Beach walks'],
        bestTime: 'October to March',
        crowdLevel: 'Busy',
        amenities: ['Hotels', 'Restaurants', 'Temple complex', 'Shops'],
        contact: {
          phone: null,
          website: 'https://www.odishatourism.gov.in'
        },
        distance: null
      },
      {
        id: 'popular-7',
        name: 'Gujarat - Diu Beach',
        category: 'beach',
        coordinates: [70.9131, 20.7144],
        address: 'Diu Beach, Diu, Gujarat, India',
        rating: '4.1',
        description: 'Peaceful beach with Portuguese colonial architecture. Perfect for relaxation and historical exploration.',
        highlights: ['Portuguese heritage', 'Colonial architecture', 'Peaceful atmosphere', 'Historical sites'],
        activities: ['Historical tours', 'Beach relaxation', 'Photography', 'Water sports'],
        bestTime: 'October to March',
        crowdLevel: 'Light',
        amenities: ['Heritage hotels', 'Restaurants', 'Historical sites', 'Airport'],
        contact: {
          phone: null,
          website: 'https://www.gujarattourism.com'
        },
        distance: null
      },
      {
        id: 'popular-8',
        name: 'West Bengal - Digha Beach',
        category: 'beach',
        coordinates: [87.5064, 21.6747],
        address: 'Digha Beach, Purba Medinipur, West Bengal, India',
        rating: '3.9',
        description: 'Popular weekend destination from Kolkata. Known for calm waters and fresh seafood.',
        highlights: ['Weekend getaway', 'Calm waters', 'Fresh seafood', 'Sunrise views'],
        activities: ['Swimming', 'Seafood dining', 'Sunrise watching', 'Beach cycling'],
        bestTime: 'October to March',
        crowdLevel: 'Moderate to busy',
        amenities: ['Hotels', 'Seafood restaurants', 'Beach resorts', 'Local transport'],
        contact: {
          phone: null,
          website: 'https://www.wbtourism.gov.in'
        },
        distance: null
      }
    ];
  }

  // Mock data for testing when API is not available (updated for Indian beaches)
  getMockBeachData() {
    return this.getPopularIndianBeaches().slice(0, 3);
  }
}

// Export singleton instance
const geoapifyService = new GeoapifyService();
export default geoapifyService;

// Export the class for custom instances
export { GeoapifyService };