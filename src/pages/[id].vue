<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 🟢 Liste des projets
const projects = ref([
  {
    id: 1,
    imageSrc: '/img/Accueilimg1.webp',
    title: 'EYE ON ME',
    subtitle: 'VIEW PROJECT >',
    description: 'This project explores the interaction between modern design and visual storytelling.',
  },
  {
    id: 2,
    imageSrc: '/img/Accueilimg2.webp',
    title: 'BRANDING PROJECT',
    subtitle: 'VIEW PROJECT >',
    description: 'A deep dive into branding strategies and visual identity design.',
  },
  {
    id: 3,
    imageSrc: '/img/Accueilimg3.webp',
    title: 'WEB PROJECT',
    subtitle: 'VIEW PROJECT >',
    description: 'A web development project showcasing cutting-edge frontend technologies.',
  },
  {
    id: 4,
    imageSrc: '/img/Accueilimg2.webp',
    title: 'FULL DESIGN',
    subtitle: 'VIEW PROJECT >',
    description: 'An all-in-one design experience blending UX/UI and motion graphics.',
  },
])

// 🟢 Récupérer l'ID du projet dans l'URL
const route = useRoute()
const router = useRouter()
const projectId = computed(() => parseInt(route.params.id as string, 10))

// 🟢 Trouver le projet correspondant
const project = computed(() => projects.value.find((p) => p.id === projectId.value))

// 🛑 Si l'ID est invalide, rediriger vers la page d'accueil
if (!project.value) {
  router.push('/')
}
</script>

<template>
  <div v-if="project" class="container mx-auto p-6">
    <!-- Image du projet -->
    <div class="relative w-full overflow-hidden rounded-lg">
      <img
        :src="project.imageSrc"
        :alt="project.title"
        class="w-full object-cover transition-transform duration-500 ease-in-out"
      />
    </div>

    <!-- Détails du projet -->
    <h1 class="text-4xl font-lactos mt-6 text-coloblue">{{ project.title }}</h1>
    <p class="text-lg font-unbounded font-light text-gray-600 mt-4">{{ project.description }}</p>

    <!-- Bouton retour -->
    <router-link to="/" class="mt-6 inline-block text-coloblue hover:text-colored transition-colors duration-500">
      ← Back to Home
    </router-link>
  </div>

  <!-- Message d'erreur si le projet n'existe pas (au cas où le route.push ne fonctionne pas) -->
  <div v-else class="text-center py-20">
    <h2 class="text-2xl font-bold text-red-500">Project not found</h2>
    <router-link to="/" class="text-blue-500 hover:underline">Return to home</router-link>
  </div>
</template>
