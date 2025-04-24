import { makeErrorResponse } from '@/api/makeResponse';
import type { ErrorResponse } from '@/api/types';

import type { EventType } from './types';

export const getEvents = async (
  signal: AbortSignal,
): Promise<{ events: EventType[] } | ErrorResponse> => {
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events',
      {
        method: 'GET',
        signal,
      },
    );

    if (response.status === 404) {
      return { events: [] };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { events: await response.json() };
  } catch (error) {
    return makeErrorResponse((error as Error).message);
  }
};
