<script lang="ts" setup>
  const areas = useProgrammingAreas();
  const techs = useTechnologies();
  const state = reactive({
    search: '',
    filter: undefined as ProgrammingArea | undefined,
    selectedSkill: Object.values(techs).sort((a, b) => (a?.priority ?? Number.MAX_SAFE_INTEGER) - (b?.priority ?? Number.MAX_SAFE_INTEGER))[0] as Technology | undefined,
    isTechsExpanded: false,
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
      result: result.slice(0, state.search.length > 0 || state.isTechsExpanded ? undefined : 6),
      hasMore: result.length > 6,
    };
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
        .skills__list {
          width: 100%;
          .list__toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
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
              background: var(--primary-a5);
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
                font-size: .675rem;
                font-weight: 600;
                color: var(--text);
              }
            }
          }
        }
      }
    }
  }
</style>