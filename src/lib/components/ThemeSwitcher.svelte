<script lang="ts">
  import { themeStore } from "$lib/stores/theme.svelte";

  function toggleTheme() {
    themeStore.toggle();
  }
</script>

<button
  onclick={toggleTheme}
  aria-label="Toggle theme"
  class="cursor-pointer transition-transform hover:scale-110"
>
  <div class="relative h-10 w-[194px]">
    <div
      class="absolute top-[4px] left-px h-full w-full bg-black blur-[2px] opacity-100"
      style="-webkit-mask: url('/21psychos.svg') no-repeat center / contain; mask: url('/21psychos.svg') no-repeat center / contain;"
    ></div>

    <div
      class="absolute inset-0 h-full w-full bg-accent"
      style="-webkit-mask: url('/21psychos.svg') no-repeat center / contain; mask: url('/21psychos.svg') no-repeat center / contain;"
    ></div>
  </div>
</button>
