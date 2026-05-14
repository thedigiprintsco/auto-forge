export interface BufferProfile {
  id: string;
  service: string;
  service_username: string;
}

export async function getBufferProfiles(accessToken: string): Promise<BufferProfile[]> {
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

export async function createBufferUpdate(
  accessToken: string,
  profileIds: string[],
  text: string,
  media?: { photo?: string; link?: string }
) {
  const body: any = {
    text,
    profile_ids: profileIds,
    shorten: false
  };

  if (media) {
    body.media = media;
  }

  const response = await fetch('https://api.bufferapp.com/1/updates/create.json', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(body).toString()
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Buffer API error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
