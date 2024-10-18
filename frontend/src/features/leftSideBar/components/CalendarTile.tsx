"use client";

import * as React from "react";

import { Calendar } from "~/components/ui/calendar";

import { useCalendarSession } from "~/hooks/useCalendarSession";

export function CalendarTile() {
  const { calendarSession, setCalendarSession } = useCalendarSession();

  return (
    <Calendar
      mode="single"
      selected={calendarSession.currentDate}
      onSelect={(date) => {
        if (date) {
          setCalendarSession({ ...calendarSession, currentDate: date });
        }
      }}
      className="rounded-md border"
    />
  );
}
