<script lang="ts">
  import { sectionStore } from "$lib/stores/section.svelte";
  import { sections } from "$lib/data/sections";
  import Button from "$lib/components/ui/button/button.svelte";

  let { size = 340 }: { size?: number } = $props();

  const CONTACT_EMAIL = "admin@21psychos.com";

  let unleashed = $state(false);
  let copied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;
  let showPrompt = $state(false);
  let currentPromptIndex = $state(0);

  const PROMPT_MESSAGES = [
    "Click me if you wanna see my go psycho! 💀",
    "My Reaction when gas prices go down(Click Me)! 👀",
    "Me when someone says pineapple belongs on pizza (Click)! 😈",
    "POV: You just remembered an embarrassing moment (Tap me)! ⚡",
    "When the WiFi goes out for 5 seconds (Click to relate)! 🔥"
  ];

  // ---------- eye tracking ----------
  let svgEl = $state<SVGSVGElement | null>(null);
  // start centered in the sockets so SSR markup is stable
  let mouseVX = $state(120);
  let mouseVY = $state(118);

  // socket centers and max pupil offsets (kept inside the black ellipses)
  const SOCKETS = [
    { cx: 84, cy: 118, maxX: 14, maxY: 18 },
    { cx: 156, cy: 118, maxX: 14, maxY: 18 },
  ] as const;

  function pupilPos(socket: (typeof SOCKETS)[number]) {
    const dx = mouseVX - socket.cx;
    const dy = mouseVY - socket.cy;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return { x: socket.cx, y: socket.cy };
    const angle = Math.atan2(dy, dx);
    // ramp up movement over ~140 viewbox units, then saturate
    const factor = Math.min(1, dist / 140);
    return {
      x: socket.cx + Math.cos(angle) * socket.maxX * factor,
      y: socket.cy + Math.sin(angle) * socket.maxY * factor,
    };
  }

  const leftPupil = $derived(pupilPos(SOCKETS[0]));
  const rightPupil = $derived(pupilPos(SOCKETS[1]));

  $effect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    function onMove(e: MouseEvent) {
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseVX = ((e.clientX - rect.left) / rect.width) * 240;
      mouseVY = ((e.clientY - rect.top) / rect.height) * 290;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  });

  function toggle() {
    unleashed = !unleashed;
  }

  // Random prompt appearance
  $effect(() => {
    if (typeof window === "undefined" || unleashed) return;

    function scheduleNextPrompt() {
      // Show prompt randomly between 8-15 seconds
      const delay = Math.random() * 7000 + 8000;
      const timeout = setTimeout(() => {
        // Pick a random message
        currentPromptIndex = Math.floor(Math.random() * PROMPT_MESSAGES.length);
        showPrompt = true;
        // Hide after 3 seconds
        setTimeout(() => {
          showPrompt = false;
          scheduleNextPrompt();
        }, 3000);
      }, delay);

      return () => clearTimeout(timeout);
    }

    return scheduleNextPrompt();
  });

  async function copyEmail() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
      } else if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = CONTACT_EMAIL;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      copied = true;
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copied = false;
      }, 1800);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }

  let activeSection = $derived(
    sectionStore.activeId
      ? sections.find((s) => s.id === sectionStore.activeId)
      : null,
  );
</script>

<div
  class="cs-wrap"
  class:active={unleashed}
  class:thinking={!!activeSection}
  style="--cs-size: {size}px;"
