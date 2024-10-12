"use client";
import {
  DragStartEvent,
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useState } from "react";
import { CardBodyWithLeftSidebar } from "~/features/appLayout/CardBodyWithLeftSidebar";
import { DayTimelineEvent } from "~/features/dayTimeline/DayTimelineEvent";
import CalendarEditSidebar from "~/features/leftSidebar/CalendarEditSidebar";
import { EventPool } from "~/models/types/event_pool";

export default function Page() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [events, setEvents] = useState<EventPool[]>([]);

  const handleStartDrag = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  return (
    <DndContext onDragStart={handleStartDrag}>
      <CardBodyWithLeftSidebar
        leftSidebar={
          <CalendarEditSidebar events={events} setEvents={setEvents} />
        }
      >
        <div>カレンダー</div>
      </CardBodyWithLeftSidebar>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({}),
          duration: 0,
        }}
      >
        {activeId ? (
          <DayTimelineEvent
            isDragging
            event={events.find((event) => event.uid === activeId) as EventPool}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
