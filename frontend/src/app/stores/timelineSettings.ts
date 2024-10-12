import { atom } from "jotai";

export type TimelineSettings = {
  gridHeight: number; // px
  gridInterval: 1 | 0.5 | 0.25; // hours
};

export const timelineSettingsAtom = atom({
  gridHeight: 80,
  gridInterval: 1,
});
