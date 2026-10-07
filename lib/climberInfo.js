// Optional "About you" questions on a review. Everything here is optional and shown on the review,
// so readers can judge it ("a V4 climber says it's sandbagged"). Never required, never inferred.

export const CLIMBER_QUESTIONS = [
  {
    key: "boulderGrade",
    label: "Bouldering grade you usually climb",
    options: ["VB–V1", "V2–V3", "V4–V5", "V6–V7", "V8+"],
  },
  {
    key: "ropeGrade",
    label: "Rope grade you usually climb",
    options: ["5.5–5.9", "5.10", "5.11", "5.12", "5.13+"],
  },
  {
    key: "height",
    label: "Height",
    hint: "Reach matters on some problems",
    options: ["Under 5'3\" (160 cm)", "5'3\"–5'7\"", "5'8\"–6'0\"", "Over 6'0\" (183 cm)"],
  },
  {
    key: "gender",
    label: "Gender",
    options: ["Woman", "Man", "Non-binary", "Another identity"],
  },
  {
    key: "age",
    label: "Age range",
    options: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"],
  },
];

// One short line for a review, e.g. "Boulders V4–V5 · Ropes 5.11 · 5'3"–5'7" · Woman · 25–34"
export function climberSummary(climber) {
  if (!climber) return "";
  const parts = [];
  if (climber.boulderGrade) parts.push(`Boulders ${climber.boulderGrade}`);
  if (climber.ropeGrade) parts.push(`Ropes ${climber.ropeGrade}`);
  if (climber.height) parts.push(climber.height.replace(/ \(.*\)/, ""));
  if (climber.gender) parts.push(climber.gender);
  if (climber.age) parts.push(climber.age);
  return parts.join(" · ");
}
