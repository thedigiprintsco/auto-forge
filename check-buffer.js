const fetch = require('node-fetch'); // Assuming node-fetch is available or I'll use global fetch if node 18+

async function getBufferProfiles(accessToken) {
  const response = await fetch('https://api.bufferapp.com/1/profiles.json', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Buffer API error: ${response.statusText}`);
  }

  return response.json();
}

async function checkBuffer() {
  const token = process.env.BUFFER_ACCESS_TOKEN;
  console.log('Using token:', token ? 'Token present' : 'Token missing');
  if (!token || token === 'placeholder') {
    console.error('Missing Buffer token');
    return;
  }

  try {
    const profiles = await getBufferProfiles(token);
    console.log('Buffer Profiles:', JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.error('Error fetching Buffer profiles:', err.message);
  }
}

checkBuffer();
