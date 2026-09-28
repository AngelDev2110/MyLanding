import { PROJECT_LINKS } from "../Projects/constants";

export type TraitKey = "detail" | "clean" | "backend" | "collab";

export interface Trait {
  key: TraitKey;
  // Where the claim can be checked: the live app first, then its code
  demo?: string;
  repo?: string;
}

// PROJECT_LINKS pairs by index: 0 = Angel Front Themes, 1 = Noob Draw.
// A trait with nothing to link stays a plain claim, without the arrow
export const TRAITS: Trait[] = [
  { key: "detail", repo: "https://github.com/AngelDev2110/MyLanding" },
  { key: "clean", demo: PROJECT_LINKS[0]?.link, repo: PROJECT_LINKS[0]?.repo },
  { key: "backend", demo: PROJECT_LINKS[1]?.link, repo: PROJECT_LINKS[1]?.repo },
  { key: "collab" },
];
