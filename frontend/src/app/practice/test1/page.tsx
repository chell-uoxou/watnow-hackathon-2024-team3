"use client";

import { Timestamp } from "firebase/firestore";
import EventPoolItem from "~/features/eventPool/EventsPoolItem";
import { EventPool } from "~/models/types/event_pool";

export default function test1() {
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

  return (
    <div>
      <EventPoolItem id="1" eventPool={dummyEventPool1} />
      <EventPoolItem id="1" eventPool={dummyEventPool2} />
    </div>
  );
}
