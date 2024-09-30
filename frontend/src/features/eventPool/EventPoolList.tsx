import React from "react";
import EventPoolItem from "./EventsPoolItem";
import { EventPool } from "~/models/types/event_pool";

interface EventPoolProps {
  events: EventPool[];
}

export const EventPoolList = ({ events }: EventPoolProps) => {
  return (
    <div className="flex flex-col gap-4">
      {events.map((event: EventPool) => (
        <EventPoolItem
          id={event.uid}
          key={event.uid}
          title={event.title}
          description={event.description}
          location={event.location}
          available_times={[
            event.available_times[0].start_time.toString(),
            event.available_times[0].end_time.toString(),
          ]}
          value={event.default_budget.value}
          preparation_task={event.preparation_task}
          notes={event.notes}
        />
      ))}
    </div>
  );
};
