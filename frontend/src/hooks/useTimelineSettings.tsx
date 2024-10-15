import { useAtom } from "jotai";
import { timelineSettingsAtom } from "~/stores/timelineSettings";

export const useTimelineSettings = () => {
  const [timelineSettings, setTimelineSettings] = useAtom(timelineSettingsAtom);
  return { timelineSettings, setTimelineSettings };
};
