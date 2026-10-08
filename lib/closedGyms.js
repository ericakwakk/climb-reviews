// Closed gyms: the card line and dates, plus the story shown on their gym page instead of ratings and reviews.
// Every fact needs a source (published, or my own firsthand knowledge). Never invent quotes or memories.

export const CLOSED_GYM_STORIES = {
  mphc: {
    years: "1992–2026",
    closedOn: "Closed September 30, 2026",
    cardLine: "NYC's first commercial climbing gym",
    climbing: "Bouldering, top rope and lead",
    // The page's story, in my own words: one string per paragraph. Empty = the section is hidden.
    text: [],
  },
};

export function storyFor(gym) {
  return CLOSED_GYM_STORIES[gym.slug];
}
