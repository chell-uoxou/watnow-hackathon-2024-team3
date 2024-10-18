import { useAtom } from "jotai";
import { calendarSessionAtom } from "~/stores/calendarSession";

export const useCalendarSession = () => {
  const [calendarSession, setCalendarSession] = useAtom(calendarSessionAtom);
  return { calendarSession, setCalendarSession };
};
