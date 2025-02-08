<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectComp from '@/components/ProjectComp.vue'
import FleurPleineBleu from '@/components/icons/FleurPleineBleu.vue'
import FleurPleineRouge from '@/components/icons/FleurPleineRouge.vue'
import FleurPleineYellow from '@/components/icons/FleurPleineYellow.vue'
import projects from '@/data/projectsData' // ✅ Import des projets centralisés

// Filtres disponibles
const filters = ['ALL', 'WEB SITE', 'BRANDING', 'GRAPHIC DESIGN']

// Filtres actifs (par défaut "ALL")
const activeFilters = ref(['ALL'])

// Projets filtrés en fonction des filtres actifs
const filteredProjects = computed(() => {
  if (activeFilters.value.includes('ALL') || activeFilters.value.length === 0) {
    return projects
  }
  return projects.filter((project) => activeFilters.value.includes(project.category))
})

// Fonction pour gérer le changement des filtres
const toggleFilter = (filter: string) => {
  if (filter === 'ALL') {
    activeFilters.value = ['ALL']
  } else {
    activeFilters.value = activeFilters.value.filter((f) => f !== 'ALL')

    if (activeFilters.value.includes(filter)) {
      activeFilters.value = activeFilters.value.filter((f) => f !== filter)
    } else {
      activeFilters.value.push(filter)
    }

    if (activeFilters.value.length === 0) {
      activeFilters.value = ['ALL']
    }
  }
}

// Compte le nombre de projets pour chaque filtre
const countProjects = (filter: string) => {
  if (filter === 'ALL') {
    return projects.length
  }
  return projects.filter((project) => project.category === filter).length
}
</script>

<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5">
    <h1
      class="text-5xl text-black font-lactos md:text-[7rem] lg:text-[8rem] xl:text-[10rem] pt-32 md:pt-36 lg:pt-40 z-10 relative pb-8 lg:pb-20"
    >
      MY WORK
    </h1>
    <p
      class="font-unbounded font-light  text-xs md:text-base md:w-2/3 lg:text-lg lg:w-8/12 xl:text-2xl xl:w-7/12 -mt-4 md:-mt-6 lg:-mt-16"
    >
      I bring a unique perspective to every project, blending expertise in
      <span class="font-medium">web design</span>,
      <span class="font-medium">motion design</span> with a passion for creativity. I’m committed to
      creating meaningful, impactful designs.<br />
      Let’s collaborate <span class="font-medium">to bring your vision to life</span>.
    </p>

    <!-- Decorative Images -->
    <FleurPleineRouge
      class="absolute top-[21.5rem] left-2 w-[18vw] z-0 md:top-[27rem] md:left-10 md:w-[14vw] lg:left-20 lg:top-[32rem] xl:w-[12vw] xl:top-[35rem]  animate-spin-slow-20"
    />
    <FleurPleineYellow
      class="absolute top-20 -right-6 w-[24vw] z-0 md:right-20 md:top-[5rem] md:w-[16vw] lg:right-32 lg:top-24 xl:w-[15vw] xl:top-[10rem] animate-spin-slow"
    />
    <FleurPleineBleu
      class="absolute top-[19rem] right-10 w-[20vw] z-0 md:w-[24vw] md:top-[20rem] md:right-20 lg:right-32 lg:top-[25rem] xl:w-[21vw] xl:top-[25rem] xl:right-40 animate-spin-reverse-slow"
    />

    <!-- Filter Buttons -->
    <ul
      class="flex flex-wrap font-unbounded font-light text-xl mt-44 gap-4 md:mt-52 md:text-2xl md:gap-6 lg:text-2xl lg:gap-10 lg:mt-96 xl:text-4xl xl:gap-14"
    >
      <li
        v-for="filter in filters"
        :key="filter"
        @click="toggleFilter(filter)"
        class="relative cursor-pointer transition-colors duration-500 hover:text-colored"
        :class="{
          'text-colored': activeFilters.includes(filter),
          'text-black': !activeFilters.includes(filter),
        }"
      >
        {{ filter }}
        <sup class="absolute -top-3 -right-4 text-sm">
          {{ countProjects(filter) }}
        </sup>
      </li>
    </ul>

    <!-- Project Grid -->
    <section class="mt-10 md:mt-14 lg:mt-16 xl:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5   xl:gap-0">
      <div v-for="(project, index) in filteredProjects" :key="index" :class="project.gridClass">
        <ProjectComp
          :id="project.id"
          :imageSrc="project.imageSrc"
          :imageAlt="project.imageAlt"
          :title="project.title"
          :subtitle="project.subtitle"
        />
      </div>
    </section>
  </section>
</template>

<style scoped></style>
