import { atom } from "jotai";

export type CalendarSession = {
  currentDate: Date;
};

export const calendarSessionAtom = atom<CalendarSession>({
  currentDate: new Date(),
});
