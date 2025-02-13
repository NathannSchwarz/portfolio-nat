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

const limitedRelatedProjects = computed(() => {
  if (!relatedProjects.value.length) return []
  return relatedProjects.value
    .sort(() => Math.random() - 0.5) // Mélange aléatoire
    .slice(0, 3) // Prend les 3 premiers
})
</script>

<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5 pt-20 md:pt-24 lg:pt-28">
    <div v-if="project">
      <section class="lg:grid lg:grid-cols-12 mb-24 md:mb-28 lg:mb-36">
        <div class="lg:w-10/12 lg:col-span-10">
          <h1
            class="text-5xl text-black font-lactos md:text-[6rem] lg:text-[7rem] xl:text-[8rem] pt-8 md:pt-12 lg:pt-12 pb-8"
          >
            {{ project.title }}
          </h1>
          <h2
            class="text-black font-unbounded font-semibold text-lg md:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-8"
          >
            {{ project.subtitleid }}
          </h2>
          <p
            class="font-unbounded font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-8 lg:w-4/5"
            v-html="project.description"
          ></p>

          <a
            v-if="project.externalLink"
            :href="project.externalLink"
            target="_blank"
            rel="noopener noreferrer"
            class="text-colored hover:text-coloblue text-sm md:text-base xl:text-xl font-semibold font-unbounded transition-colors duration-500"
          >
            {{ project.externalLinktext }}
          </a>
        </div>

        <div
          class="flex lg:flex-col mt-10 lg:mt-14 gap-[5vw] md:gap-[7vw] lg:gap-[2vw] lg:col-span-2"
        >
          <div>
            <h2
              class="text-black font-unbounded font-semibold text-base md:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-4 lg:mb-5"
            >
              MY WORK
            </h2>
            <ul class="font-unbounded font-light text-sm md:text-base lg:text-xl xl:text-2xl">
              <li v-for="(item, index) in project.myWork" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div class="lg:mt-14">
            <h2
              class="text-black font-unbounded font-semibold text-base md:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-4 lg:mb-5"
            >
              SOFTWARE USED
            </h2>
            <div class="grid grid-cols-4 gap-y-2 lg:gap-y-4">
              <img
                v-for="(image, index) in project.softwareImages"
                :key="index"
                :src="image"
                alt="Software Used"
                class="w-8 md:w-10 xl:w-12"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="mx-auto md:-mx-5">
        <component
          v-if="project.images.principal"
          :is="project.images.principal.endsWith('.mp4') ? 'video' : 'img'"
          class="w-full md:h-[55vw] object-cover mb-0.5 lg:mb-1 pointer-events-none touch-none rounded-lg md:rounded-none"
          :src="project.images.principal"
          alt="Project First Image"
          v-bind="
            project.images.principal.endsWith('.mp4')
              ? { autoplay: true, loop: true, muted: true, playsinline: true }
              : {}
          "
        />

        <div class="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
          <div class="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
            <h3
              class="text-black mx-4 font-unbounded font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-7"
            >
              WHAT I DID
            </h3>
            <p
              class="font-unbounded mx-4 font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-10 md:mb-12 lg:w-3/4"
              v-html="project.description2"
            ></p>
          </div>
        </div>

        <!-- ✅ Images spécifiques pour chaque projet -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0.5 md:gap-1">
          <img
            class="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
            :src="project.images.main"
            alt="Project Main Image"
          />
          <img
            class="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
            :src="project.images.secondary1"
            alt="Project Secondary Image"
          />
        </div>

        <div class="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
          <div class="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
            <h3
              class="text-black mx-4 font-unbounded font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-7"
            >
              WHAT I DID
            </h3>
            <p
              class="font-unbounded mx-4 font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-10 md:mb-12 lg:w-3/4"
              v-html="project.description3"
            ></p>
          </div>
        </div>

        <component
          :is="project.images.secondary2.endsWith('.mp4') ? 'video' : 'img'"
          class="w-full md:h-[55vw] object-cover mb-16 md:mb-20 lg:mb-40 pointer-events-none touch-none rounded-lg md:rounded-none"
          :src="project.images.secondary2"
          alt="Project Last Image"
          v-bind="
            project.images.secondary2.endsWith('.mp4')
              ? { autoplay: true, loop: true, muted: true, playsinline: true }
              : {}
          "
        />
      </section>

      <section v-if="limitedRelatedProjects.length" class="mt-20">
        <h4 class="text-3xl text-black font-lactos md:text-[2rem] lg:text-[3rem] mb-6">
          RELATED PROJECTS
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-0">
          <router-link
            v-for="(related, index) in limitedRelatedProjects"
            :key="index"
            :to="`/projects/${related.id}`"
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
