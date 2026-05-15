import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.BUFFER_PERSONAL_API_KEY;
const ENDPOINT = 'https://api.buffer.com/1/graphql';

async function testGQL() {
  if (!API_KEY) {
    console.error('Missing BUFFER_PERSONAL_API_KEY');
    return;
  }

  const query = `
    query {
      __type(name: "ImageAssetInput") {
        inputFields {
          name
        }
      }
    }
  `;

  console.log('Fetching profiles...');
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ query })
  });

  const result = await response.json();
  console.log('Result:', JSON.stringify(result, null, 2));
}

testGQL();
