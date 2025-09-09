<script setup lang="ts">
  const badgeEl = ref<HTMLElement | null>(null);
  const cardEl = ref<HTMLElement | null>(null);
  const contentEl = ref<HTMLElement | null>(null);
  const projectsEl = ref<HTMLElement | null>(null);
</script>

<template>
  <div class="component--header wrapper">
    <div class="blurred__effect-container">
      <div class="blurred__effect left"></div>
      <div class="blurred__effect right"></div>
    </div>
    <div class="grid__container">
      <GridEffect thickness="1px" :box-width="60" :box-height="60" />
    </div>
    <div ref="contentEl" class="header__content">
      <div class="header__section">
        <div class="details__container">
          <div class="label__head-container">
            <hr />
            <span>{{ $t("header.greeting") }}</span>
          </div>
          <div class="title__container">
            <h1>Diogo Pereira</h1>
            <p class="description">{{ $t("header.description") }}</p>
          </div>
          <div class="badges__container">
            <div class="badge"><span>Frontend</span></div>
            <div class="badge"><span>Backend</span></div>
            <div class="badge"><span>DevOps</span></div>
            <div class="badge"><span>Mobile</span></div>
            <div ref="badgeEl" class="badge last"><span>Desktop</span></div>
          </div>
          <div class="actions__container">
            <div ref="projectsEl">
              <NuxtLink to="#projects" class="btn btn--primary">{{ $t("header.actions.viewProjects") }}</NuxtLink>
            </div>
            <div>
              <NuxtLink to="#contact" class="btn btn--ghost">{{ $t("header.actions.letsTalk") }}</NuxtLink>
            </div>
            <div class="github__link-container">
              <a href="https://github.com/diogopereiradev" target="_blank" class="btn github__link">{{ $t("header.actions.openGithub") }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="energy__effect-container desktop">
        <EnergyCableEffect
          :container-el="contentEl"
          :start-el="badgeEl"
          :end-el="cardEl"
          :start-at="{ x: 1, y: 0.5 }"
          :end-at="{ x: 0, y: 0.19 }"
          :thickness="3"
          :glow-blur="6"
          :curvature="4"
          :speed="0.8"
          :start-tangent-angle="1"
          :end-tangent-angle="1"
          :tip-handle="1"
        />
      </div>
      <div class="energy__effect-container mobile">
        <EnergyCableEffect
          :container-el="contentEl"
          :start-el="projectsEl"
          :end-el="cardEl"
          :start-at="{ x: 0.25, y: 0.9 }"
          :end-at="{ x: 0.9, y: 0.1 }"
          :thickness="3"
          :glow-blur="6"
          :curvature="3"
          :start-tangent-angle="40"
          :end-tangent-angle="80"
          :speed="0.8"
          :tip-handle="0.5"
        />
      </div>
      <div class="header__section">
        <div ref="cardEl" class="card__highlight">
          <span class="label">{{ $t('header.highlight.label') }}</span>
          <p class="value">{{ $t('header.highlight.value') }}</p>
          <p class="sub">{{ $t('header.highlight.sub') }}</p>
          <ul class="points">
            <li v-for="(point, idx) in $tm('header.highlight.points')" :key="idx">
              {{ $rt(point) }}
            </li>
          </ul>
          <div class="stats">
            <div class="stat">
              <span class="stat__value">{{ new Date().getFullYear() - 2016 }}+</span>
              <span class="stat__label">{{ $t('header.highlight.stats.years') }}</span>
            </div>
            <div class="stat">
              <span class="stat__value">10+</span>
              <span class="stat__label">{{ $t('header.highlight.stats.projects') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header__scroll-hint">
      <span class="wheel"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .component--header {
    width: 100%;
    height: 600px;
    overflow: hidden;
    @media screen and (max-width: 900px) {
      height: unset;
      overflow: unset;
    }
    .blurred__effect-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 1200px;
      overflow: hidden;
      z-index: 1;
      .blurred__effect {
        position: absolute;
        width: 400px;
        height: 400px;
        filter: blur(150px);
        &.left {
          left: -200px;
          top: -200px;
          background: var(--primary);
          opacity: .5;
          @media screen and (max-width: 2000px) {
            opacity: .2;
            left: -300px;
          }
        }
        &.right {
          right: -200px;
          top: 250px;
          background: var(--primary);
          opacity: .3;
          @media screen and (max-width: 2000px) {
            opacity: .1;
            right: -300px;
          }
        }
      }
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
    .header__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
      @media screen and (max-width: 900px) {
        width: 100%;
        flex-direction: column;
        justify-content: unset;
        gap: 3rem;
      }
      .header__section {
        @media screen and (max-width: 900px) {
          width: 100%;
        }
        .details__container {
          position: relative;
          padding: 8rem 0 0 0;
          z-index: 3;
          .label__head-container {
            display: flex;
            align-items: center;
            gap: 20px;
            hr {
              width: 50px;
              height: 3px;
              background: linear-gradient(90deg, var(--primary), transparent);
              border: none;
              border-radius: var(--radius);
            }
            span {
              font-size: 1.5rem;
              font-weight: 500;
              color: var(--primary);
              letter-spacing: 2px;
              @media screen and (max-width: 920px) {
                font-size: 1rem;
              }
            }
          }
          .title__container {
            h1 {
              display: flex;
              align-items: center;
              gap: .5rem;
              font-size: 6rem;
              font-weight: 600;
              color: var(--text);
              background: radial-gradient(circle, var(--text), var(--primary));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              @media screen and (max-width: 1300px) {
                font-size: 4.5rem;
              }
              @media screen and (max-width: 920px) {
                font-size: 3.65rem;
              }
            }
            .description {
              margin-top: 1rem;
              font-size: 1rem;
              font-weight: 400;
              color: var(--text-2);
              max-width: 600px;
              line-height: 1.5rem;
              @media screen and (max-width: 1300px) {
                font-size: .875rem;
                max-width: 400px;
              }
            }
          }
          .badges__container {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1.75rem;
            .badge {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: .65rem 1rem;
              background: var(--secondary-a);
              border-radius: var(--radius);
              position: relative;
              overflow: hidden;
              backdrop-filter: blur(4px) saturate(160%);
              box-shadow: 0 8px 28px -10px rgba(0,0,0,.55), 0 0 0 1px transparent inset;
              &.first {
                &::before {
                  content: '';
                  position: absolute;
                  left: -50%;
                  top: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle at 30% 30%, var(--primary-a3), transparent 60%);
                  opacity: .55;
                  pointer-events: none;
                }
              }
              &.last {
                &::before {
                  content: '';
                  position: absolute;
                  right: -50%;
                  top: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle at 70% 70%, var(--primary-a3), transparent 60%);
                  opacity: .55;
                  pointer-events: none;
                }
              }
              span {
                font-size: .65rem;
                letter-spacing: .5px;
                font-weight: 600;
                color: var(--text);
              }
              &::after {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(120deg,transparent,var(--primary) 140%);
                mix-blend-mode: overlay;
                opacity: .25;
                pointer-events: none;
              }
            }
            .database__icon {
              color: var(--primary-2);
            }
          }
          .actions__container {
            display: flex;
            align-items: center;
            gap: .65rem;
            margin-top: 2rem;
            div {
              @media screen and (max-width: 668px) {
                width: 100%;
              }
            }
            .github__link-container {
              @media screen and (max-width: 668px) {
                display: none;
              }
            }
            .btn {
              display: flex;
              align-items: center;
              gap: .5rem;
              border: none;
              outline: none;
              cursor: pointer;
              font: inherit;
              font-size: .875rem;
              padding: 0 3rem;
              height: 3.25rem;
              border-radius: var(--radius);
              background-color: var(--secondary-2);
              color: var(--text);
              font-weight: 600;
              transition: .2s;
              @media screen and (max-width: 668px) {
                padding: 0 1.5rem;
                height: 3rem;
                font-size: .75rem;
              }
              @media screen and (max-width: 400px) {
                padding: 0 .75rem;
              }
              &--primary {
                background: var(--primary);
                color: var(--text-o1);
                box-shadow: 0 2px 18px -4px var(--primary-a2);
                border: 2px solid var(--primary);
                &:hover {
                  background: var(--primary-3);
                  box-shadow: 0 4px 22px -6px var(--primary-a);
                }
                @media screen and (max-width: 668px) {
                  width: 100%;
                }
              }
              &--ghost {
                background: var(--secondary-oa4);
                border: 2px solid var(--secondary-oa);
                &:hover {
                  background: var(--secondary-oa5);
                }
                @media screen and (max-width: 668px) {
                  width: 100%;
                }
              }
              &.github__link {
                background: transparent;
                color: var(--primary);
                padding: 0 1rem;
                height: unset;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
        .card__highlight {
          display: flex;
          flex-direction: column;
          gap: .5rem;
          max-width: 400px;
          width: 100%;
          background-color: var(--secondary-o);
          border-radius: 20px;
          padding: 1.35rem 1.4rem 1.6rem;
          backdrop-filter: blur(12px) saturate(200%);
          box-shadow: 0 8px 28px -10px rgba(0,0,0,.55), 0 0 0 1px transparent inset;
          position: relative;
          z-index: 10;
          overflow: hidden;
          @media screen and (max-width: 1068px) {
            max-width: 300px;
          }
          @media screen and (max-width: 900px) {
            max-width: unset;
          }
          &::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 20%, var(--primary-a5), transparent 60%);
            opacity: .9;
            mix-blend-mode: overlay;
            pointer-events: none;
          }
          .label {
            font-size: .75rem;
            letter-spacing: 1px;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--primary);
          }
          .value {
            font-weight: 600;
            font-size: 1.875rem;
            line-height: 1.15;
            background: linear-gradient(120deg,#fff,var(--primary-2));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            @media screen and (max-width: 1068px) {
              font-size: 1.5rem;
            }
          }
          .sub {
            font-size: .75rem;
            font-weight: 500;
            color: var(--text-2);
            letter-spacing: .5px;
            margin-top: .25rem;
          }
          .points {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            margin: .75rem 0 0;
            padding: 0;
            li {
              position: relative;
              font-size: .7rem;
              font-weight: 500;
              padding-left: .9rem;
              line-height: 1.1rem;
              color: var(--text);
              opacity: .85;
              &::before {
                content: '';
                position: absolute;
                left: 0;
                top: .45rem;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--primary);
                box-shadow: 0 0 0 3px var(--primary-a3);
              }
            }
          }
          .stats {
            display: flex;
            align-items: stretch;
            gap: .75rem;
            margin-top: 1rem;
            .stat {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: .15rem;
              background-color: var(--secondary);
              border-radius: 12px;
              padding: .65rem .6rem .55rem;
              position: relative;
              overflow: hidden;
              &::after {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 70% 30%,var(--primary-a4),transparent 65%);
                mix-blend-mode: overlay;
                opacity: .5;
                pointer-events: none;
              }
              .stat__value {
                font-size: 1rem;
                font-weight: 600;
                line-height: 1;
                background: linear-gradient(120deg,#fff,var(--primary-2));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
              .stat__label {
                font-size: .55rem;
                font-weight: 600;
                letter-spacing: .75px;
                text-transform: uppercase;
                color: var(--text-2);
                opacity: .9;
              }
            }
          }
        }
      }
      .energy__effect-container {
        &.desktop {
          @media screen and (max-width: 900px) {
            display: none;
          }
        }
        &.mobile {
          display: none;
          @media screen and (max-width: 900px) {
            display: unset;
          }
        }
      }
    }
    .header__scroll-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 40px;
      border: 2px solid rgba(255,255,255,.25);
      border-radius: 16px;
      display: grid;
      place-items: flex-start;
      padding-top: 6px;
      opacity: .65;
      margin: 2.4rem auto 0 auto;
      .wheel {
        width: 4px;
        height: 6px;
        background: var(--primary);
        border-radius: 2px;
        animation: wheel 1.5s cubic-bezier(.65,.05,.36,1) infinite;
      }
    }
  }
  @keyframes wheel {
    0% { transform: translateY(0); opacity: 0;}
    25% { opacity: 1;}
    60% { transform: translateY(14px); opacity: 1;}
    100% { transform: translateY(20px); opacity: 0; }
  }
</style>