<script lang="ts" setup>
  const { t, tm } = useI18n();
  const state = reactive({
    search: '',
  });

  const contentEl = ref<HTMLElement | null>(null);
  const gridEl = ref<HTMLElement | null>(null);
  const showMoreEl = ref<HTMLElement | null>(null);

  const windowSize = useWindowWidth();
  const areas = useProgrammingAreas();
  const technologies = useTechnologies(t, tm);

  type Project = {
    title: string;
    description: string;
    thumbnail: string;
    stacks: ProgrammingArea[];
    mainTechs: Technology[];
    techs: Technology[];
    live?: string;
    repoLink?: string;
  };

  const projects = computed<Project[]>(() => {
    const list: Project[] = [
      {
        title: t('projects.list.httpzen.title'),
        description: t('projects.list.httpzen.description'),
        thumbnail: '/httpzen.png',
        stacks: [areas.FULLSTACK],
        mainTechs: [technologies.GOLANG, technologies.TDD, technologies.VUE],
        techs: [
          technologies.TDD,
          technologies.BUBBLETEA,
          technologies.LIPGLOSS,
          technologies.VUE,
          technologies.NUXT,
          technologies.SASS,
          technologies.GOLANG
        ],
        live: 'https://httpzen.diogopereira.dev',
        repoLink: 'https://github.com/diogopereiradev/httpzen'
      },
      {
        title: t('projects.list.devy.title'),
        description: t('projects.list.devy.description'),
        thumbnail: '/devy.png',
        stacks: [areas.DESKTOP],
        mainTechs: [technologies.TAURI, technologies.REACT, technologies.RUST],
        techs: [
          technologies.TAURI,
          technologies.VITE,
          technologies.REACT,
          technologies.STYLED_COMPONENTS,
          technologies.RUST,
        ],
        live: 'https://github.com/diogopereiradev/devy',
        repoLink: 'https://github.com/diogopereiradev/devy'
      },
      {
        title: t('projects.list.pulsar.title'),
        description: t('projects.list.pulsar.description'),
        thumbnail: '/pulsar.png',
        stacks: [areas.FRONTEND],
        mainTechs: [technologies.VUE, technologies.NUXT, technologies.PRIMEVUE, technologies.TAILWIND],
        techs: [
          technologies.VUE,
          technologies.NUXT,
          technologies.PRIMEVUE,
          technologies.TAILWIND,
        ],
        live: 'https://pulsar.diogopereira.dev',
        repoLink: 'https://github.com/diogopereiradev/pulsar'
      }
    ];

  if (import.meta.client && windowSize.value <= 992) {
      list.push({
        title: t('projects.list.pixarti.title'),
        description: t('projects.list.pixarti.description'),
        thumbnail: '/pixarti.png',
        stacks: [areas.FRONTEND],
        mainTechs: [technologies.REACT, technologies.VITE, technologies.STYLED_COMPONENTS],
        techs: [
          technologies.REACT,
          technologies.VITE,
          technologies.STYLED_COMPONENTS,
        ],
        live: 'https://pixarti.vercel.app',
        repoLink: 'https://github.com/diogopereiradev/pixarti'
      });
    }

    return list;
  });

  const filteredProjects = computed(() => {
    return projects.value.filter(p => 
      p.title.match(new RegExp(state.search, 'i')) || 
      p.description.match(new RegExp(state.search, 'i')) || 
      p.techs.some(tech => tech.name.match(new RegExp(state.search, 'i')))
    );
  });
</script>

