export type TraitKey = "detail" | "clean" | "backend" | "collab";

export interface Trait {
  key: TraitKey;
  href: string;
}

// Every claim links to where it can be checked: a repo or a section of this page
export const TRAITS: Trait[] = [
  { key: "detail", href: "https://github.com/AngelDev2110/MyLanding" },
  { key: "clean", href: "https://github.com/AngelDev2110/angel-vue-themes" },
  { key: "backend", href: "https://github.com/AngelDev2110/noob-draw" },
  { key: "collab", href: "#experience" },
];
