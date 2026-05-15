const GQL_ENDPOINT = 'https://api.buffer.com/1/graphql';

export interface BufferProfile {
  id: string;
  service: string;
  service_username: string;
}

/**
 * Fetches Buffer channels (profiles) using GraphQL.
 */
export async function getBufferProfiles(accessToken: string): Promise<BufferProfile[]> {
  // First, get the organization ID
  const accountQuery = `
    query {
      account {
        organizations {
          id
        }
      }
    }
  `;

  const accountResponse = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ query: accountQuery })
  });

  const accountResult = await accountResponse.json();
  const orgId = accountResult.data?.account?.organizations?.[0]?.id;

  if (!orgId) {
    console.error('Account result:', accountResult);
    throw new Error('Could not find Buffer organization ID');
  }

  const query = `
    query GetChannels($input: ChannelsInput!) {
      channels(input: $input) {
        id
        service
        name
      }
    }
  `;

  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ 
      query,
      variables: { input: { organizationId: orgId } }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Buffer GraphQL Error:', errorText);
    throw new Error(`Buffer API error: ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    console.error('GraphQL validation errors:', result.errors);
    throw new Error(`Buffer GraphQL Error: ${result.errors[0].message}`);
  }

  return result.data.channels.map((ch: any) => ({
    id: ch.id,
    service: ch.service,
    service_username: ch.name
  }));
}

/**
 * Creates a post on Buffer using GraphQL createPost mutation.
 */
export async function createBufferUpdate(
  accessToken: string,
  profileIds: string[],
  text: string,
  media?: { photo?: string; link?: string }
) {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on PostActionSuccess {
          post {
            id
            status
          }
        }
        ... on InvalidInputError {
          message
        }
        ... on UnauthorizedError {
          message
        }
        ... on NotFoundError {
          message
        }
        ... on UnexpectedError {
          message
        }
        ... on RestProxyError {
          message
        }
        ... on LimitReachedError {
          message
        }
      }
    }
  `;

  const results = [];

  for (const profileId of profileIds) {
    const variables = {
      input: {
        channelId: profileId,
        text: text,
        mode: 'shareNow',
        schedulingType: 'automatic',
        assets: media?.photo ? [{ image: { url: media.photo } }] : []
      }
    };

    const response = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        query: mutation,
        variables: variables
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error creating post for profile ${profileId}:`, errorText);
      continue;
    }

    const result = await response.json();
    if (result.errors) {
      console.error(`GraphQL Validation Error for profile ${profileId}:`, result.errors);
    } else {
      const payload = result.data.createPost;
      console.log(`Payload for ${profileId}:`, JSON.stringify(payload));
      if (payload.post) {
        results.push(payload.post);
      } else if (payload.message) {
        console.error(`Buffer API Error for profile ${profileId}:`, payload.message);
      } else {
        console.error(`Unknown response format for profile ${profileId}:`, payload);
      }
    }
  }

  return results;
}
