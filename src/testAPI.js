// Test API key and endpoint
const testGeoapifyAPI = async () => {
  const apiKey = '0ae4c931ec2448fd982a2f3af08c11d7';
  const testUrl = `https://api.geoapify.com/v2/places?categories=beach&filter=rect:73.80088790553927,18.56939352002724,73.90515903154818,18.468189133652153&limit=5&apiKey=${apiKey}`;
  
  console.log('Testing API URL:', testUrl);
  
  try {
    const response = await fetch(testUrl);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('Success! API Response:', data);
    
    if (data.features && data.features.length > 0) {
      console.log('Found', data.features.length, 'places');
      data.features.forEach((feature, index) => {
        console.log(`${index + 1}:`, feature.properties.name || 'Unnamed place');
      });
    } else {
      console.log('No places found in this area');
    }
    
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Run the test
testGeoapifyAPI();