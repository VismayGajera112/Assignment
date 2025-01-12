import api from './api';

export const getEvents = () => {
  return api.get('/events');
};

export const getEvent = (eventId: string) => {
  return api.get(`/events/${eventId}`);
};

export const getEventsByOrganizer = (organizerId: string) => {
  return api.get(`/events/organizer/${organizerId}`);
};

export const createEvent = (data: any) => {
  return api.post('/events', data);
};

export const updateEvent = (eventId: string, data: any) => {
  return api.put(`/events/${eventId}`, data);
};

export const deleteEvent = (eventId: string) => {
  return api.delete(`/events/${eventId}`);
};

export const getSessionsByEvent = (eventId: string) => {
  return api.get(`/events/${eventId}/sessions`);
};

export const addParticipants = (eventId: string, participants: any[]) => {
  return api.post(`/events/${eventId}/participants`, { participants });
};

export const exportEventData = (eventId: string) => {
  return api.get(`/events/${eventId}/export`, { responseType: 'blob' });
};
