import { useAtom } from "jotai";
import { CalendarSession, calendarSessionAtom } from "~/stores/calendarSession";

export const useCalendarSession = () => {
  const [calendarSession, setCalendarSession] = useAtom(calendarSessionAtom);

  const updateCalendarSession = <T extends keyof CalendarSession>(
    key: T,
    value: CalendarSession[T]
  ) => {
    setCalendarSession((prev: CalendarSession) => ({ ...prev, [key]: value }));
  };

  return { calendarSession, setCalendarSession, updateCalendarSession };
};
