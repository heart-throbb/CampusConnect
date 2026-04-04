export const posts = [
  {
    _id: "1",
    title: "How to prepare for DSA?",
    content: "I am struggling with DSA. Any tips?",
    user: { email: "test@baka.com" },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Best resources for React?",
    content: "Can someone suggest good React learning resources?",
    user: { email: "baka@uni.com" },
    createdAt: new Date(Date.now() - 10000000).toISOString(),
  },
  {
    _id: "3",
    title: "Best resources for JS?",
    content: "Can someone suggest good JS learning resources?",
    user: { email: "test@baka.com" },
    createdAt: new Date(Date.now() - 20000000).toISOString(),
  },
  {
    _id: "4",
    title: "Best resources for AI?",
    content: "Can someone suggest good AI learning resources?",
    user: { email: "baka@baka.com" },
    createdAt: new Date(Date.now() - 40000000).toISOString(),
  },
];

export const answersData = {
  1: [
    {
      _id: "a1",
      content: "Start with arrays and linked lists.",
      user: { email: "student@uni.com" },
      createdAt: new Date().toISOString(),
    },
  ],
  2: [
    {
      _id: "a2",
      content: "Try official docs + YouTube.",
      user: { email: "coder@uni.com" },
      createdAt: new Date().toISOString(),
    },
  ],
  3: [
    {
      _id: "a3",
      content: "Start with HTML and CSS and than Try official docs + YouTube.",
      user: { email: "coder@uni.com" },
      createdAt: new Date().toISOString(),
    },
  ],
  4: [
    {
      _id: "a4",
      content: "Try official docs + YouTube.",
      user: { email: "coder@uni.com" },
      createdAt: new Date().toISOString(),
    },
  ],
};
