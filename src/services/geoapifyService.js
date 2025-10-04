// services/geoapifyService.js

class GeoapifyService {
  constructor() {
    this.apiKey = '0ae4c931ec2448fd982a2f3af08c11d7';
    this.baseUrl = 'https://api.geoapify.com/v2';
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  // Search for places using autocomplete
  async searchPlaces(query) {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${this.apiKey}`
      );
      const data = await response.json();
      return data.features || [];
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  }

  // Get beaches for a specific place using place_id
  async getBeachesForPlace(placeId, limit = 20) {
    try {
      const response = await fetch(
        `${this.baseUrl}/places?categories=beach&filter=place:${placeId}&limit=${limit}&apiKey=${this.apiKey}`
      );
      const data = await response.json();
      return this.formatBeachData(data.features || []);
    } catch (error) {
      console.error('Error fetching beaches:', error);
      throw error;
    }
  }

  // Format beach data for display
  formatBeachData(beaches) {
    return beaches.map(beach => {
      const props = beach.properties;
      return {
        name: props.name || 'Unnamed Beach',
        city: props.city || '',
        state: props.state || '',
        country: props.country || 'India',
        address: props.formatted || props.address_line2 || 'Address not available',
        coordinates: beach.geometry.coordinates,
        surface: props.datasource?.raw?.surface || 'sand',
        placeId: props.place_id
      };
    });
  }
}

const geoapifyService = new GeoapifyService();
export default geoapifyService;
