<script setup lang="ts">
  interface AnchorFrac { x: number; y: number };
  
  const props = withDefaults(defineProps<{
    containerEl: HTMLElement | null;
    startEl: HTMLElement | null;
    endEl: HTMLElement | null;
    startAt?: AnchorFrac;
    endAt?: AnchorFrac;
    color?: string;
    speed?: number;
    thickness?: number;
    curvature?: number;
    glowBlur?: number;
    startTangentAngle?: number | null;
    endTangentAngle?: number | null;
    tipHandle?: number;
  }>(), {
    startAt: () => ({ x: 1, y: 0.45 }),
    endAt: () => ({ x: 0, y: 0.25 }),
    color: 'var(--primary)',
    speed: 1.2,
    thickness: 2,
    curvature: 0.25,
    glowBlur: 4,
    startTangentAngle: null,
    endTangentAngle: null,
    tipHandle: 1,
  });
  
  const uid = `ec-${Math.random().toString(36).slice(2, 9)}`;
  const wrapEl = ref<HTMLElement | null>(null);
  const svgWidth = ref(0);
  const svgHeight = ref(0);
  const pathD = ref('');
  
  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  
  function computePath() {
    const container = props.containerEl;
    const start = props.startEl;
    const end = props.endEl;
    if (!container || !start || !end) return;
  
    const cRect = container.getBoundingClientRect();
    const sRect = start.getBoundingClientRect();
    const eRect = end.getBoundingClientRect();
  
    svgWidth.value = Math.round(cRect.width);
    svgHeight.value = Math.round(cRect.height);

    const sa = { x: props.startAt!.x, y: props.startAt!.y };
    const ea = { x: props.endAt!.x, y: props.endAt!.y };

    const x1 = sRect.left - cRect.left + lerp(0, sRect.width, sa.x);
    const y1 = sRect.top - cRect.top + lerp(0, sRect.height, sa.y);
    const x2 = eRect.left - cRect.left + lerp(0, eRect.width, ea.x);
    const y2 = eRect.top - cRect.top + lerp(0, eRect.height, ea.y);
  
    const dx = x2 - x1;
    const dy = y2 - y1;

    const curv = Math.max(0, props.curvature!);
    const baseBend = Math.max(60, Math.abs(dx) * 0.25) * (0.6 + curv);
    const handleLen = baseBend * Math.max(0.2, props.tipHandle ?? 1);

    let c1x: number;
    let c1y: number;
    
    if (props.startTangentAngle !== null && props.startTangentAngle !== undefined) {
      const a = (props.startTangentAngle * Math.PI) / 180;
      c1x = x1 + Math.cos(a) * handleLen;
      c1y = y1 + Math.sin(a) * handleLen;
    } else {
      c1x = x1 + baseBend;
      c1y = y1 + dy * 0.1 - 30 * (0.5 + curv);
    }

    let c2x: number;
    let c2y: number;

    if (props.endTangentAngle !== null && props.endTangentAngle !== undefined) {
      const a = (props.endTangentAngle * Math.PI) / 180;
      c2x = x2 - Math.cos(a) * handleLen;
      c2y = y2 - Math.sin(a) * handleLen;
    } else {
      c2x = x2 - baseBend;
      c2y = y2 - dy * 0.1 + 30 * (0.5 + curv);
    }
  
    pathD.value = `M ${x1},${y1} C ${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
  }
  
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    computePath();
    resizeObserver = new ResizeObserver(() => computePath());

    if (props.containerEl) resizeObserver.observe(props.containerEl);
    if (props.startEl) resizeObserver.observe(props.startEl);
    if (props.endEl) resizeObserver.observe(props.endEl);
    window.addEventListener('resize', computePath);
  });
  
  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', computePath);
  });
  
  watch(() => [
    props.startEl,
    props.endEl,
    props.containerEl,
    props.startAt,
    props.endAt,
    props.curvature,
    props.startTangentAngle,
    props.endTangentAngle,
    props.tipHandle,
  ], () => {
    nextTick(() => computePath());
  });
</script>

<template>
  <div ref="wrapEl" class="energy-cable">
    <svg
      v-if="svgWidth > 0 && svgHeight > 0 && pathD"
      class="signal__svg"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter :id="`${uid}-glow`" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="glowBlur" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient :id="`${uid}-grad`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="color" stop-opacity="0.15" />
          <stop offset="50%" :stop-color="color" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <path
        :d="pathD"
        class="signal signal--glow"
        :style="{ filter: `url(#${uid}-glow)`, strokeWidth: (thickness ?? 2) * 3 }"
        :stroke="color"
      />
      <path
        :d="pathD"
        class="signal signal--pulse"
        :stroke="`url(#${uid}-grad)`"
        :style="{ animationDuration: `${speed}s`, strokeWidth: thickness ?? 2 }"
      />
      <path
        :d="pathD"
        class="signal signal--pulse delay"
        :stroke="`url(#${uid}-grad)`"
        :style="{ animationDuration: `${speed * 1.2}s`, strokeWidth: (thickness ?? 2) * 0.75 }"
      />
    </svg>
  </div>
</template>

<style scoped>
  .energy-cable {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }
  .signal__svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .signal {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .signal--glow {
    stroke-opacity: .35;
    stroke-width: 6;
  }
  .signal--pulse {
    stroke-width: 2;
    stroke-dasharray: 10 12;
    animation: dash-move 1.2s linear infinite, flicker 2.4s ease-in-out infinite;
    opacity: .95;
  }
  .signal--pulse.delay {
    stroke-dasharray: 4 16;
    animation-delay: .3s, .6s;
    stroke-width: 1.5;
    opacity: .8;
  }
  @keyframes dash-move { to { stroke-dashoffset: -44; } }
  @keyframes flicker {
    0%, 100% { filter: none; opacity: 1; }
    40% { filter: drop-shadow(0 0 2px var(--primary)); opacity: .95; }
    60% { filter: drop-shadow(0 0 4px var(--primary-a2)); opacity: .9; }
  }
</style>
