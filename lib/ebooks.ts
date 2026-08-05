export type Ebook = {
  slug: string;
  title: string;
  author: string;
  subtitle: string;
  pages: number;
  fileKey: string;
  coverKey: string;
  fileSize: number;
};

export const atomicHabits: Ebook = {
  slug: "atomic-habits",
  title: "Atomic Habits",
  author: "James Clear",
  subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
  pages: 256,
  fileKey: "books/atomic-habits/atomic-habits.pdf",
  coverKey: "books/atomic-habits/cover.png",
  fileSize: 5111325
};
