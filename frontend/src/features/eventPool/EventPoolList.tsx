import React from "react";
import EventPoolItem from "./EventsPoolItem";
import { EventPool } from "~/models/types/event_pool";

interface EventPoolProps {
  events: EventPool[];
}

export const EventPoolList = ({ events }: EventPoolProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {events.map((event: EventPool) => (
        <EventPoolItem id={event.uid} key={event.uid} eventPool={event} />
      ))}
    </div>
  );
};
