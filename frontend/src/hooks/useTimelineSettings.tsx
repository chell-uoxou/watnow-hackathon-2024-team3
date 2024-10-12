import { useAtom } from "jotai";
import { timelineSettingsAtom } from "~/app/stores/timelineSettings";

export const useTimelineSettings = () => {
  const [timelineSettings, setTimelineSettings] = useAtom(timelineSettingsAtom);
  return { timelineSettings, setTimelineSettings };
};