<template>
  <div id="projects" class="component--projects wrapper">
    <div class="grid__container">
      <GridEffect thickness="1px" :box-width="60" :box-height="60" />
    </div> 
    <div ref="contentEl" class="projects__content">
      <div class="projects__section">
        <div class="details__container">
          <div class="label__head-container">
            <hr />
            <span>{{ $t("projects.greeting") }}</span>
          </div>
          <div class="title__container">
            <h3>{{ $t("projects.title") }}</h3>
            <p class="description">{{ $t("projects.description") }}</p>
          </div>
        </div>
        <div class="projects__list">
          <div class="list__toolbar">
            <div class="searchbar__container">
              <HomeProjectsSearchbar @update:search="state.search = $event" />
            </div>
          </div>
          <ClientOnly>
            <div ref="gridEl" class="projects__grid">
              <HomeProjectsProjectCard
                v-for="(project, index) in filteredProjects"
                :key="project.title + '-' + index"
                :title="project.title"
                :description="project.description"
                :thumbnail="project.thumbnail"
                :stacks="project.stacks"
                :main-techs="project.mainTechs"
                :techs="project.techs"
                :live="project.live"
                :repo-link="project.repoLink"
              />
            </div>
          </ClientOnly>
          <div v-if="filteredProjects.length > 0" class="show__more-container">
            <div class="energy__effect-container">
              <EnergyCableEffect
                :container-el="contentEl"
                :start-el="gridEl"
                :end-el="showMoreEl"
                :start-at="{ x: 0.156, y: 0.9 }"
                :end-at="{ x: 0.1, y: 0.5 }"
                :thickness="4"
                :glow-blur="6"
                :curvature="3"
                :speed="0.8"
                :start-tangent-angle="100"
                :end-tangent-angle="0"
                :tip-handle="0.6"
              />
            </div>
            <a ref="showMoreEl" href="https://github.com/diogopereiradev?tab=repositories" target="_blank" class="btn btn--outline btn--md">
              {{ $t("projects.showMore") }}
              <Icon name="material-symbols:arrow-right-alt" size="16" />
            </a>
            <div v-if="filteredProjects.length >= 3 || windowSize <= 568" class="energy__effect-container right">
              <EnergyCableEffect
                :container-el="contentEl"
                :start-el="gridEl"
                :end-el="showMoreEl"
                :start-at="{ x: 0.156, y: 0.9 }"
                :end-at="{ x: 0.1, y: 0.5 }"
                :thickness="4"
                :glow-blur="6"
                :curvature="3"
                :speed="0.8"
                :start-tangent-angle="100"
                :end-tangent-angle="0"
                :tip-handle="0.6"
              />
            </div>
          </div>
          <div v-else class="no-projects__container">
            <Icon name="iconamoon:search-light" size="64" />
            <p class="description">{{ $t("projects.noProjects") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .component--projects {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    @media screen and (max-width: 640px) {
      gap: 2.5rem;
    }
    .grid__container {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      width: 2568px;
      height: 600px;
      margin: 0 auto;
      overflow: hidden;
      z-index: 0;
      @media screen and (max-width: 2570px) {
        width: 100vw;
      }
      @media screen and (max-width: 900px) {
        height: unset;
        overflow: unset;
      }
    }
    .projects__content {
      position: relative;
      width: 100%;
      z-index: 10;
      .projects__section {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 4rem;
        .details__container {
          display: flex;
          flex-direction: column;
          gap: .75rem;
          .label__head-container {
            display: flex;
            align-items: center;
            gap: 1.25rem;
            hr {
              width: 50px;
              height: 3px;
              background: linear-gradient(90deg, var(--primary), transparent);
              border: none;
              border-radius: var(--radius);
            }
            span {
              font-size: 1rem;
              font-weight: 500;
              color: var(--primary);
              letter-spacing: 2px;
              @media screen and (max-width: 920px) {
                font-size: 1rem;
              }
            }
          }
          .title__container {
            display: flex;
            flex-direction: column;
            gap: .75rem;
            h3 {
              font-size: 3.25rem;
              font-weight: 500;
              color: var(--text);
              @media screen and (max-width: 1200px) {
                font-size: 3rem;
              }
              @media screen and (max-width: 980px) {
                font-size: 2.5rem;
              }
              @media screen and (max-width: 640px) {
                font-size: 2rem;
                line-height: 1.2;
              }
            }
            .description {
              font-size: 1rem;
              font-weight: 400;
              color: var(--text-3);
              @media screen and (max-width: 640px) {
                font-size: .95rem;
              }
            }
          }
        }
        .projects__list {
          width: 100%;
          .list__toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .searchbar__container {
              width: 100%;
              max-width: 500px;
            }
          }
          .projects__grid {
            position: relative;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 2.5rem;
            z-index: 10;
            @media screen and (max-width: 992px) {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
            }
            @media screen and (max-width: 768px) {
              gap: 1rem;
            }
            @media screen and (max-width: 568px) {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            :deep(.component--project__card) {
              @media screen and (max-width: 992px) {
                &:last-child {
                  border: 3px solid var(--primary) !important;
                  animation: pulse 0.8s ease-in-out infinite !important;
                  background: var(--secondary) !important;
                }
              }
              &:nth-child(2n+1) {
                background: var(--secondary) !important;
                border: 3px solid var(--primary) !important;
                animation: pulse 0.8s ease-in-out infinite !important;
                @media screen and (max-width: 992px) {
                  &:not(:nth-last-child(2)) {
                    border: 1px solid var(--border-layout-o3) !important;
                    animation: none !important;
                  }
                }
                @media screen and (max-width: 568px) {
                  &:nth-last-child(2) {
                    border: 1px solid var(--border-layout-o3) !important;
                    animation: none !important;
                  }
                  &:last-child {
                    background: var(--secondary) !important;
                    border: 3px solid var(--primary) !important;
                    animation: pulse 0.8s ease-in-out infinite !important;
                  }
                }
              }
            }
          }
          .show__more-container {
            display: flex;
            justify-content: center;
            margin-top: 3.5rem;
            a {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              gap: .5rem;
              height: 3rem;
              padding: 0 2.5rem;
              margin-top: 2.5rem;
              font-size: .875rem;
              font-weight: 500;
              color: var(--text-o1);
              background-color: var(--primary);
              border-radius: var(--radius);
              transition: .2s;
              animation: pulse 1.2s infinite;
              z-index: 10;
              cursor: pointer;
              &:hover {
                background-color: var(--primary-3);
              }
            }
            .energy__effect-container {
              &.right {
                :deep(svg) {
                  transform: scaleX(-1);
                }
              }
            }
          }
          .no-projects__container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            color: var(--text-2);
            margin-top: 2rem;
            .description {
              font-size: 1rem;
              font-weight: 500;
              color: var(--text-2);
            }
          }
        }
      }
    }
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 4px var(--primary-a5), 0 0 22px var(--primary-a3), 0 0 44px var(--primary-a5) inset; }
    50% { box-shadow: 0 0 0 6px var(--primary-a4), 0 0 28px var(--primary-a3), 0 0 50px var(--primary-a5) inset; }
    100% { box-shadow: 0 0 0 4px var(--primary-a5), 0 0 22px var(--primary-a3), 0 0 44px var(--primary-a5) inset; }
  }
</style>