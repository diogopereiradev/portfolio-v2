<script setup lang="ts">
  interface Particle {
    t: number;
    x: number;
    prevX: number;
    hiddenUntil?: number
  };

  interface Ripple {
    id: number;
    x: number;
    r: number;
    opacity: number;
    start: number;
    delay: number;
    maxR: number;
    strokeW: number;
    duration: number
  };

  interface MegaFill {
    id: number;
    start: number;
    duration: number;
    r: number;
    opacity: number
  }

  const props = withDefaults(defineProps<{
    height?: number
    color?: string
    thickness?: number
    speed?: number
    dashLength?: number
    dashGap?: number
    tickSpacing?: number
    tickSize?: number
    ticks?: boolean
    ticksAlternate?: boolean
    particles?: number
    angle?: number
    waves?: boolean
    waveCount?: number
    waveMaxRadius?: number | null
    waveWidth?: number | null
    waveOpacity?: number
    waveSpacing?: number
    particlesRight?: number
    collisionPulse?: boolean
    collisionPulseRadius?: number | null
    collisionPulseWidth?: number | null
    collisionPulseOpacity?: number
    collisionCooldown?: number
  }>(), {
    height: 48,
    color: 'var(--primary)',
    thickness: 1.5,
    speed: 1,
    dashLength: 12,
    dashGap: 6,
    tickSpacing: 56,
    tickSize: 6,
    ticks: true,
    ticksAlternate: true,
    particles: 2,
    angle: 0,
    waves: true,
    waveCount: 1,
    waveMaxRadius: null,
    waveWidth: null,
    waveOpacity: 0.35,
    waveSpacing: 0.5,
    particlesRight: 2,
    collisionPulse: false,
    collisionPulseRadius: null,
    collisionPulseWidth: null,
    collisionPulseOpacity: 0.5,
    collisionCooldown: 0.6,
  });

  const wrap = ref<HTMLElement | null>(null);
  const width = ref(0);
  const uid = ref('');
  const pathD = ref('');
  const baselineY = computed(() => Math.round((props.height ?? 48) / 2));

  function rebuild() {
    const W = Math.max(1, width.value);
    const H = props.height ?? 48;
    const y = Math.round(H / 2);
    pathD.value = `M 0 ${y} L ${W} ${y}`;
  }

  let ro: ResizeObserver | null = null;

  const tickPositions = computed(() => {
    const W = Math.max(1, width.value);
    const spacing = Math.max(16, props.tickSpacing ?? 56);
    const count = Math.max(0, Math.floor(W / spacing) - 1);
    const arr: number[] = [];

    for (let i = 1; i <= count; i++) arr.push(i * spacing);
    return arr;
  });

  const wavePositions = computed(() => {
    const W = Math.max(1, width.value);
    const spacing = Math.max(16, props.tickSpacing ?? 56);
    const count = Math.max(0, Math.floor(W / spacing) - 1);
    const arr: number[] = [];
    for (let i = 1; i <= count; i++) arr.push(i * spacing);
    return arr;
  });

  const wavePeriod = computed(() => Math.max(0.3, 1.2 / (props.speed ?? 1)));
  const waveMaxR = computed(() => props.waveMaxRadius ?? Math.max(12, (props.height ?? 48) * 0.6));
  const waveStrokeW = computed(() => props.waveWidth ?? Math.max(1, (props.thickness ?? 1.5) * 0.7));

  const particlesState = ref<Particle[]>([]);
  const particlesRightState = ref<Particle[]>([]);
  const ripples = ref<Ripple[]>([]);
  const megaFills = ref<MegaFill[]>([]);
  
  const maxFillR = computed(() => {
    const W = Math.max(1, width.value);
    const H = Math.max(1, props.height ?? 48);
    return Math.hypot(W, H) * 0.6 + 12;
  });

  let nextRippleId = 1;
  let rafId: number | null = null;
  let lastTs = 0;
  
  const nowSecRef = ref(0);
  const flashUntil = ref(0);
  const isFlashing = computed(() => nowSecRef.value < flashUntil.value);

  const particlePeriod = computed(() => 3 / Math.max(0.3, props.speed ?? 1));

  function initParticles() {
    const W = Math.max(1, width.value);
    const nL = Math.max(0, Math.min(20, props.particles ?? 0));
    const nR = Math.max(0, Math.min(20, props.particlesRight ?? 0));
  
    particlesState.value = Array.from({ length: nL }, (_, i) => {
      const t = nL > 0 ? (i / nL) : 0;
      const x = t * W;
      return { t, x, prevX: x } as Particle;
    });
  
    particlesRightState.value = Array.from({ length: nR }, (_, i) => {
      const t = nR > 0 ? (i / nR) : 0;
      const x = (1 - t) * W;
      return { t, x, prevX: x } as Particle;
    });
  }
  
  function triggerRipplesAt(x: number, nowSec: number) {
    const count = Math.max(1, Math.min(4, props.waveCount ?? 2));
    const spacingSec = Math.max(0, props.waveSpacing ?? 0.5);
  
    for (let j = 0; j < count; j++) {
      ripples.value.push({
        id: nextRippleId++,
        x,
        r: 0,
        opacity: 0,
        start: nowSec,
        delay: j * spacingSec,
        maxR: waveMaxR.value,
        strokeW: waveStrokeW.value,
        duration: wavePeriod.value,
      });
    }
  }
  
  function triggerMegaPulse(nowSec: number) {
    if (!props.collisionPulse) return;
    const W = Math.max(1, width.value);
    const centerX = W / 2;
    const maxR = (props.collisionPulseRadius ?? (waveMaxR.value * 1.8));
    const strokeW = (props.collisionPulseWidth ?? Math.max(1, (props.thickness ?? 1.5) * 1.4));
    const duration = Math.max(0.4, wavePeriod.value * 1.2);
    const rings = 3;
  
    for (let j = 0; j < rings; j++) {
      ripples.value.push({
        id: nextRippleId++,
        x: centerX,
        r: 0,
        opacity: 0,
        start: nowSec,
        delay: j * 0.08,
        maxR,
        strokeW,
        duration,
      });
    }
  
    flashUntil.value = nowSec + 0.18;
    megaFills.value.push({
      id: nextRippleId++,
      start: nowSec,
      duration: Math.max(0.8, duration * 1.5),
      r: 0,
      opacity: 0,
    });
  }

  function step(ts: number) {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
  
    lastTs = ts;
  
    const W = Math.max(1, width.value);
    nowSecRef.value = ts / 1000;
  
    const period = particlePeriod.value;
    for (const p of particlesState.value) {
      p.prevX = p.x;
      p.t = (p.t + dt / period) % 1;
      p.x = p.t * W;
  
      if (p.hiddenUntil && nowSecRef.value < p.hiddenUntil) continue;
  
      for (const X of wavePositions.value) {
        const wrapped = p.prevX > p.x;
        const crossedForward = p.prevX <= X && p.x >= X;
        const crossedWrap = wrapped && (X >= p.prevX || X <= p.x);
  
        if (crossedForward || crossedWrap) {
          triggerRipplesAt(X, ts / 1000);
        }
      }
    }

    for (const p of particlesRightState.value) {
      p.prevX = p.x;
      p.t = (p.t + dt / period) % 1;
      p.x = (1 - p.t) * W;
      if (p.hiddenUntil && nowSecRef.value < p.hiddenUntil) continue;
      for (const X of wavePositions.value) {
        const wrapped = p.prevX < p.x;
        const crossedBackward = p.prevX >= X && p.x <= X;
        const crossedWrap = wrapped && (X <= p.prevX || X >= p.x);
        if (crossedBackward || crossedWrap) {
          triggerRipplesAt(X, ts / 1000);
        }
      }
    }
  
    const cooldown = Math.max(0, props.collisionCooldown ?? 0.6);
    const canMega = (nowSecRef.value >= flashUntil.value + cooldown);
  
    if (canMega && particlesState.value.length && particlesRightState.value.length) {
      const tStartSec = nowSecRef.value - dt;
      outer: for (const pl of particlesState.value) {
        if (pl.hiddenUntil && nowSecRef.value < pl.hiddenUntil) continue;
        for (const pr of particlesRightState.value) {
          if (pr.hiddenUntil && nowSecRef.value < pr.hiddenUntil) continue;
          const before = pl.prevX - pr.prevX;
          const after = pl.x - pr.x;
          if ((before <= 0 && after >= 0) || (before >= 0 && after <= 0)) {
            const dxL = pl.x - pl.prevX;
            const dxR = pr.x - pr.prevX;
            const den = (dxL - dxR);
  
            let s = 0.5;
            if (den !== 0) s = (pr.prevX - pl.prevX) / den;
            s = Math.max(0, Math.min(1, s));
            const tCollSec = tStartSec + s * dt;
  
            const hideUntil = tCollSec + cooldown;
            pl.hiddenUntil = hideUntil;
            pr.hiddenUntil = hideUntil;
  
            triggerMegaPulse(tCollSec);
            break outer;
          }
        }
      }
    }
  
    const nowSec = ts / 1000;
    ripples.value = ripples.value.filter(r => {
      const elapsed = nowSec - (r.start + r.delay);
      if (elapsed < 0) return true;
      if (elapsed > r.duration) return false;
      const k = elapsed / r.duration;
      r.r = r.maxR * k;
      const baseOpacity = (r.strokeW > waveStrokeW.value) ? (props.collisionPulseOpacity ?? 0.5) : (props.waveOpacity ?? 0.35);
      r.opacity = Math.max(0, baseOpacity * (1 - k));
      return true;
    });
  
    megaFills.value = megaFills.value.filter((m: MegaFill) => {
      const elapsed = nowSec - m.start;
      if (elapsed < 0) return true;
      if (elapsed > m.duration) return false;
      const k = elapsed / m.duration;
      m.r = maxFillR.value * k;
      m.opacity = Math.max(0, 0.6 * (1 - k));
      return true;
    });
  
    rafId = requestAnimationFrame(step);
  }

  function startAnim() {
    stopAnim();
    lastTs = 0;
    rafId = requestAnimationFrame(step);
  }
  function stopAnim() {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  }

  onMounted(() => {
    uid.value = `epd-${Math.random().toString(36).slice(2, 9)}`;
    if (wrap.value) {
      width.value = wrap.value.clientWidth;
      ro = new ResizeObserver(() => {
        if (!wrap.value) return;
        width.value = wrap.value.clientWidth;
        rebuild();
        initParticles();
      });
      ro.observe(wrap.value);
    }
    rebuild();
    initParticles();
    startAnim();
  });
  
  onBeforeUnmount(() => { stopAnim(); ro?.disconnect(); });
  
  watch(() => [props.height, props.dashLength, props.dashGap, props.tickSpacing, props.tickSize], () => rebuild());
