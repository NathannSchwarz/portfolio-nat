<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projects from '@/data/projectsData' // ✅ Importation des projets centralisés

const route = useRoute()
const router = useRouter()
const projectId = computed(() => parseInt(route.params.id as string, 10))

// 🟢 Trouver le projet correspondant
const project = computed(() => projects.find((p) => p.id === projectId.value))

// 🛑 Si l'ID est invalide, rediriger vers la page d'accueil
if (!project.value) {
  router.push('/')
}
</script>


<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5">
    <div v-if="project">
      <section class="lg:grid lg:grid-cols-12 mb-14 md:mb-18 lg:mb-24">
        <div class="lg:w-10/12 lg:col-span-10">
          <h1
            class="text-5xl text-black font-lactos md:text-[6rem] lg:text-[8rem] pt-8 md:pt-12 lg:pt-16 pb-8"
          >
            {{ project.title }}
          </h1>
          <h2
            class="text-black font-unbounded font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 lg:mb-10"
          >
            {{ project.subtitle }}
          </h2>
          <p
            class="font-unbounded font-light text-base md:text-lg lg:text-2xl mb-10 md:mb-12 lg:w-4/5"
          >
            {{ project.description }}
          </p>
        </div>

        <div class="flex lg:flex-col lg:mt-14 gap-[5vw] md:gap-[7vw] lg:gap-[2vw] lg:col-span-2">
          <div>
            <h2
              class="text-black font-unbounded font-semibold text-base md:text-lg lg:text-2xl mb-3 md:mb-4 lg:mb-5"
            >
              MY WORK
            </h2>
            <ul class="font-unbounded font-light text-sm md:text-base lg:text-2xl">
              <li v-for="(item, index) in project.myWork" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div class="lg:mt-10">
            <h2
              class="text-black font-unbounded font-semibold text-base md:text-lg lg:text-2xl mb-3 md:mb-4 lg:mb-5"
            >
              LOGICIEL UTILISÉ
            </h2>
            <img :src="project.softwareImage" alt="Software Used" class="w-8 md:w-10 lg:w-12" />
          </div>
        </div>
      </section>

      <!-- ✅ Images spécifiques pour chaque projet -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:mt-10">
        <img
          class="w-full md:h-[45vw] object-cover"
          :src="project.images.main"
          alt="Project Main Image"
        />
        <img
          class="w-full md:h-[45vw] object-cover"
          :src="project.images.secondary1"
          alt="Project Secondary Image"
        />
      </div>

      <div class="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
        <div class="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
          <h3
            class="text-black font-unbounded font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 lg:mb-7"
          >
            DESCRIPTION
          </h3>
          <p
            class="font-unbounded font-light text-base md:text-lg lg:text-2xl mb-10 md:mb-12 lg:w-3/4"
          >
            {{ project.description2 }}
          </p>
        </div>
      </div>

      <img
        class="w-full md:h-[45vw] object-cover mb-16 md:mb-20 lg:mb-40"
        :src="project.images.secondary2"
        alt="Project Last Image"
      />

      <h4 class="text-3xl text-black font-lactos md:text-[2.5rem] lg:text-[3.5rem]">
        RELATED PROJECT
      </h4>
    </div>

    <!-- Message d'erreur si le projet n'existe pas (au cas où le route.push ne fonctionne pas) -->
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-red-500">Project not found</h2>
      <router-link to="/" class="text-blue-500 hover:underline">Return to home</router-link>
    </div>
  </section>
</template>
