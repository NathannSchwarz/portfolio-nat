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
      class="text-5xl text-black font-lactos md:text-[7rem] lg:text-[8rem] xl:text-[10rem] pt-28 md:pt-36 lg:pt-40 z-10 relative pb-8 lg:pb-20"
    >
      MY WORK
    </h1>
    <p
      class="font-unbounded font-light text-xs md:text-base md:w-2/3 lg:text-lg lg:w-8/12 xl:text-2xl xl:w-7/12 -mt-4 md:-mt-6 lg:-mt-16 leading-[2vh] xl:leading-[3.6vh]"
    >
      Every project is an opportunity to refine ideas, explore new perspectives, and craft unique design solutions that blend <span class="font-normal">creativity</span> and <span class="font-normal">functionality</span>. From concept to execution, I strive to create visuals that not only look great but also <span class="font-normal">serve a purpose</span>.

    </p>

    <!-- Decorative Images -->
    <FleurPleineRouge
      class="absolute top-[20.5rem] left-2 w-[18vw] z-0 md:top-[27rem] md:left-10 md:w-[14vw] lg:left-20 lg:top-[32rem] xl:w-[12vw] xl:top-[35rem] animate-spin-slow-20"
    />
    <FleurPleineYellow
      class="absolute top-20 -right-6 w-[24vw] z-0 md:right-20 md:top-[5rem] md:w-[16vw] lg:right-32 lg:top-24 xl:w-[15vw] xl:top-[10rem] animate-spin-slow"
    />
    <FleurPleineBleu
      class="absolute top-[19rem] right-10 w-[20vw] z-0 md:w-[24vw] md:top-[20rem] md:right-20 lg:right-32 lg:top-[25rem] xl:w-[21vw] xl:top-[25rem] xl:right-40 animate-spin-reverse-slow"
    />

    <!-- Filter Buttons -->
    <ul
      class="flex flex-wrap font-unbounded font-light text-base mt-44 gap-3 gap-x-6 md:mt-52 md:text-xl md:gap-x-8 lg:text-2xl lg:gap-x-10 lg:mt-96 xl:text-4xl xl:gap-x-14"
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
    <section
      class="mt-10 md:mt-14 lg:mt-16 xl:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-10 xl:gap-0 xl:-mx-5"
    >
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
