"use client";
import {
  DragStartEvent,
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { useState } from "react";
import { DayTimelineEvent } from "~/features/dayTimeline/DayTimelineEvent";
import CalendarEditSidebar from "~/features/leftSidebar/CalendarEditSidebar";
import { EventPool } from "~/models/types/event_pool";
import SmallTitleWithIcon from "~/components/common/SmallTitleWithIcon";

export default function Page() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [events, setEvents] = useState<EventPool[]>([]);

  const handleStartDrag = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  return (
    <DndContext onDragStart={handleStartDrag}>
      <div className="flex">
        {/* 表示部分を別コンポーネントに分離 */}
        <CalendarEditSidebar events={events} setEvents={setEvents} />

        <div className="flex-1"></div>
        <div></div>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({}),
            duration: 0,
          }}
        >
          {activeId ? (
            <DayTimelineEvent
              isDragging
              event={
                events.find((event) => event.uid === activeId) as EventPool
              }
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
