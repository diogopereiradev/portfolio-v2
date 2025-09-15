<script lang="ts" setup>
  type ContactItem = {
    id: 'email' | 'github' | 'linkedin' | 'discord';
    icon: string;
    labelKey: string;
    value: string;
    href?: string;
  };

  const copied = reactive<Record<ContactItem['id'], boolean>>({
    email: false,
    github: false,
    linkedin: false,
    discord: false,
  });

  const items: ContactItem[] = [
    {
      id: 'email',
      icon: 'mdi:email-outline',
      labelKey: 'contact.items.email',
      value: 'contact@diogopereira.dev',
      href: 'mailto:contact@diogopereira.dev'
    },
    {
      id: 'github',
      icon: 'mdi:github',
      labelKey: 'contact.items.github',
      value: 'github.com/diogopereiradev',
      href: 'https://github.com/diogopereiradev'
    },
    {
      id: 'linkedin',
      icon: 'mdi:linkedin',
      labelKey: 'contact.items.linkedin',
      value: 'linkedin.com/in/diogopereiradev',
      href: 'https://www.linkedin.com/in/diogopereiradev/'
    },
    {
      id: 'discord',
      icon: 'mdi:discord',
      labelKey: 'contact.items.discord',
      value: 'diogo_dev',
      href: 'https://discord.com/users/882178309205671956'
    }
  ];

  async function copyToClipboard(text: string, id: ContactItem['id']) {
    try {
      await navigator.clipboard?.writeText(text);
      copied[id] = true;
      setTimeout(() => (copied[id] = false), 1600);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();

      document.execCommand('copy');
      document.body.removeChild(ta);

      copied[id] = true;
      setTimeout(() => (copied[id] = false), 1600);
    }
  }
</script>

