<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { computed } from 'vue'
import contactInfo from '../../content/contact.json'

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
useHead(() => ({ htmlAttrs: { lang: locale.value } }))
const availableLocales = [
  { code: 'de', icon: 'i-circle-flags-de' },
  { code: 'en', icon: 'i-circle-flags-gb' },
  { code: 'it', icon: 'i-circle-flags-it' }
]
const localeMenuItems = computed(() => availableLocales.map(item => ({
  label: t(`languageNames.${item.code}`),
  icon: item.icon,
  onSelect: () => { void navigateTo(switchLocalePath(item.code)) }
})))
const year = new Date().getFullYear()
const menuOpen = ref(false)
const activeImage = ref('')
const activeAlt = ref('')
const activeCaption = ref('')
const previousFocus = ref<HTMLElement | null>(null)
const europassPages = ['/assets/europass1.jpg', '/assets/europass2.jpg', '/assets/europass3.jpg']
const europassLabels = computed(() => [1, 2, 3].map(number => t('documents.page', { number })))
const pageIndex = ref(0)
function openPreview(src: string, alt: string, caption = alt) {
  previousFocus.value = document.activeElement as HTMLElement
  activeImage.value = src
  activeAlt.value = alt
  activeCaption.value = caption
  pageIndex.value = europassPages.indexOf(src)
  document.body.classList.add('no-scroll')
  document.getElementById('lightbox-close')?.focus()
}

function closePreview() {
  if (!activeImage.value) return
  activeImage.value = ''
  document.body.classList.remove('no-scroll')
  previousFocus.value?.focus()
}

function changeEuropassPage(direction: -1 | 1) {
  if (pageIndex.value < 0) return
  pageIndex.value = (pageIndex.value + direction + europassPages.length) % europassPages.length
  activeImage.value = europassPages[pageIndex.value]
  activeAlt.value = europassLabels.value[pageIndex.value]
  activeCaption.value = europassLabels.value[pageIndex.value]
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    menuOpen.value = false
    closePreview()
  }
  if (pageIndex.value >= 0 && event.key === 'ArrowLeft') {
    event.preventDefault()
    changeEuropassPage(-1)
  }
  if (pageIndex.value >= 0 && event.key === 'ArrowRight') {
    event.preventDefault()
    changeEuropassPage(1)
  }
}

onMounted(() => {
  document.querySelectorAll<HTMLImageElement>('.document-image').forEach((image) => {
    image.tabIndex = 0
    const open = () => openPreview(image.getAttribute('src') || '', image.alt, image.dataset.caption || image.alt)
    image.addEventListener('click', open)
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open() }
    })
  })
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('no-scroll')
})
</script>

