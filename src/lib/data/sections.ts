export type Section = {
  id: string;
  heading: string;
  strikePrefix?: string;
  content: string;
};

export const sections: Section[] = [
  {
    id: "startup",
    strikePrefix: "startup corporate",
    heading: "stayup",
    content:
      "We're not your typical corporate entity. We started as a group of misfits who refused to play by the rules. No suits, no boardrooms, no buzzword bingo. Just raw energy and a relentless drive to build things that matter.",
  },
  {
    id: "modern-tech",
    heading: "modern tech",
    content:
      "We use whatever works. No loyalty to frameworks, no religious wars over languages. If it ships fast and doesn't break, it's in. Our stack evolves every week because stagnation is death.",
  },
  {
    id: "different",
    heading: "errr no, we're just different",
    content:
      "We don't fit into a box and we stopped trying. We're not an agency, not a studio, not a consultancy. We're 21psychos who happen to make incredible things together.",
  },
  {
    id: "25-hours",
    heading: "25 hours (corny we know...)",
    content:
      "We work when inspiration hits. Sometimes that's 3am on a Tuesday. Sometimes it's a 48-hour sprint fueled by nothing but curiosity. The clock doesn't own us — we own the clock.",
  },
  {
    id: "about-ai",
    heading: "about ai...",
    content:
      "AI is a tool, not a personality. We use it where it makes sense and ignore it where it doesn't. We're not replacing humans — we're amplifying them. The soul of the work stays human.",
  },
  {
    id: "know-no",
    heading: "know no",
    content:
      "We say no more than we say yes. No to projects that bore us. No to clients who don't get it. No to compromises that water down the vision. Saying no is how we protect what matters.",
  },
  {
    id: "why-the-name",
    heading: "why the name",
    content:
      "Because you have to be a little crazy to do what we do. 21 people who think differently, act differently, and build differently. Psychos in the best possible way.",
  },
  {
    id: "get-in-touch",
    heading: "get in touch",
    content:
      "If you're ready to build something that matters, something that breaks the mold, something that makes people stop and stare — we want to hear from you. No fluff, no nonsense. Just real talk.",
  }
  
];
