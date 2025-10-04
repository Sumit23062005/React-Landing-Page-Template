// Test the specific Geoapify API call with place filter
const GEOAPIFY_API_KEY = '0ae4c931ec2448fd982a2f3af08c11d7';

async function testPlaceFilter() {
  try {
    console.log('Testing Geoapify API with place filter...');
    
    const url = `https://api.geoapify.com/v2/places?categories=beach,beach.beach_resort&filter=place:516684b707a1375240590d501a6a140e3340f00103f901b3c8f60000000000c00208&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
    
    console.log('API URL:', url);
    console.log('\nMaking request...');
    
    const response = await fetch(url);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      return;
    }
    
    const result = await response.json();
    console.log('\n=== API Response ===');
    console.log('Type:', result.type);
    console.log('Features count:', result.features?.length || 0);
    
    if (result.features && result.features.length > 0) {
      console.log('\n=== Found Beaches ===');
      result.features.forEach((feature, index) => {
        const props = feature.properties;
        console.log(`\n${index + 1}. ${props.name || 'Unnamed'}`);
        console.log(`   Address: ${props.formatted || 'No address'}`);
        console.log(`   Categories: ${props.categories?.join(', ') || 'None'}`);
        console.log(`   Coordinates: ${feature.geometry?.coordinates || 'None'}`);
        if (props.distance) {
          console.log(`   Distance: ${props.distance}m`);
        }
      });
    } else {
      console.log('No beaches found with this filter');
    }
    
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

// Also test with just the place filter to see what location it represents
async function testPlaceInfo() {
  try {
    console.log('\n\n=== Testing Place Filter Info ===');
    
    const url = `https://api.geoapify.com/v2/places?categories=populated_place&filter=place:516684b707a1375240590d501a6a140e3340f00103f901b3c8f60000000000c00208&limit=5&apiKey=${GEOAPIFY_API_KEY}`;
    
    console.log('Testing what this place filter represents...');
    
    const response = await fetch(url);
    
    if (response.ok) {
      const result = await response.json();
      console.log('Place info features:', result.features?.length || 0);
      
      if (result.features && result.features.length > 0) {
        const feature = result.features[0];
        const props = feature.properties;
        console.log(`Place: ${props.name || 'Unnamed'}`);
        console.log(`Address: ${props.formatted || 'No address'}`);
        console.log(`Categories: ${props.categories?.join(', ') || 'None'}`);
        console.log(`Place Type: ${props.place_type || 'Unknown'}`);
      }
    } else {
      const errorText = await response.text();
      console.error('Place info error:', errorText);
    }
    
  } catch (error) {
    console.error('Place info fetch error:', error.message);
  }
}

// Run both tests
async function runAllTests() {
  await testPlaceFilter();
  await testPlaceInfo();
}

runAllTests();