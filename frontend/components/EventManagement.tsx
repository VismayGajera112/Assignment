import { useState } from 'react';
import { Card, Input, Button, Spinner } from '@nextui-org/react';
import { useEventManagement } from '../hooks/useEventManagement';

const EventManagement = () => {
  const { events, isLoading, createEvent, deleteEvent } = useEventManagement();
  const [newEvent, setNewEvent] = useState({ name: '', description: '' });

  const handleCreateEvent = async () => {
    if (newEvent.name.trim() && newEvent.description.trim()) {
      await createEvent(newEvent);
      setNewEvent({ name: '', description: '' });
    }
  };

  return (
    <div style={{ padding: '16px', display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {/* Create Event Card */}
      <Card style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ marginBottom: '16px' }}>Create Event</h3>
        <Input
          aria-label="Event Name"
          placeholder="Event Name"
          fullWidth
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          style={{ marginBottom: '16px' }}
        />
        <Input
          aria-label="Event Description"
          placeholder="Event Description"
          fullWidth
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          style={{ marginBottom: '16px' }}
        />
        <Button color="primary" onClick={handleCreateEvent} disabled={!newEvent.name || !newEvent.description}>
          Create Event
        </Button>
      </Card>

      {/* Display Events */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner size="lg" />
        </div>
      ) : (
        events.map((event: any) => (
          <Card key={event.id} style={{ padding: '16px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <Button color="danger" onClick={() => deleteEvent(event.id)}>
              Delete Event
            </Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventManagement;
