<script lang="ts">
  type Section = {
    id: string;
    heading: string;
    strikePrefix?: string;
    content: string;
  };

  const sections: Section[] = [
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
        "We don't fit into a box and we stopped trying. We're not an agency, not a studio, not a consultancy. We're 21 psychos who happen to make incredible things together.",
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
  ];

  let activeId = $state<string | null>(null);

  function selectSection(id: string) {
    activeId = activeId === id ? null : id;


    if (activeId && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function getOpacity(index: number): number {
    const total = sections.length;
    return 1 - (index / (total - 1)) * 0.8;
  }
</script>

<div class="flex flex-col md:flex-row gap-12 md:gap-16 min-h-[60vh]">
  <div class="flex-1 flex items-start pt-2">
    {#if activeId}
      {@const active = sections.find((s) => s.id === activeId)}
      {#if active}
        <p
          class="text-lg md:text-xl text-foreground leading-[40px] max-w-lg animate-in fade-in duration-300"
        >
          {active.content}
        </p>
      {/if}
    {/if}
  </div>
  <div class="flex flex-col gap-3 md:gap-4 text-right">
    {#each sections as section, i}
      <button
        onclick={() => selectSection(section.id)}
        class="text-right text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] origin-right leading-[100px] font-heading"
        class:text-primary={activeId === section.id}
        style="opacity: {activeId === null
          ? getOpacity(i)
          : activeId === section.id
            ? 1
            : getOpacity(i) * 0.6};"
      >
        {#if section.strikePrefix}<span
            class="text-muted-foreground line-through"
            >{section.strikePrefix}</span
          >{" "}{/if}{section.heading}
      </button>
    {/each}
  </div>
</div>
