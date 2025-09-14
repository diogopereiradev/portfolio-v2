<script lang="ts" setup>
  type Props = { isOpen: boolean };
  const props = defineProps<Props>();
  const emit = defineEmits(['close']);

  const { locale, setLocale } = useI18n();

  interface NavItem {
    to: string;
    labelKey: string;
    icon: string;
  }

  const navItems: NavItem[] = [
    { to: '#header', labelKey: 'nav.home', icon: 'mdi:home-variant' },
    { to: '#about', labelKey: 'nav.about', icon: 'mdi:account-badge' },
    { to: '#projects', labelKey: 'nav.projects', icon: 'mdi:folder-multiple-outline' },
    { to: '#skills', labelKey: 'nav.skills', icon: 'mdi:star-circle-outline' },
    { to: '#contact', labelKey: 'nav.contact', icon: 'mdi:email-send-outline' }
  ];

  function toggleLocale() {
    setLocale(locale.value === 'en' ? 'pt' : 'en');
  }
</script>

<template>
  <div class="component--header__mobile-menu">
    <div class="menu__frame" :class="{ 'is-open': props.isOpen }"> 
      <div class="menu__glass">
        <header class="menu__header">
          <NuxtLink to="#header" class="brand" @click="emit('close')">
            <AppLogo />
            <span class="brand__text">Diogo.dev</span>
          </NuxtLink>
          <button class="icon-btn close__btn" @click="emit('close')">
            <Icon name="material-symbols:close-rounded" size="20" />
          </button>
        </header>
        <div class="menu__actions">
          <NuxtLink class="primary-cta" to="#contact" @click="emit('close')">
            <span>Hire me</span>
            <Icon name="mdi:arrow-right" size="18" />
          </NuxtLink>
          <button class="chip" @click="toggleLocale">
            <Icon name="material-symbols:translate-rounded" size="18" />
            <span>{{ locale.toUpperCase() }}</span>
          </button>
          <a class="chip" href="https://github.com/diogopereiradev" target="_blank" rel="noopener">
            <Icon name="mdi:github" size="18" />
            <span>GitHub</span>
          </a>
        </div>
        <nav class="menu__nav">
          <ul>
            <li v-for="(item, idx) in navItems" :key="item.to" :style="{ '--_i': idx }">
              <NuxtLink :to="item.to" @click="emit('close')">
                <Icon :name="item.icon" size="18" />
                <span>{{ $t(item.labelKey) }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <footer class="menu__footer">
          <small>© {{ new Date().getFullYear() }} Diogo Pereira</small>
        </footer>
      </div>
    </div>
    <div class="menu__overlay" :class="{ 'is-open': props.isOpen }" @click="emit('close')"></div>
  </div>
</template>

<style lang="scss" scoped>
  .component--header__mobile-menu {
    .menu__frame {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 360px;
      height: 100%;
      background: transparent;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: .75rem;
      transition: transform .5s cubic-bezier(.65,.05,.36,1), opacity .35s;
      transform: translateX(-100%);
      opacity: 0;
      &.is-open {
        transform: translateX(0);
        opacity: 1;
      }
      .menu__glass {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        width: 100%;
        height: 100%;
        background: var(--secondary);
        border-radius: var(--radius);
        padding: 1.25rem 1.25rem 1rem;
        overflow-y: auto;
        backdrop-filter: blur(14px) saturate(160%);
        &::before, &::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }
        &::after {
          background: linear-gradient(120deg,var(--primary-a2),transparent 30%,transparent 70%,var(--primary-a));
          mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
          -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
          mask-composite: exclude;
          -webkit-mask-composite: destination-out;
          padding: 1px;
          opacity: .75;
        }
      }
      .menu__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .75rem;
        .brand {
          display: flex;
          align-items: center;
          gap: .6rem;
          font-weight: 600;
          font-size: .9rem;
          color: var(--text);
          padding: .5rem .75rem;
          border-radius: var(--radius);
          background-color: var(--secondary-2);
          text-decoration: none;
          transition: .2s;
          &:hover {
            background-color: var(--secondary-o);
          }
          :deep(.component--app__logo) {
            width: 26px !important;
            height: 26px !important;
          }
        }
        .icon-btn.close__btn {
          background: var(--secondary-o2);
          border: 1px solid var(--border-layout-o2);
          width: 42px;
          height: 42px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-2);
          transition: .2s;
          &:hover {
            background: var(--secondary-o3);
            color: var(--primary);
          }
        }
      }
      .menu__nav {
        ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: .65rem;
          padding: 0; margin: 0;
          li {
            a {
              position: relative;
              display: flex;
              align-items: center;
              gap: .75rem;
              padding: .85rem 1rem;
              border: 1px solid var(--border-layout-o3);
              border-radius: var(--radius);
              color: var(--text-2);
              font-size: .8rem;
              font-weight: 600;
              letter-spacing: .5px;
              text-decoration: none;
              overflow: hidden;
              isolation: isolate;
              transition: .35s;
              &:hover {
                background-color: var(--secondary-o);
              }
            }
          }
        }
      }
      .menu__actions {
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
        margin-top: .35rem;
        .chip {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .55rem .85rem;
          background: var(--secondary-o2);
          color: var(--text-2);
          font-size: .7rem;
          font-weight: 600;
          border-radius: var(--radius);
          border: 1px solid var(--border-layout-o2);
          cursor: pointer;
          text-decoration: none;
          transition: .3s;
          &:hover {
            background: var(--secondary-o3);
            color: var(--primary);
          }
        }
        .primary-cta {
          flex: 1 1 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .6rem;
          padding: .9rem 1rem;
          border-radius: var(--radius);
          background: linear-gradient(90deg,var(--primary),var(--primary-3));
          color: var(--text-o1);
          font-weight: 700;
          font-size: .8rem;
          letter-spacing: .5px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 26px -10px var(--primary-a2);
          transition: .4s;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 34px -12px var(--primary-a);
          }
          &:active {
            transform: translateY(0);
          }
        }
      }
      .menu__footer {
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: .5rem;
        small {
          font-size: .6rem;
          color: var(--text-3);
          letter-spacing: .75px;
        }
      }
    }
    .menu__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(125deg, rgba(0,0,0,.55), rgba(0,0,0,.75));
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: .2s;
      &.is-open {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>