>
  <button class="cs-header" type="button" onclick={toggle}>
    <!-- <span class="cs-header-text" data-text={unleashed ? "AAARGH!!!" : "▸ TAP TO UNLEASH"}>
      {unleashed ? "AAARGH!!!" : "▸ TAP TO UNLEASH"}
    </span> -->
  </button>

  {#if activeSection}
    <div class="cs-thought" role="status" aria-live="polite">
      <span class="cs-thought-dot cs-thought-dot-2" aria-hidden="true"></span>
      <span class="cs-thought-dot cs-thought-dot-1" aria-hidden="true"></span>
      <div class="cs-bubble">
        <p class="cs-bubble-text">{activeSection.content}</p>
        {#if activeSection.id === 'get-in-touch'}
          <Button class='cursor-pointer' onclick={copyEmail} aria-label="Copy email address">
            {copied ? "Copied!" : CONTACT_EMAIL}
          </Button>
        {/if}
      </div>
    </div>
  {/if}

  <button
    class="cs-skull"
    type="button"
    onclick={toggle}
    aria-pressed={unleashed}
    aria-label={unleashed ? "Calm the skull" : "Unleash the skull"}
  >
    <div class="cs-stage">
      <svg
        class="cs-svg"
        viewBox="0 0 240 290"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        bind:this={svgEl}
      >
        <!-- ground shadow -->
        <ellipse class="cs-shadow" cx="120" cy="278" rx="78" ry="6" />

        <!-- glow ring (only on active) -->
        <circle
          class="cs-glow"
          cx="120"
          cy="135"
          r="118"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-dasharray="6 10"
        />

        <!-- skull body -->
        <g class="cs-body">
          <!-- cranium + jaw, single rounded cartoon shape -->
          <path
            class="cs-cranium"
            d="M 120 22
               C 48 22, 22 72, 28 132
               C 32 170, 56 190, 76 196
               L 76 224
               C 76 244, 90 256, 112 256
               L 130 256
               C 152 256, 164 244, 164 224
               L 164 196
               C 184 190, 208 170, 212 132
               C 218 72, 192 22, 120 22 Z"
            fill="var(--cs-skull-fill, #fff)"
            stroke="#000"
            stroke-width="6"
            stroke-linejoin="round"
          />

          <!-- eye sockets -->
          <ellipse cx="84" cy="118" rx="26" ry="30" fill="#000" />
          <ellipse cx="156" cy="118" rx="26" ry="30" fill="#000" />

          <!-- nose -->
          <path
            d="M 120 150 L 108 178 Q 120 170 132 178 Z"
            fill="#000"
          />

          <!-- crack detail -->
          <path
            d="M 80 50 Q 75 65 84 80 Q 78 92 86 102"
            stroke="#000"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          />

          <!-- ====== IDLE FACE ====== -->
          <g class="cs-idle">
            <!-- pupils that follow the cursor -->
            <circle class="cs-pupil" cx={leftPupil.x} cy={leftPupil.y} r="6" fill="#fff" />
            <circle class="cs-pupil" cx={rightPupil.x} cy={rightPupil.y} r="6" fill="#fff" />
            <!-- closed zigzag teeth -->
            <path
              d="M 80 218 L 90 226 L 100 218 L 110 226 L 120 218 L 130 226 L 140 218 L 150 226 L 160 218"
              stroke="#000"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>

          <!-- ====== UNLEASHED FACE ====== -->
          <g class="cs-rage">
            <!-- big X eyes -->
            <g class="cs-x cs-x-left">
              <line x1="68" y1="102" x2="100" y2="134" />
              <line x1="100" y1="102" x2="68" y2="134" />
            </g>
            <g class="cs-x cs-x-right">
              <line x1="140" y1="102" x2="172" y2="134" />
              <line x1="172" y1="102" x2="140" y2="134" />
            </g>

            <!-- gaping mouth -->
            <rect
              x="74"
              y="210"
              width="92"
              height="40"
              rx="6"
              fill="#000"
            />
            <!-- top teeth -->
            <rect x="78" y="210" width="14" height="16" fill="#fff" stroke="#000" stroke-width="2.5" />
            <rect x="96" y="210" width="14" height="16" fill="#fff" stroke="#000" stroke-width="2.5" />
            <rect x="114" y="210" width="14" height="16" fill="#fff" stroke="#000" stroke-width="2.5" />
            <rect x="132" y="210" width="14" height="16" fill="#fff" stroke="#000" stroke-width="2.5" />
            <rect x="150" y="210" width="14" height="16" fill="#fff" stroke="#000" stroke-width="2.5" />

            <!-- tongue -->
            <g class="cs-tongue">
              <path
                d="M 96 234 Q 96 270 114 272 L 126 272 Q 144 270 144 234 Z"
                fill="#FF4D88"
                stroke="#000"
                stroke-width="3"
                stroke-linejoin="round"
              />
              <path
                d="M 120 240 L 120 268"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.55"
              />
            </g>
          </g>
        </g>
      </svg>

      <!-- sparkles -->
      <span class="cs-spark cs-spark-1">★</span>
      <span class="cs-spark cs-spark-2">!</span>
      <span class="cs-spark cs-spark-3">?</span>
      <span class="cs-spark cs-spark-4">✦</span>
      <span class="cs-spark cs-spark-5">@</span>
      <span class="cs-spark cs-spark-6">#</span>

      <!-- hover prompt -->
      {#if showPrompt && !unleashed}
        <div class="cs-prompt" role="tooltip">
          {PROMPT_MESSAGES[currentPromptIndex]}
        </div>
      {/if}
    </div>
  </button>
</div>

<style>
  .cs-wrap {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: var(--cs-size);
    user-select: none;
    color: var(--accent);
  }

  /* ============ HEADER BUTTON ============ */
  .cs-header {
    background: transparent;
    border: 0;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-family: var(--font-heading, 'Plus Jakarta Sans Variable', system-ui, sans-serif);
    font-weight: 900;
    font-size: clamp(1rem, calc(var(--cs-size) * 0.07), 1.6rem);
    letter-spacing: 0.12em;
    color: var(--primary);
    text-transform: uppercase;
    transition: transform 0.15s ease;
  }

  .cs-header:hover { transform: translateY(-2px) scale(1.02); }
  .cs-header:active { transform: translateY(1px); }

  .cs-header-text {
    position: relative;
    display: inline-block;
    text-shadow:
      3px 3px 0 #000,
      -1.5px 0 0 #000,
      1.5px 0 0 #000,
      0 -1.5px 0 #000,
      0 1.5px 0 #000;
  }

  .cs-header-text::before,
  .cs-header-text::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
  }

  .cs-wrap.active .cs-header-text {
    animation: cs-text-shake 0.18s steps(2, end) infinite;
  }

  .cs-wrap.active .cs-header-text::before {
    color: var(--accent);
    text-shadow: none;
    clip-path: inset(0 0 55% 0);
    opacity: 1;
    animation: cs-glitch-a 0.32s steps(1, end) infinite;
  }

  .cs-wrap.active .cs-header-text::after {
    color: #00f0ff;
    text-shadow: none;
    clip-path: inset(55% 0 0 0);
    opacity: 1;
    animation: cs-glitch-b 0.32s steps(1, end) infinite;
  }

  /* ============ THOUGHT BUBBLE ============ */
  .cs-thought {
    position: absolute;
    top: calc(100% + 1rem);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    pointer-events: none;
    z-index: 5;
  }

  .cs-bubble {
    position: relative;
    background: var(--cs-bubble-bg, #fff);
    color: #000;
    border: 4px solid #000;
    border-radius: 28px;
    padding: 1.1rem 1.4rem;
    width: clamp(18rem, calc(var(--cs-size) * 1.1), 26rem);
    box-shadow: 6px 6px 0 #000;
    transform-origin: top center;
    animation: cs-bubble-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    pointer-events: auto;
  }

  .cs-bubble-text {
    margin: 0;
    font-size: 1rem;
    line-height: 1.55;
    font-weight: 600;
  }

  /* trailing little circles connecting bubble -> skull */
  .cs-thought-dot {
    display: block;
    background: var(--cs-bubble-bg, #fff);
    border: 3px solid #000;
    border-radius: 50%;
    transform-origin: center;
    animation: cs-dot-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .cs-thought-dot-1 {
    width: 1.25rem;
    height: 1.25rem;
    animation-delay: 0.06s;
  }

  .cs-thought-dot-2 {
    width: 0.7rem;
    height: 0.7rem;
    animation-delay: 0.12s;
  }

  /* on small screens, drop the bubble into the normal flow below the skull
     so it doesn't clip off the bottom of the viewport or overlap the menu */
  @media (max-width: 767px) {
    .cs-thought {
      position: static;
      transform: none;
      order: 1;
      margin-top: 0.5rem;
    }

    .cs-bubble {
      width: min(20rem, 88vw);
    }
  }

  /* idle "thinking" sway when a section is selected */
  .cs-wrap.thinking:not(.active) .cs-svg {
    animation: cs-think 2.4s ease-in-out infinite;
  }

  /* ============ SKULL BUTTON ============ */
  .cs-skull {
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    width: var(--cs-size);
    aspect-ratio: 240 / 290;
    transition: transform 0.2s ease;
  }

  .cs-skull:hover { transform: scale(1.03); }
  .cs-skull:active { transform: scale(0.97); }
  .cs-skull:focus-visible { outline: 3px dashed var(--accent); outline-offset: 6px; border-radius: 50%; }

  .cs-stage {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .cs-svg {
    width: 100%;
    height: 100%;
    display: block;
    transform-origin: center 80%;
    animation: cs-bob 3.2s ease-in-out infinite;
    overflow: visible;
  }

  .cs-wrap.active .cs-svg {
    animation: cs-shake 0.16s steps(2, end) infinite;
  }

  .cs-shadow {
    fill: rgba(0, 0, 0, 0.22);
    transform-box: view-box;
    transform-origin: 120px 278px;
    animation: cs-shadow-pulse 3.2s ease-in-out infinite;
  }

  .cs-wrap.active .cs-shadow {
    animation: cs-shadow-pulse 0.4s ease-in-out infinite;
  }

  /* glow ring is invisible at idle, spinning dashed circle when active */
  .cs-glow {
    color: var(--accent);
    opacity: 0;
    transform-box: view-box;
    transform-origin: 120px 135px;
  }

  .cs-wrap.active .cs-glow {
    opacity: 0.85;
    animation: cs-spin 4s linear infinite;
  }

  /* swap idle <-> rage faces */
  .cs-rage { display: none; }
  .cs-wrap.active .cs-idle { display: none; }
  .cs-wrap.active .cs-rage { display: inline; }

  /* pupils glide toward the cursor */
  .cs-pupil {
    transition: cx 0.12s ease-out, cy 0.12s ease-out;
  }

  /* X-eyes look */
  .cs-x line {
    stroke: #fff;
    stroke-width: 7;
    stroke-linecap: round;
  }

  .cs-x {
    transform-box: fill-box;
    transform-origin: center;
    animation: cs-pulse 0.35s ease-in-out infinite alternate;
  }

  .cs-x-right { animation-delay: 0.12s; }

  /* tongue wiggle */
  .cs-tongue {
    transform-box: fill-box;
    transform-origin: center top;
    animation: cs-tongue 0.36s ease-in-out infinite alternate;
  }

  /* ============ SPARKLES ============ */
  .cs-spark {
    position: absolute;
    top: 35%;
    left: 50%;
    font-family: var(--font-heading, system-ui, sans-serif);
    font-weight: 900;
    font-size: calc(var(--cs-size) * 0.11);
    color: var(--accent);
    text-shadow:
      2px 2px 0 #000,
      -1px 0 0 #000,
      1px 0 0 #000,
      0 -1px 0 #000,
      0 1px 0 #000;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -50%);
    will-change: transform, opacity;
  }

  /* ============ HOVER PROMPT ============ */
  .cs-prompt {
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: #000;
    border: 3px solid #000;
    border-radius: 16px;
    padding: 0.6rem 1rem;
    font-family: var(--font-heading, 'Plus Jakarta Sans Variable', system-ui, sans-serif);
    font-weight: 700;
    font-size: clamp(0.85rem, calc(var(--cs-size) * 0.045), 1rem);
    white-space: nowrap;
    box-shadow: 4px 4px 0 #000;
    pointer-events: none;
    z-index: 10;
    animation: cs-prompt-float 2s ease-in-out infinite, cs-prompt-appear 0.3s ease-out both;
  }

  @media (max-width: 767px) {
    .cs-prompt {
      white-space: normal;
      max-width: min(85vw, 280px);
      text-align: center;
      line-height: 1.3;
      padding: 0.7rem 0.9rem;
      font-size: 0.8rem;
      top: -4rem;
    }
  }

  .cs-prompt::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: var(--accent);
    filter: drop-shadow(0 3px 0 #000);
  }

  .cs-wrap.active .cs-spark-1 {
    --tx: calc(var(--cs-size) * -0.45);
    --ty: calc(var(--cs-size) * -0.5);
    --rot: -20deg;
    animation: cs-spark-fly 0.85s ease-out infinite;
  }
  .cs-wrap.active .cs-spark-2 {
    --tx: calc(var(--cs-size) * 0.5);
    --ty: calc(var(--cs-size) * -0.45);
    --rot: 25deg;
    animation: cs-spark-fly 0.95s 0.1s ease-out infinite;
  }
  .cs-wrap.active .cs-spark-3 {
    --tx: calc(var(--cs-size) * -0.55);
    --ty: calc(var(--cs-size) * 0.05);
    --rot: 15deg;
    animation: cs-spark-fly 0.75s 0.2s ease-out infinite;
  }
  .cs-wrap.active .cs-spark-4 {
    --tx: calc(var(--cs-size) * 0.6);
    --ty: calc(var(--cs-size) * 0.1);
    --rot: -45deg;
    animation: cs-spark-fly 1s 0.05s ease-out infinite;
  }
  .cs-wrap.active .cs-spark-5 {
    --tx: calc(var(--cs-size) * -0.35);
    --ty: calc(var(--cs-size) * 0.55);
    --rot: 60deg;
    animation: cs-spark-fly 0.9s 0.18s ease-out infinite;
  }
  .cs-wrap.active .cs-spark-6 {
    --tx: calc(var(--cs-size) * 0.4);
    --ty: calc(var(--cs-size) * 0.6);
    --rot: -55deg;
    animation: cs-spark-fly 1.05s 0.28s ease-out infinite;
  }

  /* ============ KEYFRAMES ============ */
  @keyframes cs-bob {
    0%, 100% { transform: translateY(0) scale(1, 1); }
    50% { transform: translateY(-8px) scale(1.015, 0.985); }
  }

  @keyframes cs-think {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50%      { transform: translateY(-6px) rotate(2deg); }
  }

  @keyframes cs-shake {
    0%   { transform: translate(0, 0)   rotate(0)   scale(1);    }
    20%  { transform: translate(-4px, 3px) rotate(-3deg) scale(1.03); }
    40%  { transform: translate(4px, -3px) rotate(3deg)  scale(0.97); }
    60%  { transform: translate(-3px, -4px) rotate(-2deg) scale(1.04); }
    80%  { transform: translate(3px, 4px) rotate(2deg)  scale(0.98); }
    100% { transform: translate(0, 0)   rotate(0)   scale(1);    }
  }

  @keyframes cs-shadow-pulse {
    0%, 100% { transform: scale(1); opacity: 0.22; }
    50%      { transform: scale(0.82); opacity: 0.14; }
  }

  @keyframes cs-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes cs-pulse {
    from { transform: scale(0.9); }
    to   { transform: scale(1.18); }
  }

  @keyframes cs-tongue {
    from { transform: rotate(-4deg) translateY(0); }
    to   { transform: rotate(4deg) translateY(3px); }
  }

  @keyframes cs-spark-fly {
    0% {
      transform: translate(-50%, -50%) rotate(0);
      opacity: 0;
    }
    15% { opacity: 1; }
    100% {
      transform:
        translate(calc(-50% + var(--tx)), calc(-50% + var(--ty)))
        rotate(var(--rot)) scale(0.6);
      opacity: 0;
    }
  }

  @keyframes cs-bubble-pop {
    0%   { opacity: 0; transform: scale(0.4) translateY(-20px); }
    70%  { opacity: 1; transform: scale(1.04) translateY(4px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes cs-dot-pop {
    0%   { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes cs-text-shake {
    0%, 100% { transform: translate(0, 0); }
    33%      { transform: translate(-2px, 1px); }
    66%      { transform: translate(2px, -1px); }
  }

  @keyframes cs-glitch-a {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3px, 0); }
    50% { transform: translate(2px, 1px); }
    75% { transform: translate(-1px, -1px); }
  }

  @keyframes cs-glitch-b {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(3px, 0); }
    50% { transform: translate(-2px, -1px); }
    75% { transform: translate(1px, 1px); }
  }

  @keyframes cs-prompt-appear {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-10px) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  @keyframes cs-prompt-float {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cs-svg,
    .cs-shadow,
    .cs-glow,
    .cs-x,
    .cs-tongue,
    .cs-spark,
    .cs-header-text,
    .cs-header-text::before,
    .cs-header-text::after,
    .cs-bubble,
    .cs-thought-dot,
    .cs-pupil,
    .cs-prompt {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
