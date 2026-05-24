<script lang="ts">
  import { sectionStore } from "$lib/stores/section.svelte";
  import { sections } from "$lib/data/sections";

  let activeId = $derived(sectionStore.activeId);

  function selectSection(id: string) {
    sectionStore.select(id);

    if (sectionStore.activeId && window.innerWidth < 768) {
      // wait for the bubble to render, then scroll it into view
      requestAnimationFrame(() => {
        const bubble = document.querySelector(".cs-bubble");
        if (bubble) {
          bubble.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  }

  function getOpacity(index: number): number {
    const total = sections.length;
    return 1 - (index / (total - 1)) * 0.8;
  }
</script>

<div class="flex flex-col md:flex-row gap-12 md:gap-16 min-h-[60vh]">
  <div class="flex flex-col gap-3 md:gap-4 text-right ml-auto">
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
