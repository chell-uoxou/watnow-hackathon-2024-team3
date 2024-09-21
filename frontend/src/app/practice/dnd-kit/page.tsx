"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";
import EventsPoolItem from "~/features/eventPool/EventsPoolItem";

const Draggable = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
  };

  return (
    <EventsPoolItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      title="京都国立博物館"
      description="特別展を見学adsdgnslnflnslfglsnfgnsldfngljsflgnlsnfglslgnl"
      location="京都府京都市東山区"
      available_times={["2024-10-20T09:00:00", "2024-10-22T18:00:00"]}
      value={0}
      notes="notes"
    />
  );
};

export default function Page() {
  return (
    <DndContext>
      <Draggable />
    </DndContext>
  );
}
