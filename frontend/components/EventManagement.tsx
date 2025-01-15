import { useEventManagement } from "../hooks/useEventManagement";
import { Card, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import './styles.css';

const EventManagement = () => {
  const { createEvent } = useEventManagement();
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    dateTime: new Date(),
    duration: 0,
    type: "",
    capacity: 0,
  });

  const handleCreateEvent = async () => {
    if (newEvent.name.trim() && newEvent.description.trim()) {
      await createEvent(newEvent);
      setNewEvent({
        name: "",
        description: "",
        dateTime: new Date(),
        duration: 0,
        type: "",
        capacity: 0,
      });
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {/* Create Event Card */}
      <Card
        style={{
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ marginBottom: "16px" }}>Create Event</h3>
        <Input
          aria-label="Event Name"
          placeholder="Event Name"
          fullWidth
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          style={{ marginBottom: "16px" }}
        />
        <Input
          aria-label="Event Description"
          placeholder="Event Description"
          fullWidth
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          style={{ marginBottom: "16px" }}
        />
        <Input
          aria-label="Event Date and Time"
          placeholder="Event Date and Time"
          fullWidth
          type="datetime-local"
          value={newEvent.dateTime.toISOString().slice(0, 16) || "T00:00"}
          onChange={(e) =>
            setNewEvent({ ...newEvent, dateTime: new Date(e.target.value) })
          }
          style={{ marginBottom: "16px" }}
        />
        <Input
          aria-label="Event Duration"
          placeholder="Event Duration (in hours)"
          fullWidth
          type="number"
          value={newEvent.duration.toString()}
          onChange={(e) =>
            setNewEvent({ ...newEvent, duration: Number(e.target.value) })
          }
          style={{ marginBottom: "16px" }}
        />
        <select
          aria-label="Event Type"
          value={newEvent.type}
          onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          style={{
            marginBottom: "16px",
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="" disabled>
            Select Event Type
          </option>
          <option value="Virtual">Virtual</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <Input
          aria-label="Event Capacity"
          placeholder="Event Capacity"
          fullWidth
          type="number"
          value={newEvent.capacity.toString()}
          onChange={(e) =>
            setNewEvent({ ...newEvent, capacity: Number(e.target.value) })
          }
          style={{ marginBottom: "16px" }}
        />
        <Button
          color="primary"
          onPress={handleCreateEvent}
          disabled={!newEvent.name || !newEvent.description}
        >
          Create Event
        </Button>
      </Card>
    </div>
  );
};

export default EventManagement;
