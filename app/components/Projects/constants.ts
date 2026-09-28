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
    image: "angel-front-themes.jpg",
  },
  {
    link: "https://www.angeldlt.dev/noob-draw",
    repo: "https://github.com/AngelDev2110/noob-draw",
    image: "noob-draw.jpg",
  },
  {
    // This site: no screenshot (the visitor is already looking at it), so its
    // card is compact and leads to the code
    link: "https://www.angeldlt.dev",
    repo: "https://github.com/AngelDev2110/MyLanding",
    image: null,
  },
];
