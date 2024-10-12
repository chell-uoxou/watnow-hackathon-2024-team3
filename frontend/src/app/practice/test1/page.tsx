"use client";

import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import { Timestamp } from "firebase/firestore";
import { useCallback, useState } from "react";
import { DayTimelineEvent } from "~/features/dayTimeline/DayTimelineEvent";
import EventPoolItem from "~/features/eventPool/EventsPoolItem";
import { EventPool } from "~/models/types/event_pool";

const Droppable = () => {
  const { setNodeRef } = useDroppable({ id: "dnd-practice-droppable" });
  return (
    <div
      className="w-96 h-96 bg-gray-200 flex items-center justify-center rounded-lg"
      ref={setNodeRef}
    >
      Drop here
    </div>
  );
};

export default function Page() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [isOverDraggable, setIsOverDraggable] = useState(false);

  const dummyEventPool1: EventPool = {
    uid: "1",
    title: "京都国立博物館",
    description: "特別展を見学",
    location: "京都府京都市東山区",
    attached_image: "",
    available_times: [
      {
        start_time: Timestamp.fromDate(new Date("2024-10-20T09:00:00")),
        end_time: Timestamp.fromDate(new Date("2024-10-20T18:00:00")),
      },
      {
        start_time: Timestamp.fromDate(new Date("2024-10-21T09:00:00")),
        end_time: Timestamp.fromDate(new Date("2024-10-21T18:00:00")),
      },
    ],
    default_duration: 0,
    default_budget: {
      mode: "per_person",
      value: 0,
    },
    needs_preparation: false,
    preparation_task: "予習",
    max_participants: 0,
    notes: "notes",
  };

  const dummyEventPool2: EventPool = {
    uid: "2",
    title: "京都タワー",
    description: "展望台に登る",
    location: "京都府京都市下京区",
    attached_image: "",
    available_times: [
      {
        start_time: Timestamp.fromDate(new Date("2024-10-20T10:00:00")),
        end_time: Timestamp.fromDate(new Date("2024-10-20T21:00:00")),
      },
      {
        start_time: Timestamp.fromDate(new Date("2024-10-21T10:00:00")),
        end_time: Timestamp.fromDate(new Date("2024-10-21T21:00:00")),
      },
    ],
    default_duration: 90,
    default_budget: {
      mode: "per_person",
      value: 900,
    },
    needs_preparation: true,
    preparation_task: "オンラインチケットの購入",
    max_participants: 0,
    notes: "",
  };

  const events = [dummyEventPool1, dummyEventPool2];
  const handleStartDrag = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
    },
    [setActiveId]
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    console.log("drag over");
    console.log(event);
    if (event.over === null) {
      setIsOverDraggable(false);
    } else {
      setIsOverDraggable(true);
    }
  }, []);

  const handleDragCancel = () => {
    console.log("drag cancel");
    setIsOverDraggable(false);
  };

  const handleDragEnd = () => {
    console.log("drag end");
    setIsOverDraggable(false);
  };

  return (
    <DndContext
      onDragStart={handleStartDrag}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
    >
      <div className="flex">
        <div className="p-10 flex flex-col gap-4">
          <EventPoolItem id="1" eventPool={dummyEventPool1} />
          <EventPoolItem id="2" eventPool={dummyEventPool2} />
        </div>
        <div className="p-10 flex-1">
          <Droppable />
        </div>
      </div>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({}),
          duration: 0,
        }}
        className={isOverDraggable ? "cursor-copy" : ""}
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
