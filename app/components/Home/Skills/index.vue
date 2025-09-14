<script lang="ts" setup>
  const { t, tm } = useI18n();
  const windowWidth = useWindowWidth();

  const areas = useProgrammingAreas();
  const techs = useTechnologies(t, tm);
  const state = reactive({
    search: '',
    filter: undefined as ProgrammingArea | undefined,
    selectedSkill: Object.values(techs).sort((a, b) => (a?.priority ?? Number.MAX_SAFE_INTEGER) - (b?.priority ?? Number.MAX_SAFE_INTEGER))[0] as Technology | undefined,
    isTechsExpanded: false,
  });

  const techsCollapsedLimit = computed(() => {
    if (windowWidth.value >= 1400) return 6;
    if (windowWidth.value >= 1200) return 5;
    if (windowWidth.value >= 768) return 4;
    if (windowWidth.value >= 640) return 3;
    return 2;
  });

  const skills = computed(() => {
    const search = state.search.toLowerCase();
    const result = Object.values(techs)
      .filter(t => !t.hidden)
      .filter(t => t.areas.find(a => a.name === state.filter?.name) || !state.filter)
      .sort((a, b) => (a?.priority ?? Number.MAX_SAFE_INTEGER) - (b?.priority ?? Number.MAX_SAFE_INTEGER))
      .filter(tech => {
        return tech.name.toLowerCase().includes(search);
      });

    return {
      seoSkills: result.map(s => ({
        name: s.name,
        startAt: s.startAt,
        description: s?.description?.(),
        knowledges: s?.knowledges?.() || []
      })),
      result: result.slice(0, state.search.length > 0 || state.isTechsExpanded ? undefined : techsCollapsedLimit.value),
      hasMore: result.length > techsCollapsedLimit.value,
    };
  });

  const experienceYears = computed(() => {
    const start = state.selectedSkill?.startAt;
    if (!start) return undefined;

    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) return undefined;

    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();

    const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);

    return Math.max(0, Math.floor(years));
  });

  const experienceMonths = computed(() => {
    const start = state.selectedSkill?.startAt;
    if (!start) return undefined;

    const startDate = new Date(start);
    if (Number.isNaN(startDate.getTime())) return undefined;

    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();

    const months = diffMs / (1000 * 60 * 60 * 24 * 30.44);

    return Math.max(0, Math.floor(months));
  });

  watch(() => state.isTechsExpanded, () => {
    state.selectedSkill = skills.value.result[0];
  });

  watch([() => state.search, () => state.filter], () => {
    state.selectedSkill = skills.value.result[0];
    state.isTechsExpanded = false;
  });
</script>

