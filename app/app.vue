<script lang="ts" setup>
  const { t, locale } = useI18n();
  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    titleTemplate: (titleChunk) =>
      titleChunk ? `Diogo Pereira | ${titleChunk}` : 'Diogo Pereira | Fullstack Developer',
    meta: [
      {
        name: 'description',
        content: t('meta.description')
      },
      {
        property: 'og:title',
        content: t('meta.title')
      },
      {
        property: 'og:description',
        content: t('meta.description')
      },
      {
        property: 'og:image',
        content: 'https://diogopereira.dev/images/banner.jpg'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://diogopereira.dev'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'keywords',
        content: t('meta.keywords')
      },
      {
        name: 'charset',
        content: 'UTF-8'
      },
      { name: 'apple-mobile-web-app-title', content: t('meta.title') },
      {
        name: 'theme-color',
        content: '#22ecce'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: t('meta.title')
      },
      {
        name: 'twitter:description',
        content: t('meta.description')
      },
      {
        name: 'twitter:image',
        content: 'https://diogopereira.dev/images/banner.jpg'
      },
      {
        name: 'twitter:url',
        content: 'https://diogopereira.dev'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
      { rel: 'manifest', href: '/favicons/site.webmanifest' }
    ],
  })
</script>

<template>
  <main class="app__main">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>