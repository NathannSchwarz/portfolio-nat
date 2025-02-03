<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projects from '@/data/projectsData' // ✅ Importation des projets
import ProjectComp from '@/components/ProjectComp.vue'

const route = useRoute()
const router = useRouter()

// 🟢 Trouver le projet actuel via `id`
const project = computed(() => projects.find((p) => p.id.toString() === route.params.id))

// 🛑 Si le projet n'existe pas, rediriger vers l'accueil
if (!project.value) {
  router.push('/')
}

// 🟢 Filtrer les projets liés (même catégorie, mais exclure le projet en cours)
const relatedProjects = computed(() => {
  return projects.filter(
    (p) => p.category === project.value?.category && p.id !== project.value?.id,
  )
})
</script>

<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5">
    <div v-if="project">
      <section class="lg:grid lg:grid-cols-12 mb-24 md:mb-28 lg:mb-36">
        <div class="lg:w-10/12 lg:col-span-10">
          <h1
            class="text-5xl text-black font-lactos md:text-[6rem] lg:text-[8rem] pt-8 md:pt-12 lg:pt-16 pb-8"
          >
            {{ project.title }}
          </h1>
          <h2
            class="text-black font-unbounded font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-5 lg:mb-10"
          >
            {{ project.subtitleid }}
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
            <div class="grid grid-cols-4 gap-y-2 lg:gap-y-4">
              <img
                v-for="(image, index) in project.softwareImages"
                :key="index"
                :src="image"
                alt="Software Used"
                class="w-8 md:w-10 lg:w-12"
              />
            </div>
          </div>
        </div>
      </section>

      <img
        class="w-full md:h-[45vw] object-cover mb-6 md:mb-5"
        :src="project.images.secondary2"
        alt="Project Last Image"
      />

      <!-- ✅ Images spécifiques pour chaque projet -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      <section v-if="relatedProjects.length" class="mt-20">
        <h4 class="text-3xl text-black font-lactos md:text-[2.5rem] lg:text-[3.5rem] mb-6">
          RELATED PROJECTS
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <router-link
            v-for="(related, index) in relatedProjects"
            :key="index"
            :to="`/project/${related.id}`"
          >
            <ProjectComp
              :id="related.id"
              :imageSrc="related.imageSrc"
              :imageAlt="related.imageAlt"
              :title="related.title"
              :subtitle="related.subtitle"
            />
          </router-link>
        </div>
      </section>
    </div>

    <!-- Message d'erreur si le projet n'existe pas (au cas où le route.push ne fonctionne pas) -->
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-red-500">Project not found</h2>
      <router-link to="/" class="text-blue-500 hover:underline">Return to home</router-link>
    </div>
  </section>
</template>
