<script setup lang="ts">
import { computed } from 'vue'
import skillsData from '../../content/skills.json'

type Skill = { title: string, description: string }
type SkillsData = { technologies: string[], locales: Record<string, Skill[]> }

const { t, locale } = useI18n()
const data = skillsData as SkillsData
const skills = computed(() => data.locales[locale.value] ?? data.locales.en ?? [])
</script>

<template>
  <section id="education" class="section container">
    <div class="section-heading">
      <p class="eyebrow">{{ t('education.eyebrow') }}</p>
      <h2>{{ t('education.titleStart') }} <span>{{ t('education.titleEmphasis') }}</span></h2>
      <p class="section-description">{{ t('education.description') }}</p>
    </div>

    <div class="education-card">
      <div class="education-icon">01</div>
      <div class="education-content">
        <p class="card-label">{{ t('education.formal') }}</p>
        <h3>{{ t('education.degree') }}</h3>
        <p class="muted">{{ t('education.diploma') }}</p>
        <p>{{ t('education.study') }}</p>
        <p class="small-note">{{ t('education.placeholder') }}</p>
      </div>
    </div>

    <div class="skills-grid">
      <article v-for="(skill, index) in skills" :key="`${skill.title}-${index}`" class="skill-card">
        <span class="skill-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.description }}</p>
      </article>
    </div>

    <div class="technology-section">
      <h3>{{ t('education.technologies') }}</h3>
      <div class="technology-list">
        <span v-for="technology in data.technologies" :key="technology">{{ technology }}</span>
      </div>
    </div>
  </section>
</template>
