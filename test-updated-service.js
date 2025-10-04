// Test the updated service with the actual working API approach
import GeoapifyService from './src/services/geoapifyService.js';

async function testUpdatedService() {
  const service = new GeoapifyService();
  
  console.log('Testing updated Geoapify service...');
  
  try {
    // Test 1: Search for beaches in Maharashtra (like the working API call)
    console.log('\n=== Test 1: Maharashtra beaches ===');
    const maharashtraResults = await service.searchBeachesInIndia('Maharashtra beach', 5);
    console.log('Maharashtra results:', maharashtraResults.length);
    
    if (maharashtraResults.length > 0) {
      console.log('First result:', {
        name: maharashtraResults[0].name,
        address: maharashtraResults[0].address,
        location: maharashtraResults[0].location,
        surface: maharashtraResults[0].surface,
        highlights: maharashtraResults[0].highlights
      });
    }
    
    // Test 2: Autocomplete search
    console.log('\n=== Test 2: Autocomplete for "Mumbai" ===');
    const autocompleteResults = await service.autocompleteBeachSearch('Mumbai', 3);
    console.log('Autocomplete results:', autocompleteResults.length);
    
    if (autocompleteResults.length > 0) {
      autocompleteResults.forEach((result, index) => {
        console.log(`${index + 1}. ${result.name} - ${result.location?.city || 'Unknown city'}`);
      });
    }
    
    // Test 3: General beach search
    console.log('\n=== Test 3: General beach search ===');
    const generalResults = await service.searchBeachesInIndia('beach', 3);
    console.log('General search results:', generalResults.length);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testUpdatedService();