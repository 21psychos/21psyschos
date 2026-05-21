<script lang="ts">
  let { size = 340 }: { size?: number } = $props();

  let unleashed = $state(false);

  function toggle() {
    unleashed = !unleashed;
  }
</script>

<div class="ms-wrap" class:active={unleashed} style="--ms-size: {size}px;">
  <button class="ms-header" type="button" onclick={toggle}>
    <span
      class="ms-header-text"
      data-text={unleashed ? "MELTDOWN!!!" : "▸ TAP TO MELT"}
    >
      {unleashed ? "MELTDOWN!!!" : "▸ TAP TO MELT"}
    </span>
  </button>

  <button
    class="ms-smiley"
    type="button"
    onclick={toggle}
    aria-pressed={unleashed}
    aria-label={unleashed ? "Reform the smiley" : "Melt the smiley"}
  >
    <div class="ms-stage">
      <svg
        class="ms-svg"
        viewBox="0 0 240 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- ground shadow -->
        <ellipse class="ms-shadow" cx="120" cy="304" rx="80" ry="6" />

        <!-- glow ring while active -->
        <circle
          class="ms-glow"
          cx="120"
          cy="120"
          r="118"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-dasharray="6 10"
        />

        <!-- ============ DRIPS (only visible when active) ============ -->
        <g class="ms-drips">
          <!-- drip blobs hanging from face base -->
          <path
            class="ms-drip ms-drip-1"
            d="M 64 196
               C 60 220, 56 240, 64 252
               C 72 260, 84 256, 86 244
               C 88 232, 80 212, 80 196 Z"
            fill="#FFD93D"
            stroke="#000"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <path
            class="ms-drip ms-drip-2"
            d="M 96 210
               C 90 240, 88 268, 100 282
               C 112 292, 124 286, 124 270
               C 124 250, 116 226, 116 210 Z"
            fill="#FFD93D"
            stroke="#000"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <path
            class="ms-drip ms-drip-3"
            d="M 142 208
               C 138 232, 134 256, 142 268
               C 152 278, 164 270, 164 256
               C 164 240, 156 220, 156 208 Z"
            fill="#FFD93D"
            stroke="#000"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <path
            class="ms-drip ms-drip-4"
            d="M 174 198
               C 170 218, 168 236, 178 246
               C 188 254, 200 248, 200 236
               C 200 222, 192 204, 188 198 Z"
            fill="#FFD93D"
            stroke="#000"
            stroke-width="5"
            stroke-linejoin="round"
          />

          <!-- falling droplets -->
          <circle class="ms-drop ms-drop-1" cx="78" cy="260" r="6" fill="#FFD93D" stroke="#000" stroke-width="4" />
          <circle class="ms-drop ms-drop-2" cx="120" cy="290" r="8" fill="#FFD93D" stroke="#000" stroke-width="4" />
          <circle class="ms-drop ms-drop-3" cx="160" cy="270" r="5" fill="#FFD93D" stroke="#000" stroke-width="4" />
          <circle class="ms-drop ms-drop-4" cx="190" cy="250" r="6" fill="#FFD93D" stroke="#000" stroke-width="4" />
        </g>

        <!-- ============ FACE ============ -->
        <g class="ms-face">
          <!-- yellow face circle -->
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="#FFD93D"
            stroke="#000"
            stroke-width="6"
          />

          <!-- highlight gleam -->
          <ellipse cx="80" cy="76" rx="14" ry="8" fill="#fff" opacity="0.55" />

          <!-- ====== IDLE ====== -->
          <g class="ms-idle">
            <!-- eyes -->
            <ellipse class="ms-eye ms-eye-l" cx="86" cy="106" rx="10" ry="14" fill="#000" />
            <ellipse class="ms-eye ms-eye-r" cx="154" cy="106" rx="10" ry="14" fill="#000" />
            <!-- smile -->
            <path
              d="M 70 144 Q 120 196 170 144"
              fill="none"
              stroke="#000"
              stroke-width="8"
              stroke-linecap="round"
            />
          </g>

          <!-- ====== UNLEASHED ====== -->
          <g class="ms-trip">
            <!-- spiral eyes -->
            <g class="ms-spiral ms-spiral-l" transform="translate(86 110)">
              <path
                d="M 0 0
                   m 0 -2
                   a 2 2 0 1 1 0 4
                   a 5 5 0 1 0 0 -10
                   a 8 8 0 1 1 0 16
                   a 11 11 0 1 0 0 -22
                   a 14 14 0 1 1 0 28"
                fill="none"
                stroke="#000"
                stroke-width="3.5"
                stroke-linecap="round"
              />
            </g>
            <g class="ms-spiral ms-spiral-r" transform="translate(154 110)">
              <path
                d="M 0 0
                   m 0 -2
                   a 2 2 0 1 1 0 4
                   a 5 5 0 1 0 0 -10
                   a 8 8 0 1 1 0 16
                   a 11 11 0 1 0 0 -22
                   a 14 14 0 1 1 0 28"
                fill="none"
                stroke="#000"
                stroke-width="3.5"
                stroke-linecap="round"
              />
            </g>

            <!-- gaping mouth -->
            <path
              class="ms-mouth"
              d="M 64 150
                 Q 120 220 176 150
                 Q 120 188 64 150 Z"
              fill="#000"
              stroke="#000"
              stroke-width="6"
              stroke-linejoin="round"
            />

            <!-- tongue lolling -->
            <g class="ms-tongue">
              <path
                d="M 100 178
                   Q 100 210 116 214
                   L 124 214
                   Q 140 210 140 178 Z"
                fill="#FF4D88"
                stroke="#000"
                stroke-width="4"
                stroke-linejoin="round"
              />
              <path
                d="M 120 184 L 120 210"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.55"
              />
            </g>
          </g>
        </g>
      </svg>

      <!-- floaty sparkle accents -->
      <span class="ms-spark ms-spark-1">★</span>
      <span class="ms-spark ms-spark-2">~</span>
      <span class="ms-spark ms-spark-3">✦</span>
      <span class="ms-spark ms-spark-4">○</span>
      <span class="ms-spark ms-spark-5">!</span>
      <span class="ms-spark ms-spark-6">?</span>
    </div>
  </button>
