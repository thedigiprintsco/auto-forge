import { createBufferUpdate, getBufferProfiles } from './src/lib/buffer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testPost() {
  const token = process.env.BUFFER_PERSONAL_API_KEY;
  if (!token) {
    console.error('Missing BUFFER_PERSONAL_API_KEY');
    return;
  }

  try {
    const profiles = await getBufferProfiles(token);
    // Find the twitter profile for safety
    const twitterProfile = profiles.find(p => p.service === 'twitter');
    
    if (!twitterProfile) {
      console.warn('No Twitter profile found, using the first available profile.');
    }
    
    const profileId = twitterProfile ? twitterProfile.id : profiles[0].id;
    
    console.log(`Sending test post to profile: ${profileId} (${twitterProfile?.service || 'unknown'})`);
    
    const result = await createBufferUpdate(
      token,
      [profileId],
      "Test post from EtherForge Bot via GraphQL API! 🚀 #EtherForge #Automation",
      { photo: "https://etherforge.ai/solopreneur-os-thumb.png" }
    );
    
    console.log('Post result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error in test post:', err);
  }
}

testPost();
