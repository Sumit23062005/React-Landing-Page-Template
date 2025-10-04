// Quick test of the updated Geoapify service
const GEOAPIFY_API_KEY = '0ae4c931ec2448fd982a2f3af08c11d7';
const BASE_URL = 'https://api.geoapify.com/v2/places';

// India bounding box coordinates
const INDIA_BBOX = '68.1766451354,7.96553477623,97.4025614766,35.4940095078';
const CATEGORIES = 'tourism,accommodation';

async function testUpdatedAPI() {
  try {
    console.log('Testing updated API approach...');
    
    // Test with tourism category for Goa
    console.log('\n=== Test: Goa beach search ===');
    const params = new URLSearchParams({
      text: 'Goa beach coast',
      filter: `rect:${INDIA_BBOX}`,
      categories: CATEGORIES,
      limit: '5',
      apiKey: GEOAPIFY_API_KEY
    });

    const url = `${BASE_URL}?${params}`;
    console.log('API URL:', url);

    const response = await fetch(url);
    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('Features found:', data.features?.length || 0);
      
      if (data.features?.length > 0) {
        console.log('Results:');
        data.features.slice(0, 3).forEach((feature, index) => {
          console.log(`${index + 1}. ${feature.properties?.name || 'Unnamed'}`);
          console.log(`   Address: ${feature.properties?.formatted || 'No address'}`);
          console.log(`   Categories: ${feature.properties?.categories?.join(', ') || 'None'}`);
          console.log('');
        });
      }
    } else {
      const errorText = await response.text();
      console.error('API Error:', errorText);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the test
testUpdatedAPI();