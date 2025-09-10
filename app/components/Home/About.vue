<script setup lang="ts">
  type Insight = {
    icon: string;
    title: string;
    desc: string;
  };

  type TimelineItem = {
    period: string;
    role: string;
    description: string;
  };

  const contentEl = ref<HTMLElement | null>(null);
  const avatarEl = ref<HTMLElement | null>(null);
  const timelineEl = ref<HTMLElement | null>(null);

  const insights = computed(() => {
    return $tm('about.insights') as Insight[];
  });

  const timeline = computed(() => {
    return $tm('about.timeline') as TimelineItem[];
  });
</script>

<template>
  <div class="component--about wrapper">
    <div ref="contentEl" class="about__content">
      <div class="about__section">
        <div class="details__container">
          <div class="label__head-container">
            <hr />
            <span>{{ $t("about.greeting") }}</span>
          </div>
          <div class="title__container">
            <h3>{{ $t("about.title") }}</h3>
            <p class="description">{{ $t("about.description") }}</p>
          </div>
        </div>
        <div class="about__details">
          <div class="details__main-container">
            <div ref="avatarEl" class="profile__avatar-container">
              <NuxtImg class="profile__avatar" src="/profile.png" format="webp" />
            </div>
            <div class="about__paragraphs">
              <p v-for="paragraph in $tm('about.paragraphs')" :key="paragraph">
                {{ $rt(paragraph) }}
              </p>
            </div>
          </div>
          <aside class="about__insights">
            <div class="insight__grid">
              <div
                v-for="(item, idx) in insights"
                :key="$rt(item.title) + idx"
                class="insight__card"
              >
                <div class="insight__icon" aria-hidden="true">
                  <Icon :name="$rt(item.icon)" size="18" />
                </div>
                <div class="insight__text">
                  <h5 class="insight__title">{{ $rt(item.title) }}</h5>
                  <p class="insight__desc">{{ $rt(item.desc) }}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    <div ref="timelineEl" class="about__timeline">
      <div v-for="item in timeline" :key="item.period" class="time__item">
        <h4 class="time__period">{{ $rt(item.period) }}</h4>
        <h3 class="time__role">{{ $rt(item.role) }}</h3>
        <p class="time__desc">{{ $rt(item.description) }}</p>
      </div>
    </div>
    <div class="energy__cable-container">
      <EnergyCableEffect
        :container-el="contentEl"
        :start-el="avatarEl"
        :end-el="timelineEl"
        :start-at="{ x: 0.55, y: 0 }"
        :end-at="{ x: 0.84, y: -1 }"
        :thickness="3"
        :glow-blur="6"
        :curvature="0.5"
        :speed="1.5"
        :start-tangent-angle="100"
        :end-tangent-angle="60"
        :tip-handle="1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .component--about {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6.5rem;
    @media screen and (max-width: 1200px) {
      gap: 2rem;
    }
    @media screen and (max-width: 640px) {
      gap: 2.5rem;
    }
    .about__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 10;
      @media screen and (max-width: 980px) {
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
      }
      .about__section {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        @media screen and (max-width: 900px) {
          width: 100%;
        }
        @media screen and (max-width: 640px) {
          gap: 2rem;
        }
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
        .about__details {
          display: grid;
          grid-template-columns: 1fr 445px;
          gap: 2rem;
          @media screen and (max-width: 1200px) {
            grid-template-columns: 1fr;
          }
          .details__main-container {
            display: flex;
            gap: 2rem;
            @media screen and (max-width: 600px) {
              flex-direction: column;
            }
            .profile__avatar-container {
              @media screen and (max-width: 600px) {
                margin: 0 auto;
              }
              .profile__avatar {
                grid-area: avatar;
                width: 260px;
                height: 260px;
                border-radius: var(--radius);
                object-fit: cover;
                border: 3px solid var(--primary);
                animation: pulse 1.2s ease-in-out infinite;
                @media screen and (max-width: 980px) {
                  width: 200px;
                  height: 200px;
                }
                @media screen and (max-width: 600px) {
                  width: 100%;
                  max-width: 300px;
                  height: auto;
                  aspect-ratio: 1 / 1;
                  margin: 0 auto;
                }
              }
            }
            .about__paragraphs {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              max-width: 760px;
              @media screen and (max-width: 1200px) {
                max-width: 100%;
              }
              p {
                font-weight: 400;
                font-size: .975rem;
                color: var(--text-2);
                line-height: 1.8;
                @media screen and (max-width: 1300px) {
                  font-size: .875rem;
                }
                @media screen and (max-width: 640px) {
                  line-height: 1.7;
                }
              }
            }
          }
          .about__insights {
            position: sticky;
            top: 96px;
            align-self: start;
            width: 100%;
            @media screen and (max-width: 1200px) {
              width: 100%;
              min-width: unset;
            }
            .insight__grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: .75rem;
              @media screen and (max-width: 640px) {
                grid-template-columns: 1fr;
              }
            }
            .insight__card {
              display: grid;
              grid-template-columns: 36px 1fr;
              gap: .75rem;
              align-items: start;
              height: 122px;
              padding: .875rem;
              border-radius: calc(var(--radius) - 6px);
              background: linear-gradient(180deg, var(--secondary-a5), transparent), color-mix(in oklab, var(--secondary-oa) 10%, transparent);
              border: 1px solid var(--border-layout-2);
              box-shadow: 0 10px 20px -12px var(--secondary-a5), inset 0 1px 0 0 var(--border-layout-o5);
              transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease, background .25s ease;
              &:hover {
                transform: translateY(-2px);
                border-color: var(--border-layout-o2);
                box-shadow: 0 14px 26px -12px var(--secondary-a5), 0 0 0 1px var(--primary-a4) inset;
                background: linear-gradient(180deg, var(--primary-a5), transparent), color-mix(in oklab, var(--secondary-oa) 12%, transparent);
              }
              .insight__icon {
                width: 36px;
                height: 36px;
                display: grid;
                place-items: center;
                border-radius: 10px;
                background: color-mix(in oklab, var(--primary-a3) 22%, transparent);
                box-shadow: inset 0 0 0 1px var(--primary-a4);
                color: var(--primary);
              }
              .insight__text {
                display: flex;
                flex-direction: column;
                gap: .25rem;
                .insight__title {
                  font-size: .9rem;
                  font-weight: 700;
                  color: var(--text);
                  @media screen and (max-width: 640px) {
                    font-size: .875rem;
                  }
                }
                .insight__desc {
                  font-size: .75rem;
                  color: var(--text-2);
                  line-height: 1.6;
                  @media screen and (max-width: 640px) {
                    font-size: .725rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .about__timeline {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 1.25rem;
      padding-bottom: .25rem;
      z-index: 10;
      @media screen and (max-width: 900px) {
        flex-direction: column-reverse;
      }
      .time__item {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: .35rem;
        padding: 1rem;
        border-radius: calc(var(--radius) - 6px);
        background: linear-gradient(180deg, var(--secondary-a5), transparent), color-mix(in oklab, var(--secondary-oa) 10%, transparent);
        border: 1px solid var(--border-layout-2);
        box-shadow: 0 10px 20px -12px var(--secondary-a5), inset 0 1px 0 0 var(--border-layout-o5);
        transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        &:last-child {
          background: var(--secondary-o);
          border: 3px solid var(--primary);
          animation: pulse 0.8s ease-in-out infinite;
        }
        &:hover {
          &:not(:last-child) {
            transform: translateY(-2px);
            border-color: var(--border-layout-o2);
            box-shadow: 0 14px 26px -12px var(--secondary-a5), 0 0 0 1px var(--primary-a4) inset;
          }
        }
        .time__period {
          font-size: .75rem;
          font-weight: 600;
          letter-spacing: .4px;
          text-transform: uppercase;
          color: var(--primary);
          @media screen and (max-width: 640px) {
            font-size: .7rem;
          }
        }
        .time__role {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text);
          @media screen and (max-width: 800px) {
            display: flex;
          }
          @media screen and (max-width: 640px) {
            font-size: 1rem;
          }
        }
        .time__desc {
          font-size: .85rem;
          font-weight: 400;
          color: var(--text-2);
          line-height: 1.7;
          @media screen and (max-width: 640px) {
            font-size: .8rem;
            line-height: 1.6;
          }
        }
      }
    }
    .energy__cable-container {
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 4px var(--primary-a5), 0 0 22px var(--primary-a3), 0 0 44px var(--primary-a5) inset; }
    50% { box-shadow: 0 0 0 6px var(--primary-a4), 0 0 28px var(--primary-a3), 0 0 50px var(--primary-a5) inset; }
    100% { box-shadow: 0 0 0 4px var(--primary-a5), 0 0 22px var(--primary-a3), 0 0 44px var(--primary-a5) inset; }
  }
</style>