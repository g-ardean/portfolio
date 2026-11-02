<script setup lang="ts">
import { computed } from 'vue'
import experienceData from '../../content/experience.json'

type Experience = {
  category: string
  title: string
  company: string
  dates: string
  description: string
  points?: string[]
}

const { t, locale } = useI18n()
const jobsByLocale = experienceData as Record<string, Experience[]>
const jobs = computed(() => jobsByLocale[locale.value] ?? jobsByLocale.en ?? [])
</script>

<template>
  <section id="experience" class="section section-alt">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">{{ t('experience.eyebrow') }}</p>
        <h2>{{ t('experience.titleStart') }} <span>{{ t('experience.titleEmphasis') }}</span></h2>
        <p class="section-description">{{ t('experience.description') }}</p>
      </div>

      <div class="timeline">
        <article v-for="(job, index) in jobs" :key="`${job.title}-${index}`" class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="experience-top">
              <div>
                <p class="card-label">{{ job.category }}</p>
                <h3>{{ job.title }}</h3>
                <p class="muted">{{ job.company }}</p>
              </div>
              <span class="date-badge">{{ job.dates }}</span>
            </div>
            <p>{{ job.description }}</p>
            <ul v-if="job.points?.length" class="experience-list">
              <li v-for="point in job.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
