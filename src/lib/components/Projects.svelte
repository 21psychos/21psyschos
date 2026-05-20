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
        <img src="/Vector.svg" alt="Supa Tail" class="h-6 w-auto" />
        <span>Supa Tail</span>
      </a>
      <a
        href="https://eliteentrepreneurschool.co.za"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2"
      >
        <img src="/ees-white.svg" alt="EES" class="h-6 w-auto" />
        <span>Elite Entrepreneur School</span>
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
        >
          <img src="/Vector.svg" alt="Supa Tail" class="h-10 w-auto" />
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Supa Tail</p>
      </Tooltip.Content>
    </Tooltip.Root>

    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <a
          href="https://eliteentrepreneurschool.co.za"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/ees-white.svg" alt="EES" class="h-10 w-auto" />
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Elite Entrepreneur School</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
</div>
