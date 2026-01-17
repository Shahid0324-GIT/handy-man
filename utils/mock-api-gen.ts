const NAMES = [
  "Samuel",
  "Sarah",
  "Alex",
  "Jordan",
  "Taylor",
  "Casey",
  "Riley",
  "Jamie",
];
const SURNAMES = [
  "Jackson",
  "Doe",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
];
const DOMAINS = ["gmail.com", "outlook.com", "company.com", "dev.io"];
const ROLES = ["Admin", "User", "Editor", "Moderator"];
const TITLES = [
  "How to use React",
  "The Future of AI",
  "Why TypeScript is King",
  "Next.js 15 Features",
];
const TAGS = ["tech", "news", "coding", "web", "life"];
const GROUPS = [
  "Frontend Devs",
  "Design Systems",
  "AI Enthusiasts",
  "Weekend Hikers",
];
const PRODUCTS = [
  "Pro Mechanical Keyboard",
  "4K Monitor",
  "Ergonomic Mouse",
  "USB-C Hub",
  "Noise Cancelling Headphones",
];

// Helper: Generic random picker (Replaces 'any')
const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const uuid = () => Math.random().toString(36).substring(2, 15);

export const generators = {
  users: (count: number) =>
    Array.from({ length: count }).map((_, i) => {
      const first = rand(NAMES);
      const last = rand(SURNAMES);
      return {
        id: i + 1,
        uuid: uuid(),
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@${rand(DOMAINS)}`,
        role: rand(ROLES),
        isActive: Math.random() > 0.2,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${first}${last}`,
      };
    }),
  posts: (count: number) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      title: rand(TITLES),
      slug: rand(TITLES).toLowerCase().replace(/ /g, "-"),
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      authorId: randInt(1, 10),
      likes: randInt(0, 500),
      isPublished: Math.random() > 0.1,
      tags: [rand(TAGS), rand(TAGS)],
    })),
  groups: (count: number) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      name: rand(GROUPS),
      description: `A community for people interested in ${rand(TAGS)}.`,
      memberCount: randInt(50, 5000),
      isPrivate: Math.random() > 0.5,
      createdAt: new Date(Date.now() - randInt(0, 10000000000)).toISOString(),
    })),
  products: (count: number) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      name: rand(PRODUCTS),
      price: randInt(50, 999),
      stock: randInt(0, 100),
      rating: randInt(3, 5),
      category: "Electronics",
    })),
  todos: (count: number) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      todo: `Task number ${i + 1} needs to be done.`,
      completed: Math.random() > 0.5,
      userId: randInt(1, 20),
    })),
};
