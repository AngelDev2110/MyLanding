export interface ExperienceEntry {
  role: string;
  period: string;
  type: string;
  highlights: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    period: "2023 — Present",
    type: "Full-time",
    highlights: [
      "Built and maintained enterprise-scale web applications with Vue.js and Nuxt.js",
      "Designed and implemented component libraries improving team development velocity",
      "Worked closely with UX/UI designers translating mockups into pixel-perfect interfaces",
      "Integrated REST APIs and managed state across complex multi-step user flows",
      "Participated in code reviews, sprint planning, and agile ceremonies",
    ],
    tags: ["Vue.js", "Nuxt.js", "TypeScript", "Sass", "REST APIs", "Git"],
  },
  {
    role: "Junior Frontend Developer",
    period: "2023",
    type: "Entry level",
    highlights: [
      "Kickstarted career building real-world UI features from design specifications",
      "Developed responsive layouts and reusable components in React and JavaScript",
      "Learned best practices around version control, code quality, and team workflows",
      "Collaborated with senior developers and absorbed mentorship to sharpen skills fast",
    ],
    tags: ["React", "JavaScript", "CSS", "GitHub", "Scrum"],
  },
  {
    role: "Self-Taught Developer",
    period: "2020 — 2022",
    type: "Learning phase",
    highlights: [
      "Self-taught HTML, CSS, JavaScript, and fundamentals of web development",
      "Built personal projects to practice frontend skills and explore modern frameworks",
      "Explored Vue.js, React, and the JavaScript ecosystem through documentation and courses",
      "Developed a strong problem-solving mindset and passion for clean, maintainable code",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Vue.js", "Self-taught"],
  },
];
