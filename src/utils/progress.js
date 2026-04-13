const PROGRESS_KEY = "progress_step";

export const ROUTE_STEPS = ["/", "/age", "/harry-potter-game", "/breakfast", "/feedback"];

const readStoredStep = () => {
  const raw = localStorage.getItem(PROGRESS_KEY);
  const parsed = Number.parseInt(raw || "", 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), ROUTE_STEPS.length - 1);
};

const getDerivedStep = () => {
  if (localStorage.getItem("feedback_submitted") === "true") return 4;
  if (localStorage.getItem("breakfast_confirmed") === "true") return 4;
  if (localStorage.getItem("hp_passed") === "true") return 3;
  if (localStorage.getItem("age") === "23") return 2;
  if (localStorage.getItem("mood")) return 1;
  return 0;
};

export const getLatestStep = () => {
  return Math.max(readStoredStep(), getDerivedStep());
};

export const getLatestPath = () => {
  return ROUTE_STEPS[getLatestStep()] || "/";
};

export const advanceToPath = (path) => {
  const target = ROUTE_STEPS.indexOf(path);
  if (target === -1) return;
  const next = Math.max(getLatestStep(), target);
  localStorage.setItem(PROGRESS_KEY, String(next));
};

