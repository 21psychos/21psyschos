<script>
  import * as Tooltip from "$lib/components/ui/tooltip";
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<div class="md:hidden">
  <Popover.Root>
    <Popover.Trigger class="text-sm font-medium underline underline-offset-4">Projects</Popover.Trigger>
    <Popover.Content class="flex flex-col gap-3 p-4">
      <a
        href="https://supatail.co.za/"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2"
      >
        <span
          aria-label="Supa Tail"
          role="img"
          class="block h-6 w-6 bg-foreground"
          style="mask: url('/Vector.svg') no-repeat center / contain; -webkit-mask: url('/Vector.svg') no-repeat center / contain;"
        ></span>
        <span>Supa Tail</span>
      </a>
    </Popover.Content>
  </Popover.Root>
</div>

<div class="hidden md:flex items-center gap-10">
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <a
          href="https://supatail.co.za/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Supa Tail"
        >
          <span
            aria-label="Supa Tail"
            role="img"
            class="block h-10 w-10 bg-foreground"
            style="mask: url('/Vector.svg') no-repeat center / contain; -webkit-mask: url('/Vector.svg') no-repeat center / contain;"
          ></span>
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Supa Tail</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
</div>