<template>
  <div id="contact" class="component--contact wrapper">
    <div class="contact__content">
      <div class="contact__section">
        <div class="details__container">
          <div class="label__head-container">
            <hr />
            <span>{{ $t("contact.greeting") }}</span>
          </div>
          <div class="title__container">
            <h3>{{ $t("contact.title") }}</h3>
            <p class="description">{{ $t("contact.description") }}</p>
          </div>
        </div>
        <div class="contact__infos">
          <div class="contact__grid">
            <div v-for="item in items" :key="item.id" class="contact__card">
              <div class="card__icon" aria-hidden="true">
                <Icon :name="item.icon" size="20" />
              </div>
              <div class="card__content">
                <div class="card__header">
                  <h5 class="card__label">{{ $t(item.labelKey) }}</h5>
                </div>
                <p class="card__value" :title="item.value">{{ item.value }}</p>
                <div class="card__actions">
                  <button class="btn btn--ghost btn--sm" @click="copyToClipboard(item.value, item.id)">
                    <Icon :name="copied[item.id] ? 'mdi:check' : 'mdi:content-copy'" size="16" />
                    <span>{{ copied[item.id] ? $t('contact.actions.copied') : $t('contact.actions.copy') }}</span>
                  </button>
                  <a v-if="item.href" class="btn btn--primary btn--sm" :href="item.href" target="_blank" rel="noopener">
                    <Icon name="mdi:open-in-new" size="16" />
                    <span>{{ item.id === 'email' ? $t('contact.actions.sendEmail') : $t('contact.actions.open') }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="contact__cta">
            <div class="cta__content">
              <div class="cta__text">
                <h4 class="cta__title">{{ $t('contact.cta.title') }}</h4>
                <p class="cta__subtitle">{{ $t('contact.cta.subtitle') }}</p>
              </div>
              <div class="cta__actions">
                <a class="btn btn--primary" href="mailto:contact@diogopereira.dev">
                  <Icon name="mdi:email-send-outline" size="18" />
                  <span>{{ $t('contact.cta.primary') }}</span>
                </a>
                <a class="btn btn--ghost" href="https://www.linkedin.com/in/diogopereiradev/" target="_blank" rel="noopener">
                  <Icon name="mdi:linkedin" size="18" />
                  <span>{{ $t('contact.cta.secondary') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .component--contact {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    @media screen and (max-width: 640px) {
      gap: 2.5rem;
    }
    .contact__content {
      .contact__section {
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
        .contact__infos {
          .contact__grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            @media screen and (max-width: 760px) {
              grid-template-columns: 1fr;
            }
          }
          .contact__card {
            display: grid;
            grid-template-columns: 44px 1fr;
            gap: .9rem;
            align-items: start;
            padding: 1.25rem 1rem;
            border-radius: var(--radius);
            background-color: var(--secondary);
            border: 1px solid var(--border-layout-o);
            .card__icon {
              width: 44px;
              height: 44px;
              display: grid;
              place-items: center;
              border-radius: 12px;
              background: color-mix(in oklab, var(--primary-a3) 22%, transparent);
              box-shadow: inset 0 0 0 1px var(--primary-a4);
              color: var(--primary);
            }
            .card__content {
              display: flex;
              flex-direction: column;
              gap: .25rem;
              .card__label {
                font-size: .85rem;
                font-weight: 700;
                color: var(--text);
              }
              .card__value {
                font-size: .75rem;
                color: var(--text-2);
                line-height: 1.5;
                word-break: break-word;
              }
              .card__actions {
                display: flex;
                flex-wrap: wrap;
                gap: .5rem;
                margin-top: .75rem;
                .btn {
                  display: inline-flex;
                  align-items: center;
                  gap: .4rem;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  font: inherit;
                  font-weight: 700;
                  letter-spacing: .2px;
                  border-radius: 10px;
                  transition: .2s;
                  &--sm {
                    height: 34px;
                    padding: 0 .8rem;
                    font-size: .72rem;
                  }
                  &--primary {
                    background: var(--primary);
                    color: var(--text-o1);
                    box-shadow: 0 2px 18px -4px var(--primary-a2);
                  }
                  &--primary:hover {
                    background: var(--primary-3);
                    box-shadow: 0 4px 22px -6px var(--primary-a);
                  }
                  &--ghost {
                    background: var(--secondary-o2);
                    color: var(--text-2);
                    border: 1px solid var(--border-layout-o2);
                  }
                  &--ghost:hover {
                    background: var(--secondary-o3);
                    color: var(--primary);
                  }
                }
              }
            }
          }
          .contact__cta {
            margin-top: 1.5rem;
            .cta__content {
              position: relative;
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 1rem;
              align-items: center;
              padding: 1.25rem 1.25rem 1.25rem 1.25rem;
              border-radius: var(--radius);
              background-color: var(--secondary);
              border: 1px solid var(--primary);
              box-shadow: 0 10px 20px -12px var(--secondary-a5), inset 0 1px 0 0 var(--border-layout-o5);
              animation: pulse 0.8s ease-in-out infinite;
              overflow: hidden;
              isolation: isolate;
              @media screen and (max-width: 760px) {
                grid-template-columns: 1fr;
                gap: .75rem;
              }
              .cta__text {
                display: flex;
                flex-direction: column;
                gap: .4rem;
                .cta__title {
                  font-size: 1.25rem;
                  font-weight: 500;
                  color: var(--text);
                  letter-spacing: .4px;
                  @media screen and (max-width: 640px) {
                    font-size: 1.2rem;
                  }
                }
                .cta__subtitle {
                  font-size: .875rem;
                  color: var(--text-2);
                  line-height: 1.6;
                  @media screen and (max-width: 640px) {
                    font-size: .85rem;
                  }
                }
              }
              .cta__actions {
                display: flex;
                align-items: center;
                gap: .65rem;
                @media screen and (max-width: 760px) {
                  width: 100%;
                }
                @media screen and (max-width: 480px) {
                  flex-direction: column;
                }
                .btn {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  gap: .5rem;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  font: inherit;
                  font-size: .85rem;
                  padding: 0 1.25rem;
                  min-height: 2.5rem;
                  border-radius: var(--radius);
                  background-color: var(--secondary-2);
                  color: var(--text);
                  font-weight: 700;
                  letter-spacing: .2px;
                  transition: .2s;
                  @media screen and (max-width: 760px) {
                    flex: 1;
                    width: 100%;
                  }
                  &--primary {
                    background: var(--primary);
                    color: var(--text-o1);
                    box-shadow: 0 2px 18px -4px var(--primary-a2);
                    border: 1px solid var(--primary);
                    &:hover {
                      background: var(--primary-3);
                      box-shadow: 0 4px 22px -6px var(--primary-a);
                    }
                  }
                  &--ghost {
                    background: var(--secondary-oa4);
                    border: 1px solid var(--secondary-oa);
                    &:hover {
                      background: var(--secondary-oa5);
                    }
                  }
                }
              }
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