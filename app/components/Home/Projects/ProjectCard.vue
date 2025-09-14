<script lang="ts" setup>
  import type { ProgrammingArea } from '~/composables/use-areas';
  import type { Technology } from '~/composables/use-technologies';

  defineProps<{
    title: string;
    description: string;
    thumbnail: string;
    stacks: ProgrammingArea[];
    mainTechs: Technology[];
    techs: Technology[];
    live?: string;
    repoLink?: string;
  }>();
</script>

<template>
  <a :href="live" target="_blank" rel="noopener noreferrer" class="component--project__card">
    <img :src="thumbnail" alt="project-thumbnail" />
    <div class="project__header">
      <h3 class="project__title">{{ title }}</h3>
      <div class="project__techs-icons">
        <Icon
          v-for="tech in mainTechs"
          :key="tech.name"
          :name="tech.icon"
          :size="tech.size"
          :style="{ color: tech.color }"
        />
      </div>
    </div>
    <div class="project__stacks">
      <div
        v-for="stack in stacks"
        :key="stack.name"
        class="stack__item"
        :style="{ backgroundColor: stack.color }"
      >
        {{ stack.name }}
      </div>
    </div>
    <p class="description">{{ description }}</p>
    <p class="main__stack">
      <Icon name="material-symbols:code-rounded" size="20" />
      {{ mainTechs[0]?.name }}
    </p>
    <div class="project__technologies">
      <ul>
        <li
          v-for="tech in techs.filter(t => t.name !== mainTechs[0]?.name)"
          :key="tech.name"
        >
          {{ tech.name }}
        </li>
      </ul>
    </div>
    <div class="actions__container">
      <a
        v-if="live"
        :href="live"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--primary btn--sm"
      >
        <Icon name="material-symbols:open-in-new" size="16" />
        {{ $t("projects.viewLive") }}
      </a>
      <a
        v-if="repoLink"
        :href="repoLink"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn--secondary btn--sm"
      >
        <Icon name="mdi:github" size="16" />
        {{ $t("projects.viewCode") }}
      </a>
    </div>
  </a>
</template>

<style lang="scss" scoped>
  .component--project__card {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    background: linear-gradient(
      135deg,
      var(--secondary-a5) 0%,
      var(--secondary-a4) 100%
    );
    border: 1px solid var(--border-layout-o3);
    border-radius: 1rem;
    padding: 1.125rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    transition: .25s ease;
    &:hover {
      transform: translateY(-4px);
      border-color: var(--primary-a3);
      box-shadow:
        0 1px 0 rgba(255,255,255,.08) inset,
        0 0 0 1px rgba(255,255,255,.03) inset,
        0 24px 42px -20px rgba(0,0,0,.3),
        0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
    }
    &:focus-visible {
      outline: none;
      border-color: var(--primary-3);
      box-shadow:
        0 0 0 3px color-mix(in srgb, var(--primary) 32%, transparent);
    }
    img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: var(--radius);
      margin-bottom: 1rem;
      border: 1px solid var(--border-layout-o3);
      box-shadow: 0 8px 22px -12px rgba(0,0,0,.3);
    }
    .project__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .project__title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text);
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
      .project__techs-icons {
        display: flex;
        align-items: center;
        gap: .5rem;
      }
    }
    .project__stacks {
      display: flex;
      gap: .5rem;
      flex-wrap: wrap;
      .stack__item {
        display: inline-block;
        font-size: .75rem;
        font-weight: 600;
        color: var(--text-o1);
        padding: .25rem .75rem;
        border-radius: var(--radius);
      }
    }
    .description {
      flex: 1;
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-2);
      margin-top: .25rem;
      @media screen and (max-width: 768px) {
        font-size: .75rem;
      }
    }
    .main__stack {
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: .875rem;
      font-weight: 500;
      color: var(--text-3);
    }
    .project__technologies {
      ul {
        display: flex;
        align-items: center;
        gap: .35rem;
        flex-wrap: wrap;
        list-style-type: none;
        li {
          background: linear-gradient(180deg, var(--secondary-a5), var(--secondary-a4));
          border: 1px solid var(--border-layout-o3);
          border-radius: 10px;
          padding: .2rem .5rem;
          color: var(--text-2);
          font-size: .7rem;
          backdrop-filter: blur(10px) saturate(1.1);
          -webkit-backdrop-filter: blur(10px) saturate(1.1);
        }
      }
    }
    .actions__container {
      display: flex;
      align-items: center;
      gap: .5rem;
      margin-top: .5rem;
      .btn {
        display: inline-flex;
        align-items: center;
        gap: .4rem;
        height: 36px;
        padding: 0 .85rem;
        border-radius: 12px;
        border: 1px solid var(--border-layout-o3);
        background: linear-gradient(180deg, var(--secondary-a5), var(--secondary-a4));
        color: var(--text-2);
        font-size: .75rem;
        font-weight: 700;
        backdrop-filter: blur(8px) saturate(1.1);
        -webkit-backdrop-filter: blur(8px) saturate(1.1);
        transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
        @media screen and (max-width: 768px) {
          font-size: .625rem;
        }
        &:hover {
          background: linear-gradient(180deg, var(--secondary-a4), var(--secondary-a3));
          color: var(--primary);
          border-color: var(--primary-a3);
          transform: translateY(-1px);
        }
      }
    }
  }
</style>