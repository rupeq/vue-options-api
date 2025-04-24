import { makeErrorResponse } from '@/api/makeResponse';
import type { ErrorResponse } from '@/api/types';

import type { EventType } from './types';

export const getEvent = async (
  eventId: EventType['id'],
  signal: AbortSignal,
): Promise<{ event: EventType | null } | ErrorResponse> => {
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events/${eventId}`,
      {
        method: 'GET',
        signal,
      },
    );

    if (response.status === 404) {
      return { event: null };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { event: await response.json() };
  } catch (error) {
    return makeErrorResponse((error as Error).message);
  }
};
