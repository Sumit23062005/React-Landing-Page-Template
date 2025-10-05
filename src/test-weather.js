import { getWeatherData } from './services/weatherService';

// Test with Mumbai coordinates
const testWeather = async () => {
  try {
    console.log('Testing weather API...');
    const data = await getWeatherData(18.954359, 72.812879);
    console.log('Weather data received:', data);
    return data;
  } catch (error) {
    console.error('Weather test failed:', error);
  }
};

testWeather();