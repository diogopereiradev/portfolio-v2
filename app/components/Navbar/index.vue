<script lang="ts" setup>
  const { locale, setLocale } = useI18n();

  const windowWidth = useWindowWidth();
  const isMobileMenuOpen = ref(false);
</script>

<template>
  <nav class="component--navbar">
    <div class="navbar__frame">
      <div class="navbar__section-container wrapper">
        <div class="frame__section">
          <NuxtLink to="/" class="app__home-link">
            <div class="app__logo">
              <AppLogo />
            </div>
          </NuxtLink>
        </div>
        <div class="frame__section navigation__section">
          <ul class="navbar__nav">
            <li><NuxtLink to="#header">{{ $t('nav.home') }}</NuxtLink></li>
            <li><NuxtLink to="#about">{{ $t('nav.about') }}</NuxtLink></li>
            <li><NuxtLink to="#projects">{{ $t('nav.projects') }}</NuxtLink></li>
            <li><NuxtLink to="#skills">{{ $t('nav.skills') }}</NuxtLink></li>
            <li><NuxtLink to="#contact">{{ $t('nav.contact') }}</NuxtLink></li>
          </ul>
        </div>
        <div class="frame__section">
          <div class="navbar__actions">
            <button class="btn btn--ghost" @click="setLocale(locale === 'en' ? 'pt' : 'en')">
              <Icon name="material-symbols:translate-rounded" size="16" />
              <span>{{ locale.toUpperCase() }}</span>
            </button>
            <a class="btn btn--ghost github__link" href="https://github.com/diogopereiradev" target="_blank" rel="noopener">
              <Icon name="mdi:github" size="16" />
            </a>
            <NuxtLink class="btn btn--primary" to="#contact">
              <span>{{ $t('nav.hireMe') }}</span>
            </NuxtLink>
            <hr v-if="windowWidth <= 768" class="mobile__navigation-divider" />
            <button v-if="windowWidth <= 768" class="mobile__navigation-btn btn btn--ghost" @click="isMobileMenuOpen = !isMobileMenuOpen">
              <Icon name="material-symbols:menu-rounded" size="16" />
            </button>
            <NavbarMobileMenu
              v-if="windowWidth <= 768"
              :is-open="isMobileMenuOpen"
              @close="isMobileMenuOpen = false"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .component--navbar {
    z-index: 999;
    .navbar__frame {
      display: flex;
      align-items: center;
      background-color: var(--secondary);
      border-bottom: 2px solid #1d263b;
      min-height: 64px;
      .navbar__section-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .frame__section {
          display: flex;
          align-items: center;
          gap: .5rem;
          &.navigation__section {
            @media screen and (max-width: 768px) {
              display: none;
            }
          }
          .app__home-link {
            display: flex;
            align-items: center;
            gap: .5rem;
            .app__logo {
              max-width: 32px;
              min-width: 32px;
              width: 32px;
              :deep(.component--app__logo) {
                width: 32px !important;
                height: 32px !important;
                svg {
                  width: 32px !important;
                  height: 32px !important;
                }
              }
            }
          }
          .navbar__nav {
            display: flex;
            align-items: center;
            gap: 1.75em;
            list-style: none;
            li {
              a {
                position: relative;
                text-decoration: none;
                color: var(--text-2);
                font-weight: 500;
                font-size: .8rem;
                letter-spacing: .5px;
                padding: .4rem .2rem;
                transition: .35s;
                &::after {
                  content: '';
                  position: absolute;
                  left: 0; bottom: 0;
                  height: 2px; width: 100%;
                  background: linear-gradient(90deg,var(--primary),var(--primary-3));
                  transform: scaleX(0);
                  transform-origin: left;
                  transition: transform .35s cubic-bezier(.65,.05,.36,1);
                }
                &:hover,&:focus-visible {
                  color: var(--primary);
                }
                &:hover::after,&:focus-visible::after {
                  transform: scaleX(1); 
                }
              }
            }
          }
          .navbar__actions {
            display: flex;
            align-items: center;
            gap: .65rem;
            .btn {
              display: flex;
              align-items: center;
              gap: .5rem;
              border: none;
              outline: none;
              cursor: pointer;
              font: inherit;
              font-size: .75rem;
              padding: 0 1rem;
              height: 36px;
              border-radius: var(--radius);
              background-color: var(--secondary-2);
              color: var(--text);
              font-weight: 600;
              transition: .2s;
              @media screen and (max-width: 340px) {
                padding: 0 .75rem;
              }
              &--primary {
                background: var(--primary);
                color: var(--text-o1);
                box-shadow: 0 2px 18px -4px var(--primary-a2);
                &:hover {
                  background: var(--primary-3);
                  box-shadow: 0 4px 22px -6px var(--primary-a);
                }
              }
              &--ghost {
                background: var(--secondary-o);
                &:hover { background: var(--secondary-o3); }
              }
              &.github__link {
                @media screen and (max-width: 400px) {
                  display: none;
                }
              }
            }
            .mobile__navigation-divider {
              display: none;
              border: none;
              height: 20px;
              width: 1px;
              min-width: 1px;
              background: var(--border-layout-o);
              @media screen and (max-width: 768px) {
                display: block;
              }
            }
            .mobile__navigation-btn {
              display: none;
              @media screen and (max-width: 768px) {
                display: flex;
              }
            }
          }
        }
      }
    }
  }
</style>