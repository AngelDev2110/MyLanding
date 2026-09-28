export interface ProjectLink {
  link: string;
  repo: string;
  image: string | null;
}

export const PROJECT_LINKS: ProjectLink[] = [
  {
    link: "https://www.angeldlt.dev/angel-front-themes",
    // The repo keeps its original name; the app was renamed after it
    repo: "https://github.com/AngelDev2110/angel-vue-themes",
    image: "angel-front-themes.png",
  },
  {
    link: "https://www.angeldlt.dev/noob-draw",
    repo: "https://github.com/AngelDev2110/noob-draw",
    image: "noob-draw.png",
  },
];
