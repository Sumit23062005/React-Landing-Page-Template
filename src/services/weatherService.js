import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

export const getWeatherData = async (latitude, longitude) => {
  console.log('Weather API called with coordinates:', latitude, longitude);
  
  const params = {
    latitude: latitude,
    longitude: longitude,
    timezone: "auto",
    past_days: 7,         // Past week
    forecast_days: 7,     // Next week
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",

    // Hourly data for detailed analysis
    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "dew_point_2m",
      "pressure_msl",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "precipitation",
      "precipitation_probability",
      "visibility",
      "cape",
      "weather_code"
    ],

    // Daily data for summarizing the report
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "wind_direction_10m_dominant",
      "uv_index_max",
      "sunshine_duration",
      "weather_code"
    ],
  };

  try {
    console.log('Making API request with params:', params);
    const responses = await fetchWeatherApi(url, params);
    console.log('API response received:', responses);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

    // Extract hourly and daily datasets
    const hourly = response.hourly();
    const daily = response.daily();

    // Generate hourly timestamps (converted to local time)
    const hourlyTimes = Array.from(
      { length: (hourly.timeEnd() - hourly.time()) / hourly.interval() },
      (_, i) => new Date((hourly.time() + i * hourly.interval() + utcOffsetSeconds) * 1000)
    );

    const dailyTimes = Array.from(
      { length: daily.timeArray().length },
      (_, i) => new Date((daily.timeArray()[i] + utcOffsetSeconds) * 1000)
    );

    // Construct data objects
    const weatherData = {
      hourly: {
        time: hourlyTimes,
        temperature_2m: hourly.variables(0).valuesArray(),
        apparent_temperature: hourly.variables(1).valuesArray(),
        relative_humidity_2m: hourly.variables(2).valuesArray(),
        dew_point_2m: hourly.variables(3).valuesArray(),
        pressure_msl: hourly.variables(4).valuesArray(),
        cloud_cover: hourly.variables(5).valuesArray(),
        wind_speed_10m: hourly.variables(6).valuesArray(),
        wind_direction_10m: hourly.variables(7).valuesArray(),
        wind_gusts_10m: hourly.variables(8).valuesArray(),
        precipitation: hourly.variables(9).valuesArray(),
        precipitation_probability: hourly.variables(10).valuesArray(),
        visibility: hourly.variables(11).valuesArray(),
        cape: hourly.variables(12).valuesArray(),
        weather_code: hourly.variables(13).valuesArray(),
      },
      daily: {
        time: dailyTimes,
        temperature_2m_max: daily.variables(0).valuesArray(),
        temperature_2m_min: daily.variables(1).valuesArray(),
        apparent_temperature_max: daily.variables(2).valuesArray(),
        apparent_temperature_min: daily.variables(3).valuesArray(),
        precipitation_sum: daily.variables(4).valuesArray(),
        precipitation_probability_max: daily.variables(5).valuesArray(),
        wind_speed_10m_max: daily.variables(6).valuesArray(),
        wind_gusts_10m_max: daily.variables(7).valuesArray(),
        wind_direction_10m_dominant: daily.variables(8).valuesArray(),
        uv_index_max: daily.variables(9).valuesArray(),
        sunshine_duration: daily.variables(10).valuesArray(),
        weather_code: daily.variables(11).valuesArray(),
      }
    };

    console.log('Weather data constructed:', {
      dailyCount: weatherData.daily.time.length,
      hourlyCount: weatherData.hourly.time.length,
      sampleDaily: weatherData.daily.time.slice(0, 3),
      sampleTemps: weatherData.daily.temperature_2m_max.slice(0, 3)
    });

    return weatherData;

  } catch (error) {
    console.error("❌ Error fetching weather data:", error);
    throw error;
  }
};

// Helper function to analyze safety conditions
export const generateSafetyReport = (weatherData) => {
  console.log('Generating safety report for weather data:', weatherData);
  
  const today = new Date();
  const todayIndex = weatherData.daily.time.findIndex(
    time => time.toDateString() === today.toDateString()
  );

  console.log('Today index:', todayIndex, 'Today date:', today.toDateString());

  if (todayIndex === -1) {
    console.log('Today not found in weather data, using day 7 (current day)');
    // If today is not found, use day 7 as current day (day 7 is usually today in the API)
    const currentIndex = 7;
    if (currentIndex < weatherData.daily.time.length) {
      const todayData = {
        tempMax: weatherData.daily.temperature_2m_max[currentIndex],
        tempMin: weatherData.daily.temperature_2m_min[currentIndex],
        windMax: weatherData.daily.wind_speed_10m_max[currentIndex],
        gustMax: weatherData.daily.wind_gusts_10m_max[currentIndex],
        precipitation: weatherData.daily.precipitation_sum[currentIndex],
        uvIndex: weatherData.daily.uv_index_max[currentIndex],
      };

      console.log('Using current day data:', todayData);
      return generateSafetyAnalysis(todayData);
    }
    return null;
  }

  const todayData = {
    tempMax: weatherData.daily.temperature_2m_max[todayIndex],
    tempMin: weatherData.daily.temperature_2m_min[todayIndex],
    windMax: weatherData.daily.wind_speed_10m_max[todayIndex],
    gustMax: weatherData.daily.wind_gusts_10m_max[todayIndex],
    precipitation: weatherData.daily.precipitation_sum[todayIndex],
    uvIndex: weatherData.daily.uv_index_max[todayIndex],
  };

  console.log('Today weather data:', todayData);
  return generateSafetyAnalysis(todayData);
};

// Helper function to analyze safety from weather data
const generateSafetyAnalysis = (todayData) => {
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
    warnings.push("Very hot conditions");
    recommendations.push("Stay hydrated and take frequent breaks");
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