<template>
  <div>
    <header class="header">
      <nav class="navbar container">
        <a href="#home" class="logo">AG<span>.</span></a>
        <button class="menu-toggle" aria-controls="nav-links" :aria-expanded="menuOpen" :aria-label="menuOpen ? t('nav.close') : t('nav.open')" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
        <ul id="nav-links" class="nav-links" :class="{ 'is-open': menuOpen }">
          <li><a href="#about" @click="menuOpen = false">{{ t('nav.about') }}</a></li>
          <li><a href="#education" @click="menuOpen = false">{{ t('nav.education') }}</a></li>
          <li><a href="#experience" @click="menuOpen = false">{{ t('nav.experience') }}</a></li>
          <li><a href="#documents" @click="menuOpen = false">{{ t('nav.documents') }}</a></li>
          <li><a class="nav-contact" href="#contact" @click="menuOpen = false">{{ t('nav.contact') }}</a></li>
        </ul>
        <UDropdownMenu class="language-menu" :items="localeMenuItems" :content="{ align: 'end', sideOffset: 8 }" :ui="{ content: 'language-dropdown-content', item: 'language-dropdown-item' }">
          <template #default="{ open }">
            <UButton class="language-menu-trigger" color="neutral" variant="outline" size="sm" :aria-label="t('language')" :aria-expanded="open">
              <UIcon :name="availableLocales.find(item => item.code === locale)?.icon" class="language-flag" />
              <span>{{ t(`languageNames.${locale}`) }}</span>
              <UIcon name="i-lucide-chevron-down" class="language-chevron" />
            </UButton>
          </template>
        </UDropdownMenu>
      </nav>
    </header>

    <main>
      <section id="home" class="hero container">
        <div class="hero-content">
          <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
          <h1>{{ t('hero.titleFirst') }}<br>{{ t('hero.titleSecond') }} <span>{{ t('hero.titleEmphasis') }}</span></h1>
          <p class="hero-description">{{ t('hero.description', { name: contactInfo.name }) }}</p>
          <div class="hero-buttons"><a href="#experience" class="button button-dark">{{ t('hero.experience') }}</a><a href="#documents" class="button button-outline">{{ t('hero.qualifications') }}</a></div>
          <div class="hero-details"><div><span class="detail-number">IT</span><span class="detail-label">{{ t('hero.education') }}</span></div><div><span class="detail-number">Web</span><span class="detail-label">{{ t('hero.development') }}</span></div><div><span class="detail-number">∞</span><span class="detail-label">{{ t('hero.learning') }}</span></div></div>
        </div>
        <div class="hero-visual"><div class="hero-card"><span class="card-label">{{ t('hero.background') }}</span><img src="/assets/pfp.jpg" :alt="t('profile.portraitAlt')" class="hero-profile-picture"><div class="hero-card-footer"><span>{{ t('hero.technology') }}</span><span>{{ t('hero.creativity') }}</span><span>{{ t('hero.growth') }}</span></div></div><div class="floating-note"><span class="status-dot"></span>{{ t('hero.alwaysLearning') }}</div></div>
      </section>

      <section id="about" class="section section-alt"><div class="container"><div class="section-heading"><p class="eyebrow">{{ t('about.eyebrow') }}</p><h2>{{ t('about.titleStart') }} <span>{{ t('about.titleEmphasis') }}</span></h2></div><div class="about-grid"><div class="about-intro"><h3>{{ t('about.introFirst') }}<br>{{ t('about.introSecond') }}</h3></div><div class="about-text"><p>{{ t('about.p1') }}</p><p>{{ t('about.p2') }}</p><p>{{ t('about.p3') }}</p></div></div></div></section>

      <SkillsSection />

      <ExperienceSection />

      <section id="documents" class="section container"><div class="section-heading"><p class="eyebrow">{{ t('documents.eyebrow') }}</p><h2>{{ t('documents.titleStart') }} <span>{{ t('documents.titleEmphasis') }}</span></h2><p class="section-description">{{ t('documents.description') }}</p></div>
        <div class="documents-grid"><article class="document-card"><div class="document-preview"><img src="/assets/diploma.jpg" :alt="t('documents.diplomaTitle')" class="document-image" :data-caption="t('documents.diplomaTitle')" loading="lazy"><span class="document-type">{{ t('documents.diplomaType') }}</span></div><div class="document-info"><div><h3>{{ t('documents.diplomaTitle') }}</h3><p>{{ t('documents.diplomaDescription') }}</p></div><a href="/assets/diploma.jpg" class="document-link" target="_blank" rel="noopener noreferrer">{{ t('documents.view') }}</a></div></article>
          <article class="document-card"><div class="document-preview europass-preview"><img v-for="(page, index) in europassPages" :key="page" :src="page" :alt="europassLabels[index]" class="document-image europass-image" :data-caption="europassLabels[index]" loading="lazy"><span class="document-type">{{ t('documents.europass') }}</span></div><div class="document-info"><div><h3>{{ t('documents.cvTitle') }}</h3><p>{{ t('documents.threePages') }}</p></div><button type="button" class="document-link europass-view-button" @click="openPreview(europassPages[0], europassLabels[0])">{{ t('documents.viewAll') }}</button></div></article></div>
        <p class="documents-note">{{ t('documents.note') }}</p>
      </section>

      <section id="contact" class="section contact-section"><div class="container contact-container"><p class="eyebrow">{{ t('contact.eyebrow') }}</p><h2>{{ t('contact.titleFirst') }}<br><span>{{ t('contact.titleEmphasis') }}</span>{{ t('contact.titleTail') }}</h2><p class="contact-description">{{ t('contact.description') }}</p><a :href="'mailto:' + contactInfo.email" class="button button-light">{{ t('contact.email') }}</a><div class="social-links"><a v-if="contactInfo.phone" :href="'tel:' + contactInfo.phone">{{ t('contact.phone') }}</a><a :href="contactInfo.github" target="_blank" rel="noopener noreferrer">{{ t('contact.github') }}</a><a :href="contactInfo.linkedin" target="_blank" rel="noopener noreferrer">{{ t('contact.linkedin') }}</a></div></div></section>
    </main>

    <footer class="footer"><div class="container footer-content"><a href="#home" class="logo footer-logo">AG<span>.</span></a><p>{{ t('footer.copyright', { year, name: contactInfo.name }) }}</p><a href="#home" class="back-to-top">{{ t('footer.top') }}</a></div></footer>

    <div v-if="activeImage" id="lightbox" class="lightbox" role="dialog" aria-modal="true" :aria-label="t('documents.preview')" @click.self="closePreview"><button id="lightbox-close" class="lightbox-close" :aria-label="t('documents.close')" @click="closePreview">&times;</button><p class="lightbox-caption">{{ activeCaption }}</p><button v-if="pageIndex >= 0" type="button" class="lightbox-page-button lightbox-page-previous" :aria-label="t('documents.previousPage')" :title="t('documents.previousPage')" @click="changeEuropassPage(-1)"><span aria-hidden="true">‹</span></button><img :src="activeImage" :alt="activeAlt"><button v-if="pageIndex >= 0" type="button" class="lightbox-page-button lightbox-page-next" :aria-label="t('documents.nextPage')" :title="t('documents.nextPage')" @click="changeEuropassPage(1)"><span aria-hidden="true">›</span></button></div>
  </div>
</template>

