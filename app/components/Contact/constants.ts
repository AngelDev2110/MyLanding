export type SocialKey = "linkedin" | "github";

export interface SocialLink {
  key: SocialKey;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/angel-de-la-torre-alcantar/",
  },
  {
    key: "github",
    href: "https://github.com/AngelDev2110",
  },
];
