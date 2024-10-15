import React from "react";
import EventPoolItem from "./EventsPoolListItem";
import { EventPoolItem } from "~/models/types/event_pool_item";

interface EventPoolProps {
  events: EventPoolItem[];
}

export const EventPoolList = ({ events }: EventPoolProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {events.map((event: EventPoolItem) => (
        <EventPoolItem id={event.uid} key={event.uid} eventPool={event} />
      ))}
    </div>
  );
};
