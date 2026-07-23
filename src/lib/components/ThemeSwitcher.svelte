<script lang="ts">
  import { themeStore } from "$lib/stores/theme.svelte";

  function toggleTheme() {
    themeStore.toggle();
  }


</script>

<div class="group relative inline-block">
  <button
    onclick={toggleTheme}
    aria-label="Toggle theme"
    class="cursor-pointer transition-transform hover:scale-110"
  >
    <div class="relative h-10 w-48.5">
      <div
        class="absolute top-1 left-px h-full w-full bg-black blur-[2px] opacity-100"
        style="-webkit-mask: url('/21psychos.svg') no-repeat center / contain; mask: url('/21psychos.svg') no-repeat center / contain;"
      ></div>

      <div
        class="absolute inset-0 h-full w-full bg-accent"
        style="-webkit-mask: url('/21psychos.svg') no-repeat center / contain; mask: url('/21psychos.svg') no-repeat center / contain;"
      ></div>
    </div>
  </button>

  <!-- Theme indicator icon — top-right of logo -->
  <span
    class="pointer-events-none absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full border border-accent text-xs leading-none"
  >
    🎨
  </span>

  <!-- Tooltip -->
  <span
    class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
  >
    Switch theme
  </span>
</div>
