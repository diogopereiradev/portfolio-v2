<script lang="ts" setup>
  const state = reactive({
    search: '',
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
            width: 100%;
            .searchbar__container {
              width: 100%;
              max-width: 500px;
            }
          }
        }
      }
    }
  }
</style>