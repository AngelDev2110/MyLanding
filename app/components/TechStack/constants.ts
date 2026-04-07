export type TechCategory = "frameworks" | "languages" | "tools";

export interface Tech {
  title: string;
  src: string;
  category: TechCategory;
}

export const TECH_LIST: Tech[] = [
  // Frameworks
  { title: "Vue.js", src: "vue.svg", category: "frameworks" },
  { title: "React", src: "react.svg", category: "frameworks" },
  { title: "Nuxt.js", src: "nuxtjs.svg", category: "frameworks" },
  { title: "Next.js", src: "nextjs.svg", category: "frameworks" },
  { title: "Tailwind CSS", src: "tailwindcss.svg", category: "frameworks" },
  // Languages
  { title: "TypeScript", src: "typescript.svg", category: "languages" },
  { title: "JavaScript", src: "javascript.svg", category: "languages" },
  { title: "Python", src: "python.svg", category: "languages" },
  { title: "Sass", src: "sass.svg", category: "languages" },
  // Tools
  { title: "Node.js", src: "nodejs.svg", category: "tools" },
  { title: "Docker", src: "docker.svg", category: "tools" },
  { title: "Git", src: "git.svg", category: "tools" },
  { title: "GitHub", src: "github.svg", category: "tools" },
  { title: "GitLab", src: "gitlab.svg", category: "tools" },
  { title: "Postman", src: "postman.svg", category: "tools" },
];

export const CATEGORIES: TechCategory[] = ["frameworks", "languages", "tools"];
