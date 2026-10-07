// Stories for closed gyms, shown on their gym page instead of ratings and reviews.
// Facts come from published sources (listed) or my own firsthand knowledge. Never invent quotes or memories.

export const CLOSED_GYM_STORIES = {
  mphc: {
    years: "1992–2026",
    closedOn: "Closed September 30, 2026",
    cardLine: "NYC's first commercial climbing gym",
    climbing: "Bouldering, top rope and lead",
    intro:
      "For 34 years, a converted racquetball court in Hell's Kitchen was where a lot of New York learned to climb. It opened in 1992 as, according to the club, the city's first commercial climbing gym, and it stayed small, affordable and welcoming until the day it closed.",
    numbers: [
      { value: "1992", label: "Opened" },
      { value: "34", label: "Years on the wall" },
      { value: "$49", label: "A month, at the end" },
      { value: "Weekly", label: "Route resets" },
    ],
    timeline: [
      {
        when: "1992",
        what: "Opens in a former racquetball court at Manhattan Plaza, 482 West 43rd Street. According to the club, it's New York City's first commercial climbing gym.",
      },
      {
        when: "Its final years",
        what: "About 5,000 square feet of climbing, with bouldering, top rope and lead, and routes reset weekly. A climbing membership costs $49 a month, one of the most affordable in the city, and the gym runs free climbing for women on Fridays and youth programs.",
      },
      {
        when: "September 2026",
        what: "The club announces the climbing gym will close. A petition to keep it open gathers thousands of signatures.",
      },
      {
        when: "Friday, September 25, 2026",
        what: "Farewell party. Climbers come back one more time to climb, reunite and say goodbye.",
      },
      {
        when: "Saturday, September 26, 2026",
        what: "Members rally outside the club, asking for the closing to be reconsidered or delayed.",
      },
      {
        when: "Wednesday, September 30, 2026",
        what: "The climbing gym closes its doors for the last time, after 34 years.",
      },
    ],
    // Photos and memories are collected by hand (with permission). Empty slots show until then.
    photos: [],
    memories: [],
    sources: [
      { label: "MPHC: Climbing Gym Closure – September 30", url: "https://mphc.com/climbing-gym-closure-september-30/" },
      { label: "W42ST: One Last Climb for a Hell's Kitchen Gym That Helped Raise a Generation", url: "https://w42st.com/post/manhattan-plaza-health-club-climbing-gym-closing/" },
      { label: "Time Out New York: NYC's oldest climbing gym is closing after 34 years", url: "https://www.timeout.com/newyork/news/nycs-oldest-climbing-gym-to-close-after-34-years-and-be-replaced-by-a-200-an-hour-tennis-simulator-092826" },
      { label: "Hoodline: Hell's Kitchen climbing gym shuts doors after 34 years on the wall", url: "https://hoodline.com/2026/09/hell-s-kitchen-climbing-gym-shuts-doors-after-34-years-on-the-wall/" },
    ],
  },
};

export function storyFor(gym) {
  return CLOSED_GYM_STORIES[gym.slug];
}
