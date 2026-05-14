import { getBufferProfiles } from './src/lib/buffer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkBuffer() {
  const token = process.env.BUFFER_ACCESS_TOKEN;
  if (!token || token === 'placeholder') {
    console.error('Missing Buffer token');
    return;
  }

  try {
    const profiles = await getBufferProfiles(token);
    console.log('Buffer Profiles:', JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.error('Error fetching Buffer profiles:', err);
  }
}

checkBuffer();
