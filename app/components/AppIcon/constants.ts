import type { IconName } from "./AppIcon.d.ts";

export const ICON_PATHS: Record<IconName, string[]> = {
  "arrow-right": ["M5 12h14", "M13 6l6 6-6 6"],
  "arrow-up-right": ["M7 17L17 7", "M8 7h9v9"],
  "arrow-down": ["M12 5v14", "M6 13l6 6 6-6"],
  copy: [
    "M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z",
    "M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
  ],
  mail: [
    "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
    "M3 7l9 6 9-6",
  ],
  check: ["M5 12.5l4.5 4.5L19 7"],
};