</div>

<style>
  .ms-wrap {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: var(--ms-size);
    user-select: none;
    color: var(--accent);
  }

  /* ============ HEADER ============ */
  .ms-header {
    background: transparent;
    border: 0;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-family: var(--font-heading, 'Plus Jakarta Sans Variable', system-ui, sans-serif);
    font-weight: 900;
    font-size: clamp(1rem, calc(var(--ms-size) * 0.07), 1.6rem);
    letter-spacing: 0.12em;
    color: var(--primary);
    text-transform: uppercase;
    transition: transform 0.15s ease;
  }

  .ms-header:hover { transform: translateY(-2px) scale(1.02); }
  .ms-header:active { transform: translateY(1px); }

  .ms-header-text {
    position: relative;
    display: inline-block;
    text-shadow:
      3px 3px 0 #000,
      -1.5px 0 0 #000,
      1.5px 0 0 #000,
      0 -1.5px 0 #000,
      0 1.5px 0 #000;
  }

  .ms-header-text::before,
  .ms-header-text::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
  }

  .ms-wrap.active .ms-header-text {
    animation: ms-text-shake 0.18s steps(2, end) infinite;
  }

  .ms-wrap.active .ms-header-text::before {
    color: var(--accent);
    text-shadow: none;
    clip-path: inset(0 0 55% 0);
    opacity: 1;
    animation: ms-glitch-a 0.32s steps(1, end) infinite;
  }

  .ms-wrap.active .ms-header-text::after {
    color: #00f0ff;
    text-shadow: none;
    clip-path: inset(55% 0 0 0);
    opacity: 1;
    animation: ms-glitch-b 0.32s steps(1, end) infinite;
  }

  /* ============ SMILEY ============ */
  .ms-smiley {
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    width: var(--ms-size);
    aspect-ratio: 240 / 320;
    transition: transform 0.2s ease;
  }

  .ms-smiley:hover { transform: scale(1.03); }
  .ms-smiley:active { transform: scale(0.97); }
  .ms-smiley:focus-visible {
    outline: 3px dashed var(--accent);
    outline-offset: 6px;
    border-radius: 50%;
  }

  .ms-stage {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  /* idle bob */
  .ms-face {
    transform-box: view-box;
    transform-origin: 120px 120px;
    animation: ms-bob 3.4s ease-in-out infinite;
  }

  /* idle blink */
  .ms-eye {
    transform-box: fill-box;
    transform-origin: center;
    animation: ms-blink 5s ease-in-out infinite;
  }
  .ms-eye-r { animation-delay: 0.05s; }

  /* shadow pulse */
  .ms-shadow {
    fill: rgba(0, 0, 0, 0.22);
    transform-box: view-box;
    transform-origin: 120px 304px;
    animation: ms-shadow-pulse 3.4s ease-in-out infinite;
  }

  /* glow ring */
  .ms-glow {
    color: var(--accent);
    opacity: 0;
    transform-box: view-box;
    transform-origin: 120px 120px;
  }

  .ms-wrap.active .ms-glow {
    opacity: 0.85;
    animation: ms-spin 5s linear infinite;
  }

  /* ============ STATE SWAP ============ */
  .ms-trip { display: none; }
  .ms-drips { display: none; }

  .ms-wrap.active .ms-idle { display: none; }
  .ms-wrap.active .ms-trip { display: inline; }
  .ms-wrap.active .ms-drips { display: inline; }

  /* face squishes/sags when active */
  .ms-wrap.active .ms-face {
    animation: ms-sag 1.4s ease-in-out infinite alternate;
  }

  /* spiral eyes spin */
  .ms-spiral {
    transform-box: fill-box;
    transform-origin: center;
  }
  .ms-spiral-l { animation: ms-spin 1.6s linear infinite; }
  .ms-spiral-r { animation: ms-spin 1.4s linear infinite reverse; }

  /* tongue wiggle */
  .ms-tongue {
    transform-box: fill-box;
    transform-origin: center top;
    animation: ms-tongue 0.4s ease-in-out infinite alternate;
  }

  /* mouth pulse */
  .ms-mouth {
    transform-box: fill-box;
    transform-origin: center top;
    animation: ms-mouth-pulse 0.6s ease-in-out infinite alternate;
  }

  /* drip blob breathing + lengthening */
  .ms-drip {
    transform-box: fill-box;
    transform-origin: center top;
  }
  .ms-drip-1 { animation: ms-drip-stretch 2.2s ease-in-out infinite alternate; }
  .ms-drip-2 { animation: ms-drip-stretch 2.6s 0.2s ease-in-out infinite alternate; }
  .ms-drip-3 { animation: ms-drip-stretch 2.4s 0.1s ease-in-out infinite alternate; }
  .ms-drip-4 { animation: ms-drip-stretch 2.8s 0.3s ease-in-out infinite alternate; }

  /* drops fall and reset */
  .ms-drop { opacity: 0; }
  .ms-drop-1 { animation: ms-drop-fall 1.6s 0.0s ease-in infinite; }
  .ms-drop-2 { animation: ms-drop-fall 1.9s 0.6s ease-in infinite; }
  .ms-drop-3 { animation: ms-drop-fall 1.7s 0.3s ease-in infinite; }
  .ms-drop-4 { animation: ms-drop-fall 2.0s 0.9s ease-in infinite; }

  /* ============ SPARKLES ============ */
  .ms-spark {
    position: absolute;
    top: 30%;
    left: 50%;
    font-family: var(--font-heading, system-ui, sans-serif);
    font-weight: 900;
    font-size: calc(var(--ms-size) * 0.1);
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

  .ms-wrap.active .ms-spark-1 {
    --tx: calc(var(--ms-size) * -0.45);
    --ty: calc(var(--ms-size) * -0.45);
    --rot: -20deg;
    animation: ms-spark-fly 0.9s ease-out infinite;
  }
  .ms-wrap.active .ms-spark-2 {
    --tx: calc(var(--ms-size) * 0.5);
    --ty: calc(var(--ms-size) * -0.4);
    --rot: 25deg;
    animation: ms-spark-fly 1s 0.1s ease-out infinite;
  }
  .ms-wrap.active .ms-spark-3 {
    --tx: calc(var(--ms-size) * -0.55);
    --ty: calc(var(--ms-size) * 0);
    --rot: 15deg;
    animation: ms-spark-fly 0.8s 0.2s ease-out infinite;
  }
  .ms-wrap.active .ms-spark-4 {
    --tx: calc(var(--ms-size) * 0.55);
    --ty: calc(var(--ms-size) * 0.05);
    --rot: -45deg;
    animation: ms-spark-fly 1.05s 0.05s ease-out infinite;
  }
  .ms-wrap.active .ms-spark-5 {
    --tx: calc(var(--ms-size) * -0.3);
    --ty: calc(var(--ms-size) * -0.55);
    --rot: 60deg;
    animation: ms-spark-fly 0.95s 0.18s ease-out infinite;
  }
  .ms-wrap.active .ms-spark-6 {
    --tx: calc(var(--ms-size) * 0.35);
    --ty: calc(var(--ms-size) * -0.55);
    --rot: -55deg;
    animation: ms-spark-fly 1.1s 0.28s ease-out infinite;
  }

  /* ============ KEYFRAMES ============ */
  @keyframes ms-bob {
    0%, 100% { transform: translateY(0) scale(1, 1); }
    50%      { transform: translateY(-8px) scale(1.015, 0.985); }
  }

  @keyframes ms-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    94%, 96%      { transform: scaleY(0.1); }
  }

  @keyframes ms-shadow-pulse {
    0%, 100% { transform: scale(1); opacity: 0.22; }
    50%      { transform: scale(0.85); opacity: 0.14; }
  }

  @keyframes ms-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes ms-sag {
    from { transform: translateY(0) scaleY(1) scaleX(1); }
    to   { transform: translateY(6px) scaleY(0.96) scaleX(1.04); }
  }

  @keyframes ms-tongue {
    from { transform: rotate(-5deg) translateY(0); }
    to   { transform: rotate(5deg) translateY(4px); }
  }

  @keyframes ms-mouth-pulse {
    from { transform: scaleY(1); }
    to   { transform: scaleY(1.08); }
  }

  @keyframes ms-drip-stretch {
    from { transform: scaleY(1) translateY(0); }
    to   { transform: scaleY(1.25) translateY(4px); }
  }

  @keyframes ms-drop-fall {
    0%   { transform: translateY(0) scale(0.8); opacity: 0; }
    15%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateY(60px) scale(0.6); opacity: 0; }
  }

  @keyframes ms-spark-fly {
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

  @keyframes ms-text-shake {
    0%, 100% { transform: translate(0, 0); }
    33%      { transform: translate(-2px, 1px); }
    66%      { transform: translate(2px, -1px); }
  }

  @keyframes ms-glitch-a {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-3px, 0); }
    50% { transform: translate(2px, 1px); }
    75% { transform: translate(-1px, -1px); }
  }

  @keyframes ms-glitch-b {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(3px, 0); }
    50% { transform: translate(-2px, -1px); }
    75% { transform: translate(1px, 1px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ms-face,
    .ms-eye,
    .ms-shadow,
    .ms-glow,
    .ms-spiral,
    .ms-tongue,
    .ms-mouth,
    .ms-drip,
    .ms-drop,
    .ms-spark,
    .ms-header-text,
    .ms-header-text::before,
    .ms-header-text::after {
      animation: none !important;
    }
  }
</style>
