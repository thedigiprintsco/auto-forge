import { getBufferProfiles } from './src/lib/buffer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkBuffer() {
  const token = process.env.BUFFER_PERSONAL_API_KEY;
  if (!token || token === 'placeholder') {
    console.error('Missing BUFFER_PERSONAL_API_KEY in .env.local');
    return;
  }

  try {
    console.log('Fetching Buffer profiles via GraphQL...');
    const profiles = await getBufferProfiles(token);
    console.log('Buffer Profiles:', JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.error('Error fetching Buffer profiles:', err);
  }
}

checkBuffer();
