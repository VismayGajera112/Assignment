import { useState, useEffect } from 'react';
import { getEvents, createEvent as createEventService, deleteEvent as deleteEventService } from '../services/events';

const useEventManagement = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const createEvent = async (event: any) => {
    try {
      const response = await createEventService(event);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Failed to create event', error);
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
