import { QuizQuestion } from "@/types";

export const breadcrumbItems = [
  { title: "Home", link: "/" },
  { title: "Courses", link: "/courses" },
  { title: "Course Details", link: "/courses/details" },
];

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What is the primary benefit of Server-Side Rendering (SSR) in Next.js?",
    options: [
      "Faster client-side navigation",
      "Improved SEO and faster initial page load",
      "Reduced server load",
      "Enables real-time database connections",
    ],
    correctAnswer: "Improved SEO and faster initial page load",
  },
  {
    id: 2,
    question:
      'When designing a scalable frontend, what does "code splitting" refer to?',
    options: [
      "Splitting your CSS into multiple files",
      "Using multiple git branches",
      "Breaking down the JavaScript bundle into smaller chunks loaded on demand",
      "Dividing components into 'atoms' and 'molecules'",
    ],
    correctAnswer:
      "Breaking down the JavaScript bundle into smaller chunks loaded on demand",
  },
  {
    id: 3,
    question:
      "In Next.js, what is the purpose of the `getStaticProps` function?",
    options: [
      "To fetch data at request time for SSR",
      "To fetch data on the client-side after hydration",
      "To fetch data at build time for Static Site Generation (SSG)",
      "To define API routes within the `pages` directory",
    ],
    correctAnswer:
      "To fetch data at build time for Static Site Generation (SSG)",
  },
  {
    id: 4,
    question: 'What is a "design system" in frontend development?',
    options: [
      "A CSS framework like Tailwind or Bootstrap",
      "A set of reusable components and guidelines to ensure brand consistency",
      "A specific folder structure for your project",
      "A tool for creating mockups like Figma or Sketch",
    ],
    correctAnswer:
      "A set of reusable components and guidelines to ensure brand consistency",
  },
  {
    id: 5,
    question: 'What is "hydration" in the context of SSR?',
    options: [
      "The process of fetching data from a database",
      "Minifying the JavaScript bundle",
      "The process where client-side JavaScript adds interactivity to the server-rendered HTML",
      "A security measure to prevent XSS attacks",
    ],
    correctAnswer:
      "The process where client-side JavaScript adds interactivity to the server-rendered HTML",
  },
];

export const mockLeaderboard = [
  {
    rank: 1,
    name: "Muhammed Fayad",
    score: 98,
    avatar: "https://picsum.photos/150",
  },
  {
    rank: 2,
    name: "Layla Hassan",
    score: 95,
    avatar: "https://picsum.photos/240",
  },
  {
    rank: 3,
    name: "Muhammed Yosry",
    score: 92,
    avatar: "https://picsum.photos/100",
  },
  {
    rank: 4,
    name: "Sara Khaled",
    score: 89,
    avatar: "https://picsum.photos/120",
  },
  {
    rank: 5,
    name: "Karim Ahmed",
    score: 87,
    avatar: "https://picsum.photos/180",
  },
  {
    rank: 6,
    name: "Noura Samir",
    score: 85,
    avatar: "https://picsum.photos/220",
  },
];
