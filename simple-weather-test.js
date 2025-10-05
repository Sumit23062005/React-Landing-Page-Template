// Simple test for openmeteo
const { fetchWeatherApi } = require("openmeteo");

async function simpleWeatherTest() {
  try {
    console.log('Testing openmeteo API...');
    
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: 18.954359,
      longitude: 72.812879,
      current: "temperature_2m",
      daily: "temperature_2m_max,temperature_2m_min"
    };

    console.log('Making request with params:', params);
    const responses = await fetchWeatherApi(url, params);
    console.log('Response received:', responses.length, 'responses');
    
    if (responses.length > 0) {
      const response = responses[0];
      console.log('Latitude:', response.latitude());
      console.log('Longitude:', response.longitude());
      console.log('Success! Weather API is working.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

simpleWeatherTest();