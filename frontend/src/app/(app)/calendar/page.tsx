"use client";
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { collection, doc } from "firebase/firestore";
import { Pen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { DayTimelineEvent } from "~/features/dayTimeline/DayTimelineEvent";
import { EventInputDialog } from "~/features/eventPool/EventInputDialog";
import { EventPoolList } from "~/features/eventPool/EventPoolList";
import useCurrentAccount from "~/hooks/useCurrentAccount";
import { useFirestoreCollection } from "~/hooks/useFirestoreCollection";
import { db } from "~/lib/firebase";
import { EventPool } from "~/models/types/event_pool";

export default function Page() {
  const { currentDBAccount } = useCurrentAccount();
  const { list: listEventPool } = useFirestoreCollection<EventPool>(
    currentDBAccount !== "loading" && currentDBAccount?.uid
      ? collection(doc(db, "accounts", currentDBAccount.uid), "event_pool")
      : null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState<EventPool[]>([]);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useEffect(() => {
    if (listEventPool) {
      listEventPool().then((events) => {
        if (events) {
          console.log(events);
          setEvents(events);
        } else {
          console.log("No events found");
        }
      });
    }
  }, [listEventPool]);

  const handleStartDrag = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  if (currentDBAccount === "loading") {
    return <div>Loading...</div>;
  } else if (!currentDBAccount) {
    return <div>Not logged in</div>;
  } else {
    return (
      <DndContext onDragStart={handleStartDrag}>
        <div className=" p-6 flex flex-col gap-6 h-svh border-r border-brand-border-color w-[402px]">
          <div className="flex items-start gap-4 text-slate-900 text-sm justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="flex-1 text-2xl font-bold">イベント候補</h1>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <Button
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-1 pr-4 h-8"
                size={"sm"}
              >
                <Plus strokeWidth={"1.5px"} size={20} />
                追加
              </Button>
              <Button
                className="flex items-center gap-1 pr-4 h-8"
                size={"sm"}
                variant={"outline"}
              >
                <Pen strokeWidth={"1.5px"} size={16} />
                編集
              </Button>
            </div>
          </div>
          <p>
            予定タイムラインにイベントをドラッグ&ドロップして、予定を組むことができます。
          </p>
          <EventPoolList events={events} />
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
          <EventInputDialog isOpen={openDialog} onOpenChange={setOpenDialog} />
        </div>
        <div className="flex-1"></div>
      </DndContext>
    );
  }
}
