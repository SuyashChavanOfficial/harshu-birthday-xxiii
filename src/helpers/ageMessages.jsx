export const wrongAgeMessages = [
  "Hmm… that doesn’t look right 🤨",
  "Are you trying to become younger? 😏",
  "Nice try… but I know your real age 😌",
  "Error 404: Correct age not found 😭",
  "You really thought I wouldn’t notice? 😂",
  "Suspicious activity detected 🚨",
  "That’s illegal… emotionally 😤",

  // ❤️ Personal / You
  "Even I know your age… and I forget everything 😌",
  "You can’t fool me… I’ve been studying you 😏",
  "Wrong answer… minus 10 points 😤",
  "You really think I’d let you age incorrectly? 😂",

  // 🧮 Math themed
  "Let’s do some math… that’s not 23 😌",
  "Incorrect input. Please re-calculate 😤",
  "Even your calculator is judging you right now 🤨",
  "This equation is not balanced 😭",
  "23 ≠ whatever you just entered 😏",
  "Try solving this again… properly this time 🧠",
  "Your answer is statistically incorrect 📉",

  // 🪄 Harry Potter themed
  "10 points from Gryffindor for that answer 😤",
  "Even the Sorting Hat is confused 🤨",
  "That’s not the magic number, muggle 😏",
  "Accio correct age… because that wasn’t it 😭",
  "The spell didn’t work… try again 🪄",
  "Dumbledore would be disappointed 🥲",
  "You’re close… but not close enough to Hogwarts standards 😌",

  // 😄 Cute / teasing
  "Be honest… I’m watching 👀",
  "Try again, birthday girl ❤️",
  "You’re making this harder than it needs to be 😂",
  "Almost like you *want* me to keep you here 😏",
  "Nope… still wrong 😌",
];

export const getRandomMessage = () => {
  const index = Math.floor(Math.random() * wrongAgeMessages.length);
  return wrongAgeMessages[index];
};
