<script setup lang="ts">
import '~/assets/css/main.css'

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap'
    }
  ],
  meta: [
    { name: 'theme-color', content: '#30241f' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
