<script lang="ts" setup>
	const year = new Date().getFullYear();
	const { t } = useI18n();

	const nav = [
		{ to: '#header', label: 'nav.home' },
		{ to: '#about', label: 'nav.about' },
		{ to: '#projects', label: 'nav.projects' },
		{ to: '#skills', label: 'nav.skills' },
		{ to: '#contact', label: 'nav.contact' },
    { to: 'https://github.com/diogopereiradev', label: 'nav.github' }
	];
</script>

<template>
	<footer class="component--footer">
    <div class="top__divider">
      <EnergyPulseDivider />
    </div>
		<div class="footer__content-container wrapper">
		  <div class="footer__content">
		  	<div class="footer__col brand">
		  		<NuxtLink to="#header" class="brand__link">
		  			<div class="brand__logo">
		  				<AppLogo />
		  			</div>
		  			<span class="brand__name">Diogo Pereira</span>
		  		</NuxtLink>
		  		<p class="brand__tagline">
		  			{{ t('meta.description') }}
		  		</p>
		  	</div>
		  	<nav class="footer__col nav">
		  		<ul>
		  			<li v-for="item in nav" :key="item.to">
		  				<NuxtLink :to="item.to">{{ t(item.label) }}</NuxtLink>
		  			</li>
		  		</ul>
		  	</nav>
		  	<div class="footer__col social">
		  		<a
		  			class="social__btn"
		  			href="mailto:contact@diogopereira.dev"
		  			target="_blank"
		  			rel="noopener"
		  		>
		  			<Icon name="material-symbols:mail-rounded" size="18" />
		  		</a>
		  		<a
		  			class="social__btn"
		  			href="https://github.com/diogopereiradev"
		  			target="_blank"
		  			rel="noopener"
		  		>
		  			<Icon name="mdi:github" size="18" />
		  		</a>
		  		<a
		  			class="social__btn"
		  			href="https://www.linkedin.com/in/diogopereiradev/"
		  			target="_blank"
		  			rel="noopener"
		  		>
		  			<Icon name="mdi:linkedin" size="18" />
		  		</a>
		  	</div>
		  </div>
		  <div class="footer__bottom">
		  	<p class="rights">
		  		<span>© {{ year }}</span>
		  		<span class="dot">•</span>
		  		<span>{{ t('footer.rights') }}</span>
		  		<span class="dot">•</span>
		  		<span>{{ t('footer.madeWith') }}</span>
		  		<span class="dot">•</span>
		  		<span>{{ t('footer.by') }} Diogo Pereira</span>
		  	</p>
		  </div>
    </div>
	</footer>
</template>

<style lang="scss" scoped>
	.component--footer {
		position: relative;
		background: var(--secondary);
    .top__divider {
      width: 100%;
      position: absolute;
      top: -26px;
      left: 0;
      z-index: 9999;
    }
    .footer__content-container {
      position: relative;
      z-index: 1;
      .footer__content {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1.2fr 1fr auto;
        gap: 2rem;
        padding: 2rem 0;
        @media screen and (max-width: 900px) {
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .footer__col {
          &.brand {
            display: flex;
            flex-direction: column;
            gap: .75rem;
            .brand__link {
              display: inline-flex;
              align-items: center;
              gap: .6rem;
              text-decoration: none;
              color: var(--text);
              .brand__logo {
                max-width: 28px;
                min-width: 28px;
                width: 28px;
                :deep(.component--app__logo) {
                  width: 28px !important;
                  height: 28px !important;
                  svg {
                    width: 28px !important;
                    height: 28px !important;
                  }
                }
              }
              .brand__name {
                font-weight: 700;
                font-size: .95rem;
                letter-spacing: .3px;
                background: linear-gradient(120deg,#fff,var(--primary-2));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
              }
            }
            .brand__tagline {
              font-size: .8rem;
              color: var(--text-2);
              max-width: 580px;
              line-height: 1.35rem;
              opacity: .85;
            }
          }
          &.nav {
            ul {
              list-style: none;
              padding: 0; margin: 0;
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: .6rem 1.25rem;
              @media screen and (max-width: 900px) {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
              @media screen and (max-width: 520px) {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
              li {
                a {
                  position: relative;
                  text-decoration: none;
                  color: var(--text-2);
                  font-weight: 500;
                  font-size: .75rem;
                  letter-spacing: .2px;
                  padding: .2rem 0;
                  transition: .25s;
                  &::after {
                    content: '';
                    position: absolute;
                    left: 0; bottom: -2px;
                    height: 2px;
                    width: 100%;
                    background: linear-gradient(90deg,var(--primary),var(--primary-3));
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform .25s cubic-bezier(.65,.05,.36,1);
                  }
                  &:hover,&:focus-visible { color: var(--primary); }
                  &:hover::after,&:focus-visible::after { transform: scaleX(1); }
                }
              }
            }
          }
          &.social {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: .5rem;
            @media screen and (max-width: 900px) {
              justify-content: flex-start;
            }
            .social__btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: calc(var(--radius) - 4px);
              background: var(--secondary-2);
              color: var(--text);
              transition: .2s;
              &:hover {
                background: var(--secondary-o3);
                color: var(--primary);
              }
            }
          }
        }
      }
      .footer__bottom {
        border-top: 1px solid var(--border-layout-o);
        padding: .9rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        @media screen and (max-width: 700px) {
          justify-content: center;
        }
        .rights {
          margin: 0;
          font-size: .75rem;
          color: var(--text-2);
          display: flex;
          align-items: center;
          min-height: 2rem;
          gap: .6rem;
          @media screen and (max-width: 600px) {
            flex-direction: column;
          }
          .dot {
            opacity: .5;
            @media screen and (max-width: 600px) {
              display: none;
            }
          }
        }
      }
    }
	}
</style>
