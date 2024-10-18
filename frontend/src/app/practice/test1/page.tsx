"use client";

import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  Modifier,
  useDroppable,
} from "@dnd-kit/core";
import clsx from "clsx";
import { Timestamp } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { DayTimelineEvent } from "~/features/dayTimeline/DayTimelineEvent";
import EventPoolListItem from "~/features/eventPool/EventsPoolListItem";
import { Timeline } from "~/features/timeline/Timeline";
import { useTimelineSettings } from "~/hooks/useTimelineSettings";
import { DBEventPoolItem } from "~/lib/firestore/utils";

const Droppable = () => {
  const { timelineSettings } = useTimelineSettings();
  const { setNodeRef } = useDroppable({ id: "dnd-practice-droppable" });
  return (
    <div
      className="flex items-center justify-center rounded-lg"
      ref={setNodeRef}
    >
      <Timeline
        itemHeight={timelineSettings.gridHeight}
        interval={timelineSettings.gridInterval}
      />
    </div>
  );
};

export default function Page() {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [isOverDraggable, setIsOverDraggable] = useState(false);
  const [modifier, setModifier] = useState<Parameters<Modifier>[0] | null>(
    null
  );
  const modifierRef = useRef<Parameters<Modifier>[0] | null>(null);
  const topInDayTimeline = useRef<number | null>(null);
  const scrollTopInDayTimeline = useRef<number | null>(null);
  const minutesFromMidnight = useRef<number | null>(null);
  const quantizedMinutesFromMidnight = useRef<number | null>(null);

  const { timelineSettings } = useTimelineSettings();

  const dummyEventPool1: DBEventPoolItem = {
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
  const dummyEventPool2: DBEventPoolItem = {
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

  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const minutesInHour = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutesInHour
      .toString()
      .padStart(2, "0")}`;
  };

  const eventItemModifier: Modifier = (args) => {
    let modifiedTransform = args.transform;

    modifierRef.current = args;
    if (args.over && args.over.id === "dnd-practice-droppable") {
      topInDayTimeline.current =
        (args.overlayNodeRect?.top ?? 0) +
        args.transform.y +
        (scrollTopInDayTimeline.current ?? 0);

      minutesFromMidnight.current = Math.floor(
        (topInDayTimeline.current / timelineSettings.gridHeight) *
          timelineSettings.gridInterval *
          60
      );

      minutesFromMidnight.current =
        minutesFromMidnight.current <= 0
          ? 0
          : minutesFromMidnight.current >= 1440
          ? 1440
          : minutesFromMidnight.current;

      quantizedMinutesFromMidnight.current =
        Math.floor(minutesFromMidnight.current / 15) * 15;

      modifiedTransform = {
        ...modifiedTransform,
        x: 450,
        y:
          (quantizedMinutesFromMidnight.current / 60) *
            timelineSettings.gridHeight -
          (scrollTopInDayTimeline.current ?? 0) -
          (args.overlayNodeRect?.top ?? 0),
      };
    }
    return modifiedTransform;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setModifier(modifierRef.current);
    }, 100);
    return () => clearInterval(interval);
  }, [modifierRef]);

  return (
    <DndContext
      onDragStart={handleStartDrag}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      modifiers={[eventItemModifier]}
    >
      <div className="flex h-svh">
        <div className="p-10 flex flex-col gap-4">
          <EventPoolListItem id="1" eventPool={dummyEventPool1} />
          <EventPoolListItem id="2" eventPool={dummyEventPool2} />
        </div>
        <ScrollArea
          className="size-full"
          onScroll={(e) => {
            scrollTopInDayTimeline.current = e.currentTarget.scrollTop;
          }}
        >
          <Droppable />
        </ScrollArea>
      </div>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({}),
          duration: 0,
        }}
        className={clsx(isOverDraggable ? "cursor-copy" : "", "relative")}
      >
        <div className="absolute flex flex-col translate-y-32">
          {[
            {
              value: modifier?.active?.id,
              key: "active.id",
            },
            {
              value: modifier?.over?.id,
              key: "over.id",
            },
            {
              value: `${modifier?.activeNodeRect?.top}, ${modifier?.activeNodeRect?.left}, ${modifier?.activeNodeRect?.bottom}, ${modifier?.activeNodeRect?.right}`,
              key: "activeNodeRect",
            },
            {
              value: `${modifier?.overlayNodeRect?.top}, ${modifier?.overlayNodeRect?.left}, ${modifier?.overlayNodeRect?.bottom}, ${modifier?.overlayNodeRect?.right}`,
              key: "overlayNodeRect",
            },
            {
              value: `${modifier?.containerNodeRect?.top}, ${modifier?.containerNodeRect?.left}, ${modifier?.containerNodeRect?.bottom}, ${modifier?.containerNodeRect?.right}`,
              key: "containerNodeRect",
            },
            {
              value: `${modifier?.draggingNodeRect?.top}, ${modifier?.draggingNodeRect?.left}, ${modifier?.draggingNodeRect?.bottom}, ${modifier?.draggingNodeRect?.right}`,
              key: "draggingNodeRect",
            },
            {
              value: `${modifier?.windowRect?.top}, ${modifier?.windowRect?.left}`,
              key: "windowRect",
            },
            {
              value: `${modifier?.transform?.x}, ${modifier?.transform?.y}`,
              key: "transform",
            },
            {
              value: `${modifier?.scrollableAncestorRects
                .map((rect) => `[${rect.top}, ${rect.left}]`)
                .join(", ")}`,
              key: "scrollableAncestorRects",
            },
            {
              value: minutesFromMidnight.current,
              key: "minutesFromMidnight",
            },
            {
              value: topInDayTimeline.current,
              key: "topInDayTimeline",
            },
            {
              value: formatMinutes(quantizedMinutesFromMidnight.current ?? 0),
              key: "quantizedMinutesFromMidnight",
            },
          ].map((item) => (
            <div key={item.key} className="font-mono flex gap-2">
              <span className="font-bold">{item.key}</span>
              {item.value}
            </div>
          ))}
        </div>
        {activeId ? (
          <DayTimelineEvent
            isDragging
            event={
              events.find((event) => event.uid === activeId) as DBEventPoolItem
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
