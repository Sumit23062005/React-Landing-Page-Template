// Test the new weather service
import { getSimpleWeatherData, generateSafetyReport } from './src/services/simpleWeatherService.js';

async function testNewWeatherService() {
  try {
    console.log('Testing new weather service...');
    
    // Test with Mumbai coordinates
    const data = await getSimpleWeatherData(18.954359, 72.812879);
    console.log('Weather data structure:', {
      dailyTimeLength: data.daily.time.length,
      firstDate: data.daily.time[0],
      lastDate: data.daily.time[data.daily.time.length - 1],
      sampleTemps: data.daily.temperature_2m_max.slice(0, 3),
      location: data.location
    });
    
    // Test safety report
    const safety = generateSafetyReport(data);
    console.log('Safety report:', safety);
    
    console.log('✅ Weather service test successful!');
    
  } catch (error) {
    console.error('❌ Weather service test failed:', error);
  }
}

testNewWeatherService();