export type Section = {
  id: string;
  heading: string;
  strikePrefix?: string;
  content: string;
};

export const sections: Section[] = [
  {
    id: "what-we-do",
    heading: "what we do?",
    content:
      "At our core, we're a software company. We build private projects for clients who need something done right, from web platforms to bespoke tools. Alongside the client work, we ship our own apps too. Ideas we believe in, built on our own terms.",
  },
  {
    id: "modern-tech",
    heading: "modern tech",
    content:
      "We stick with fast, modern frameworks. The kind with active communities, sharp tooling, and a track record of shipping. No legacy baggage, no fads. Just proven tech that keeps us building at full speed.",
  },
  {
    id: "25-hours",
    heading: "25 hours (corny we know...)",
    content:
      "We work when inspiration hits. Sometimes that's 3am on a Tuesday. Sometimes it's a 48-hour sprint fueled by nothing but curiosity. The clock doesn't own us — we own the clock.",
  },
        {
    id: "different",
    heading: "errr we're just different",
    content:
      "We don't fit into a box and we stopped trying. We're not an agency, not a studio, not a consultancy. We're 21psychos who happen to make incredible things together.",
  },
  {
    id: "about-ai",
    heading: "about ai...",
    content:
      "AI is a tool, not a personality. We use it where it makes sense and ignore it where it doesn't. We're not replacing humans — we're amplifying them. The soul of the work stays human.♥️",
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
      "The name pulls from cyberpunk: neon-soaked grit, rebel hackers, and a future built by outsiders. The 21 is personal. It's the birthday of someone special to us, quietly stitched into everything we make.",
  },
  {
    id: "get-in-touch",
    heading: "get in touch",
    content:
      "If you're ready to build something that matters, something that breaks the mold, something that makes people stop and stare — we want to hear from you. No fluff, no nonsense. Just real talk.",
  },
];
