import { useState } from 'react';
import { createEvent as createEventService, deleteEvent as deleteEventService } from '../services/events';

const useEventManagement = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading] = useState<boolean>(true);

  const createEvent = async (event: any) => {
    try {
      const response = await createEventService(event);
      setEvents([...events, response.data]);
    } catch (error) {
      if (error) {
        console.error('Event not found', error);
      } else {
        console.error('Failed to create event', error);
      }
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await deleteEventService(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  return { events, isLoading, createEvent, deleteEvent };
};

export { useEventManagement };
