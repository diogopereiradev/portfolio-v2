<script lang="ts" setup>
  import type { ProjectArea, ProjectTechnology } from '~/types/project';

  defineProps<{
    title: string;
    description: string;
    thumbnail: string;
    stacks: ProjectArea[];
    mainTechs: ProjectTechnology[];
    techs: ProjectTechnology[];
    live?: string;
    repoLink?: string;
  }>();
</script>

<template>
  <a :href="live" target="_blank" class="component--project__card">
    <NuxtImg :src="thumbnail" alt="project-thumbnail" />
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
    background: var(--secondary-o);
    border: 1px solid var(--border-layout-o3);
    border-radius: 16px;
    padding: 1.125rem;
    position: relative;
    overflow: hidden;
    transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 34px -18px rgba(0,0,0,.75);
    }
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(1000px 200px at 0% 0%, var(--primary-a5), transparent 40%);
      pointer-events: none;
      mix-blend-mode: overlay;
    }
    img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: var(--radius);
      margin-bottom: 1rem;
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
          background: var(--secondary-o2);
          border: 1px solid var(--border-layout-o3);
          border-radius: 8px;
          padding: .15rem .4rem;
          color: var(--text-2);
          font-size: .7rem;
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
        padding: 0 .75rem;
        border-radius: 10px;
        border: 1px solid var(--border-layout-o3);
        background: var(--secondary-2);
        color: var(--text-2);
        font-size: .75rem;
        font-weight: 700;
        transition: .2s;
        @media screen and (max-width: 768px) {
          font-size: .625rem;
        }
        &:hover {
          background: var(--secondary-o3);
          color: var(--primary);
        }
      }
    }
  }
</style>