</script>

<template>
  <div
    ref="wrap"
    class="energy-pulse-divider"
    :style="{ height: `${height}px` }"
    role="separator"
    aria-orientation="horizontal"
    aria-hidden="true"
  >
    <svg
      v-if="uid && width > 0 && height > 0 && pathD"
      class="epd-svg"
      :viewBox="`0 0 ${width} ${height}`"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter :id="`${uid}-glow`" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" :stdDeviation="Math.max(0.5, (thickness ?? 1.5) * 1.2)" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient :id="`${uid}-grad`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="color" stop-opacity="0.15" />
          <stop offset="35%" stop-color="#fff" stop-opacity="0.55" />
          <stop offset="65%" stop-color="#fff" stop-opacity="0.55" />
          <stop offset="100%" :stop-color="color" stop-opacity="0.15" />
        </linearGradient>
        <radialGradient :id="`${uid}-mega`" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="color" stop-opacity="0.35" />
          <stop offset="55%" :stop-color="color" stop-opacity="0.18" />
          <stop offset="100%" :stop-color="color" stop-opacity="0" />
        </radialGradient>
        <clipPath :id="`${uid}-upper`" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" :width="width" :height="baselineY" />
        </clipPath>
      </defs>

      <g :transform="`translate(${width/2} ${height/2}) rotate(${angle}) translate(${-width/2} ${-height/2})`">
        <g>
          <template v-for="mf in megaFills" :key="mf.id">
            <circle
              :cx="width/2"
              :cy="baselineY"
              :r="mf.r"
              :fill="`url(#${uid}-mega)`"
              :opacity="mf.opacity"
            />
          </template>
        </g>
        <path
          :id="`${uid}-path`"
          :d="pathD"
          :stroke="color"
          class="line line--glow"
          :style="{ filter: `url(#${uid}-glow)` }"
          :stroke-width="(thickness ?? 1.5) * 2.2"
        />
        <path
          :d="pathD"
          :class="['line', 'line--core', { 'is-flashing': isFlashing }]"
          :stroke="`url(#${uid}-grad)`"
          :stroke-width="thickness ?? 1.5"
          :style="{
            strokeDasharray: `${dashLength} ${dashGap}`,
            animationDuration: `${Math.max(0.3, 1.2 / speed)}s`
          }"
        />
        <template v-if="ticks">
          <line
            v-for="(x, i) in tickPositions"
            :key="x"
            :x1="x"
            :x2="x"
            :y1="(height/2) - (ticksAlternate ? (i % 2 === 0 ? tickSize : tickSize * 0.5) : tickSize)"
            :y2="(height/2) + (ticksAlternate ? (i % 2 === 0 ? tickSize * 0.5 : tickSize) : tickSize)"
            class="tick"
            :stroke="color"
            :stroke-width="Math.max(1, (thickness ?? 1.5) * 0.6)"
            stroke-linecap="round"
            opacity="0.6"
          />
        </template>
        <template v-for="(p, idx) in particlesState" :key="`p-${idx}`">
          <circle v-if="!p.hiddenUntil || nowSecRef >= p.hiddenUntil" r="1.5" :fill="color" opacity="0.9" :cx="p.x" :cy="baselineY" />
        </template>
        <template v-for="(p, idx) in particlesRightState" :key="`pr-${idx}`">
          <circle v-if="!p.hiddenUntil || nowSecRef >= p.hiddenUntil" r="1.5" :fill="color" opacity="0.9" :cx="p.x" :cy="baselineY" />
        </template>
        <template v-if="waves">
          <g :clip-path="`url(#${uid}-upper)`">
            <template v-for="r in ripples" :key="r.id">
              <circle
                :cx="r.x"
                :cy="baselineY"
                :r="r.r"
                :stroke="color"
                fill="none"
                class="ripple"
                :stroke-width="waveStrokeW"
                :opacity="r.opacity"
              />
            </template>
          </g>
        </template>
      </g>
    </svg>
  </div>
  
</template>

<style scoped>
  .energy-pulse-divider {
    position: relative;
    width: 100%;
    pointer-events: none;
  }
  .epd-svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .line--glow {
    opacity: .35;
  }
  .line--core {
    opacity: .95;
    animation-name: dashMove, subtleFlicker;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
  }
  .line--core.is-flashing {
    filter: drop-shadow(0 0 6px var(--primary-a2)) drop-shadow(0 0 12px var(--primary-a3));
    opacity: 1;
  }
  .tick {
    filter: drop-shadow(0 0 2px var(--primary-a3));
  }
  @keyframes dashMove { to { stroke-dashoffset: -64; } }
  @keyframes subtleFlicker {
    0%, 100% { opacity: 1; }
    45% { opacity: .92; }
    70% { opacity: .88; }
  }
</style>