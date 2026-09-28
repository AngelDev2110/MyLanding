export type TechCategory =
  | "frameworks"
  | "styling"
  | "languages"
  | "backend"
  | "workflow";

export interface Tech {
  title: string;
  src: string;
  category: TechCategory;
  // Logo drawn on a black disc: gets a light ring so it reads on the dark page
  onDark?: boolean;
}

export const TECH_LIST: Tech[] = [
  { title: "Vue.js", src: "vue.svg", category: "frameworks" },
  { title: "Nuxt.js", src: "nuxtjs.svg", category: "frameworks" },
  { title: "React", src: "react.svg", category: "frameworks" },
  { title: "Next.js", src: "nextjs.svg", category: "frameworks", onDark: true },
  { title: "Tailwind CSS", src: "tailwindcss.svg", category: "styling" },
  { title: "Sass", src: "sass.svg", category: "styling" },
  { title: "TypeScript", src: "typescript.svg", category: "languages" },
  { title: "JavaScript", src: "javascript.svg", category: "languages" },
  { title: "Python", src: "python.svg", category: "languages" },
  { title: "Node.js", src: "nodejs.svg", category: "backend" },
  { title: "Docker", src: "docker.svg", category: "backend" },
  { title: "Git", src: "git.svg", category: "workflow" },
  { title: "GitHub", src: "github.svg", category: "workflow" },
  { title: "GitLab", src: "gitlab.svg", category: "workflow" },
  { title: "Postman", src: "postman.svg", category: "workflow" },
];

// Order of the keys in the rendered package.json; keep each group at 4 items or fewer
export const CATEGORIES: TechCategory[] = [
  "frameworks",
  "styling",
  "languages",
  "backend",
  "workflow",
];