<template>
  <div id="skills" class="component--skills wrapper">
    <div class="seo__hidden-skills" :style="{ display: 'none' }">{{ skills.seoSkills }}</div>
    <div class="skills__content">
      <div class="skills__section">
        <div class="details__container">
          <div class="label__head-container">
            <hr />
            <span>{{ $t("skills.greeting") }}</span>
          </div>
          <div class="title__container">
            <h3>{{ $t("skills.title") }}</h3>
            <p class="description">{{ $t("skills.description") }}</p>
          </div>
        </div>
        <div class="skills__list">
          <div class="list__toolbar">
            <div class="searchbar__container">
              <HomeSkillsSearchbar @update:search="state.search = $event" />
            </div>
            <div class="areas__filters">
              <button
                v-for="area in Object.values(areas).filter(a => !a.hidden)"
                :key="area.name"
                class="filter__chip"
                :class="{ active: state.filter?.name === area.name }"
                @click="state.filter = state.filter?.name === area.name ? undefined : area"
              >
                {{ area.name }}
              </button>
            </div>
          </div>
          <div class="technologies__container">
            <button
              v-for="tech in skills.result"
              :key="tech.name"
              class="tech__chip"
              :class="{ active: state.selectedSkill?.name === tech.name }"
              @click="state.selectedSkill = tech"
            >
              <div class="tech__icon" :style="{ '--icon-color': tech.color }">
                <Icon
                  :name="tech.icon"
                  :size="String(Number(tech.size) - 4)"
                />
              </div>
              <div class="tech__title">
                <h4>{{ tech.name }}</h4>
              </div>
            </button>
            <button
              v-if="state.search.length < 1 && skills.hasMore"
              class="toggle__button"
              @click="state.isTechsExpanded = !state.isTechsExpanded"
            >
              <Icon
                class="icon"
                name="material-symbols:keyboard-arrow-down-rounded"
                size="20"
                :style="{ transform: `rotate(${state.isTechsExpanded ? 180 : 0}deg)` }"
              />
              <span v-if="state.isTechsExpanded" class="title">{{ $t('skills.collapseButton') }}</span>
              <span v-else class="title">{{ $t('skills.expandButton') }}</span>
            </button>
          </div>
        </div>
        <ClientOnly>
          <Transition name="fade-slide" mode="out-in">
            <div
              v-if="state.selectedSkill"
              :key="state.selectedSkill.name"
              class="skill__infos"
              :style="{ '--icon-color': state.selectedSkill.color }"
            >
              <div class="left">
                <div class="header">
                  <div class="title__container">
                    <div class="icon">
                      <Icon :name="state.selectedSkill.icon" size="20" />
                    </div>
                    <h4 class="title">{{ state.selectedSkill.name }}</h4>
                  </div>
                  <span v-if="state.selectedSkill.startAt && (experienceYears || 0) > 0" class="since__badge">
                    {{ $t('skills.since', { date: new Date(state.selectedSkill.startAt).getFullYear() }) }}
                    <template v-if="experienceYears !== undefined">
                      {{ $t('skills.approxYears', { years: experienceYears }) }}
                    </template>
                  </span>
                  <span v-if="state.selectedSkill.startAt && (experienceMonths || 0) > 0 && (experienceYears || 0) < 1" class="since__badge">
                    {{ $t('skills.since', { date: new Date(state.selectedSkill.startAt).getFullYear() }) }}
                    <template v-if="experienceMonths !== undefined">
                      {{ $t('skills.approxMonths', { months: experienceMonths }) }}
                    </template>
                  </span>
                </div>
                <p class="skill__description">{{ state.selectedSkill.description() }}</p>
              </div>
              <ul class="knowledges">
                <li v-for="knowledge in state.selectedSkill.knowledges()" :key="knowledge">
                  {{ knowledge }}
                </li>
              </ul>
            </div>
          </Transition>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .component--skills {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    @media screen and (max-width: 640px) {
      gap: 2.5rem;
    }
    .skills__content {
      .skills__section {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 2rem;
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
        .skills__list {
          width: 100%;
          .list__toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            @media screen and (max-width: 1000px) {
              justify-content: unset;
              align-items: unset;
              flex-direction: column;
            }
            .searchbar__container {
              width: 100%;
              max-width: 500px;
            }
            .areas__filters {
              display: flex;
              align-items: center;
              gap: .5rem;
              flex-wrap: wrap;
              .filter__chip {
                display: inline-flex;
                align-items: center;
                height: 34px;
                padding: 0 .75rem;
                border-radius: 999px;
                border: 1px solid var(--secondary-oa);
                background: var(--secondary-oa4);
                color: var(--text);
                font-size: .75rem;
                font-weight: 600;
                cursor: pointer;
                transition: .2s;
                &:hover { background: var(--secondary-oa5); }
                &.active {
                  background: var(--primary);
                  border-color: var(--primary);
                  color: var(--text-o1);
                  box-shadow: 0 2px 18px -4px var(--primary-a2);
                }
              }
            }
          }
          .technologies__container {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1rem;
            margin-top: 3rem;
            @media screen and (max-width: 1400px) {
              grid-template-columns: repeat(6, 1fr);
            }
            @media screen and (max-width: 1200px) {
              grid-template-columns: repeat(5, 1fr);
            }
            @media screen and (max-width: 768px) {
              grid-template-columns: repeat(4, 1fr);
            }
            @media screen and (max-width: 640px) {
              grid-template-columns: repeat(3, 1fr);
            }
            @media screen and (max-width: 480px) {
              grid-template-columns: repeat(2, 1fr);
            }
            .tech__chip {
              display: flex;
              align-items: center;
              gap: .75rem;
              padding: .5rem .5rem;
              border-radius: var(--radius);
              border: 1px solid var(--border-layout-o3);
              background: linear-gradient(180deg, var(--background), var(--secondary));
              transition: .2s ease;
              position: relative;
              overflow: hidden;
              cursor: pointer;
              &:hover {
                transform: translateY(-2px);
                border-color: var(--primary-a5);
              }
              &.active {
                border-color: var(--primary);
                background: linear-gradient(180deg, var(--background), var(--primary-a5));
              }
              .tech__icon {
                display: grid;
                place-items: center;
                min-width: 2rem;
                height: 2rem;
                border-radius: calc(var(--radius) - 4px);
                background: color-mix(in oklab, var(--icon-color), transparent 86%);
                color: var(--icon-color);
                border: 1px solid color-mix(in oklab, var(--icon-color), transparent 70%);
              }
              .tech__title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: .5rem;
                h4 {
                  font-size: .675rem;
                  font-weight: 600;
                  color: var(--text);
                }
              }
            }
            .toggle__button {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-direction: row-reverse;
              gap: .75rem;
              padding: 0 1rem;
              height: 3.125rem;
              border-radius: var(--radius);
              border: 1px solid var(--border-layout-o3);
              background: var(--secondary-o2);
              transition: .2s ease;
              position: relative;
              overflow: hidden;
              cursor: pointer;
              &:hover {
                transform: translateY(-2px);
                border-color: var(--primary-a5);
              }
              .icon {
                color: var(--text);
                transition: .2s ease;
              }
              .title {
                font-size: .75rem;
                font-weight: 600;
                color: var(--text);
              }
            }
          }
        }
        .skill__infos {
          position: relative;
          display: grid;
          grid-template-columns: 500px 1fr;
          gap: 2rem;
          padding: 1.25rem;
          border-radius: var(--radius);
          border: 1px solid var(--border-layout-o3);
          background: var(--secondary);
          overflow: hidden;
          @media screen and (max-width: 1400px) {
            grid-template-columns: 1fr;
          }
          .left {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              .title__container {
                display: flex;
                align-items: center;
                gap: .75rem;
                .icon {
                  display: grid;
                  place-items: center;
                  min-width: 2.625rem;
                  height: 2.625rem;
                  border-radius: calc(var(--radius) - 4px);
                  background: color-mix(in oklab, var(--icon-color), transparent 86%);
                  color: var(--icon-color);
                  border: 1px solid color-mix(in oklab, var(--icon-color), transparent 70%);
                  @media screen and (max-width: 400px) {
                    min-width: 2rem;
                    height: 2rem;
                  }
                }
                .title {
                  font-size: 1.125rem;
                  font-weight: 700;
                  color: var(--text);
                  letter-spacing: .2px;
                  @media screen and (max-width: 400px) {
                    font-size: .875rem;
                  }
                }
              }
              .since__badge {
                display: inline-flex;
                align-items: center;
                height: 28px;
                padding: 0 .625rem;
                border-radius: var(--radius);
                border: 1px solid var(--secondary-oa);
                background: var(--secondary-oa4);
                color: var(--text-2);
                font-size: .7rem;
                font-weight: 700;
                text-wrap: nowrap;
              }
            }
          }
          .skill__description {
            font-size: .875rem;
            line-height: 1.6;
            color: var(--text-3);
            @media screen and (max-width: 400px) {
              font-size: .75rem;
            }
          }
          .knowledges {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: .5rem .75rem;
            margin-top: .5rem;
            padding: 0;
            @media screen and (max-width: 768px) {
              grid-template-columns: 1fr;
            }
            li {
              position: relative;
              display: flex;
              align-items: center;
              gap: .5rem;
              padding: 0 0 0 1.75rem;
              color: var(--text-2);
              font-size: .875rem;
              font-weight: 500;
              @media screen and (max-width: 500px) {
                font-size: .75rem;
              }
              &::before {
                content: '';
                position: absolute;
                left: .6rem;
                width: .5rem;
                height: .5rem;
                border-radius: 50%;
                background: var(--icon-color);
                box-shadow: 0 0 0 3px color-mix(in oklab, var(--icon-color), transparent 85%);
              }
            }
          }
        }
      }
    }
  }
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: opacity .2s ease, transform .2s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(6px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
</style>