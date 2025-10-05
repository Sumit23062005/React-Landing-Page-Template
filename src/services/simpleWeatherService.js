import { fetchWeatherApi } from "openmeteo";

export const getSimpleWeatherData = async (latitude, longitude) => {
  console.log('Weather API called with coordinates:', latitude, longitude);
  
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min", 
      "weather_code",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "precipitation_sum",
      "uv_index_max",
      "sunshine_duration"
    ],
    past_days: 7,
    forecast_days: 7,
    timezone: "auto"
  };

  try {
    console.log('Making API request to:', url);
    console.log('With parameters:', params);
    
    const responses = await fetchWeatherApi(url, params);
    console.log('API responses received:', responses.length);
    
    if (!responses || responses.length === 0) {
      throw new Error('No weather data received from API');
    }
    
    const response = responses[0];
    console.log('Processing response...');
    
    // Get response details
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const latitude_response = response.latitude();
    const longitude_response = response.longitude();
    
    console.log('Response details:', {
      utcOffsetSeconds,
      timezone,
      latitude: latitude_response,
      longitude: longitude_response
    });

    // Process daily data
    const daily = response.daily();
    if (!daily) {
      throw new Error('No daily data in response');
    }
    
    console.log('Daily data object:', daily);
    
    // Get time information
    const range = daily.time();
    const time = range;
    const timeEnd = daily.timeEnd();
    const interval = daily.interval();
    
    console.log('Time range:', { time, timeEnd, interval });
    
    // Calculate number of time steps
    const timeSteps = Math.floor((timeEnd - time) / interval);
    console.log('Time steps:', timeSteps);
    
    // Create time array
    const times = [];
    for (let i = 0; i < timeSteps; i++) {
      const timestamp = (time + i * interval + utcOffsetSeconds) * 1000;
      times.push(new Date(timestamp));
    }
    
    console.log('Generated times:', times.slice(0, 3), '...', times.slice(-2));
    
    // Extract daily variables in the correct order
    const temperature_2m_max = Array.from(daily.variables(0).valuesArray());
    const temperature_2m_min = Array.from(daily.variables(1).valuesArray());
    const weather_code = Array.from(daily.variables(2).valuesArray());
    const wind_speed_10m_max = Array.from(daily.variables(3).valuesArray());
    const wind_gusts_10m_max = Array.from(daily.variables(4).valuesArray());
    const precipitation_sum = Array.from(daily.variables(5).valuesArray());
    const uv_index_max = Array.from(daily.variables(6).valuesArray());
    const sunshine_duration = Array.from(daily.variables(7).valuesArray());
    
    console.log('Extracted variables:', {
      temp_max_length: temperature_2m_max.length,
      temp_min_length: temperature_2m_min.length,
      sample_temp_max: temperature_2m_max.slice(0, 3),
      sample_temp_min: temperature_2m_min.slice(0, 3)
    });
    
    // Create the weather data object
    const weatherData = {
      daily: {
        time: times,
        temperature_2m_max,
        temperature_2m_min,
        weather_code,
        wind_speed_10m_max,
        wind_gusts_10m_max,
        precipitation_sum,
        uv_index_max,
        sunshine_duration
      },
      location: {
        latitude: latitude_response,
        longitude: longitude_response,
        timezone
      }
    };

    console.log('Final weather data structure:', {
      daily_time_length: weatherData.daily.time.length,
      daily_temp_max_length: weatherData.daily.temperature_2m_max.length,
      first_date: weatherData.daily.time[0],
      last_date: weatherData.daily.time[weatherData.daily.time.length - 1]
    });
    
    return weatherData;
    
  } catch (error) {
    console.error("Error in weather fetch:", error);
    console.error("Error details:", error.message);
    throw error;
  }
};

// Generate safety report based on weather data
export const generateSafetyReport = (weatherData) => {
  console.log('Generating safety report...');
  
  if (!weatherData || !weatherData.daily || !weatherData.daily.time) {
    console.log('No weather data for safety report');
    return {
      safetyLevel: "Unknown",
      warnings: ["Weather data unavailable"],
      recommendations: ["Check local weather conditions before visiting"]
    };
  }
  
  // Use the current day or closest available day
  const today = new Date();
  const currentDayIndex = weatherData.daily.time.findIndex(date => {
    const dayDiff = Math.abs(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return dayDiff < 1; // Within 1 day
  });
  
  const index = currentDayIndex >= 0 ? currentDayIndex : Math.floor(weatherData.daily.time.length / 2);
  
  console.log('Using day index for safety:', index, 'Date:', weatherData.daily.time[index]);
  
  const todayData = {
    tempMax: weatherData.daily.temperature_2m_max[index] || 25,
    tempMin: weatherData.daily.temperature_2m_min[index] || 20,
    windMax: weatherData.daily.wind_speed_10m_max[index] || 10,
    gustMax: weatherData.daily.wind_gusts_10m_max[index] || 15,
    precipitation: weatherData.daily.precipitation_sum[index] || 0,
    uvIndex: weatherData.daily.uv_index_max[index] || 5,
    weatherCode: weatherData.daily.weather_code[index] || 1
  };
  
  console.log('Today weather conditions:', todayData);
  
  let safetyLevel = "Good";
  let warnings = [];
  let recommendations = [];

  // Wind conditions
  if (todayData.windMax > 25) {
    safetyLevel = "Caution";
    warnings.push("High wind speeds detected");
    recommendations.push("Avoid water activities");
  }

  if (todayData.gustMax > 35) {
    safetyLevel = "Warning";
    warnings.push("Dangerous wind gusts");
    recommendations.push("Stay away from the beach");
  }

  // UV conditions
  if (todayData.uvIndex > 8) {
    if (safetyLevel === "Good") safetyLevel = "Caution";
    warnings.push("Very high UV index");
    recommendations.push("Use strong sunscreen and seek shade");
  }

  // Precipitation
  if (todayData.precipitation > 10) {
    safetyLevel = "Caution";
    warnings.push("Heavy rainfall expected");
    recommendations.push("Check local conditions before visiting");
  }

  // Temperature conditions
  if (todayData.tempMax > 35) {
    if (safetyLevel === "Good") safetyLevel = "Caution";
    warnings.push("Very hot conditions");
    recommendations.push("Stay hydrated and take frequent breaks");
  }

  // Weather code conditions (storms, etc.)
  if (todayData.weatherCode >= 80) {
    safetyLevel = "Warning";
    warnings.push("Severe weather conditions");
    recommendations.push("Avoid beach activities");
  }

  if (warnings.length === 0) {
    recommendations.push("Good conditions for beach activities");
  }

  const report = {
    safetyLevel,
    warnings,
    recommendations,
    conditions: todayData
  };

  console.log('Safety report generated:', report);
  return report;
};