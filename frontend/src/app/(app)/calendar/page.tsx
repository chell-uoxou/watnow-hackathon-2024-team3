"use client";
import { collection, doc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { EventInputDialog } from "~/features/eventPool/EventInputDialog";
import { EventPoolList } from "~/features/eventPool/EventPoolList";
import useCurrentAccount, { isReady } from "~/hooks/useCurrentAccount";
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

  // const handleClickAddEventPool = async () => {
  //   console.log(currentDBAccount, currentEventPool);
  //   if (isReady(currentDBAccount) && currentEventPool.add !== null) {
  //     console.log("つくるかね");

  //     await currentEventPool.add({
  //       title: "散歩しよう",
  //       description: "",
  //       location: "",
  //       attached_image: "",
  //       available_times: [
  //         {
  //           start_time: Timestamp.fromDate(new Date()),
  //           end_time: Timestamp.fromDate(
  //             new Date(Date.now() + 4 * 60 * 60 * 1000)
  //           ),
  //         },
  //       ],
  //       default_duration: 60,
  //       default_budget: {
  //         mode: "per_person",
  //         value: 0,
  //       },
  //       needs_preparation: false,
  //       preparation_task: "",
  //       max_participants: 1,
  //       notes: "",
  //     });
  //     console.log("つくった");
  //   }
  // };

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

  if (currentDBAccount === "loading") {
    return <div>Loading...</div>;
  } else if (!currentDBAccount) {
    return <div>Not logged in</div>;
  } else {
    return (
      <div>
        <div>Welcome {currentDBAccount.default_display_name}</div>
        {/* <Button onClick={handleClickAddEventPool} className="hidden">
          Add Event Pool
        </Button> */}
        <EventPoolList events={events} />
        <Button onClick={() => setOpenDialog(true)}>イベント候補を追加</Button>
        <EventInputDialog isOpen={openDialog} onOpenChange={setOpenDialog} />
      </div>
    );
  }
}
