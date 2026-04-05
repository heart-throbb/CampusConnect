export const AVAILABLE_TAGS = [
  "DSA",
  "JavaScript",
  "TypeScript",
  "React",
  "Python",
  "C++",
  "Java",
  "AI / ML",
  "Web Dev",
  "Database",
  "Career",
  "Other",
];

export const posts = [
  {
    _id: "1",
    title: "How to prepare for DSA?",
    content:
      "I am struggling with DSA. Any tips on where to start and what resources to follow?",
    user: { email: "test@baka.com" },
    createdAt: new Date().toISOString(),
    tags: ["DSA", "C++"],
  },
  {
    _id: "2",
    title: "Best resources for React?",
    content:
      "Can someone suggest good React learning resources? Books, YouTube channels, or docs?",
    user: { email: "baka@uni.com" },
    createdAt: new Date(Date.now() - 10000000).toISOString(),
    tags: ["React", "JavaScript", "Web Dev"],
  },
  {
    _id: "3",
    title: "Best resources for JS?",
    content:
      "Can someone suggest good JavaScript learning resources? I am a complete beginner.",
    user: { email: "test@baka.com" },
    createdAt: new Date(Date.now() - 20000000).toISOString(),
    tags: ["JavaScript", "Web Dev"],
  },
  {
    _id: "4",
    title: "Best resources for AI?",
    content:
      "Can someone suggest good AI / ML learning resources? Any courses or books?",
    user: { email: "baka@baka.com" },
    createdAt: new Date(Date.now() - 40000000).toISOString(),
    tags: ["AI / ML", "Python"],
  },
  {
    _id: "5",
    title: "How to ace coding interviews?",
    content:
      "Looking for advice on cracking top tech company interviews. What should I focus on?",
    user: { email: "haris@uni.com" },
    createdAt: new Date(Date.now() - 80000000).toISOString(),
    tags: ["DSA", "Career"],
  },
  {
    _id: "6",
    title: "TypeScript vs JavaScript — which to learn first?",
    content:
      "I keep seeing TypeScript everywhere. Should I learn JavaScript first or jump straight to TypeScript?",
    user: { email: "ali@uni.com" },
    createdAt: new Date(Date.now() - 120000000).toISOString(),
    tags: ["JavaScript", "TypeScript"],
  },
];

export const answersData = {
  1: [
    {
      _id: "a1",
      content:
        "Start with arrays and linked lists. Then move to trees, graphs, and DP. LeetCode is your best friend.",
      user: { email: "student@uni.com" },
      createdAt: new Date().toISOString(),
      votes: 5,
      votesMap: {},
    },
  ],
  2: [
    {
      _id: "a2",
      content:
        "The official React docs (react.dev) are excellent. Pair that with Scrimba's React course on YouTube.",
      user: { email: "coder@uni.com" },
      createdAt: new Date().toISOString(),
      votes: 3,
      votesMap: {},
    },
  ],
  3: [
    {
      _id: "a3",
      content:
        "Start with the official MDN docs, then try javascript.info — it's the most thorough free resource available.",
      user: { email: "coder@uni.com" },
      createdAt: new Date().toISOString(),
      votes: 4,
      votesMap: {},
    },
  ],
};
