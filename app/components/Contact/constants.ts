export type SocialKey = "linkedin" | "github" | "wakatime";

export interface SocialLink {
  key: SocialKey;
  href: string;
  icon: string;
  username: string;
  external: boolean;
  /** Rendered as a full card; otherwise shown as a text link below the cards. */
  featured: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/angel-de-la-torre-alcantar/",
    icon: "linkedin.svg",
    username: "Angel De La Torre",
    external: true,
    featured: true,
  },
  {
    key: "github",
    href: "https://github.com/AngelDev2110",
    icon: "github.svg",
    username: "@AngelDev2110",
    external: true,
    featured: true,
  },
  {
    key: "wakatime",
    href: "https://wakatime.com/@AngelDev21",
    icon: "wakatime.svg",
    username: "@AngelDev21",
    external: true,
    featured: false,
  },
];
