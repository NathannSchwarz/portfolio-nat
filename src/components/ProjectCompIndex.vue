<template>
  <div class="flex flex-col group">
    <!-- Conteneur qui applique le border-radius en hover -->
    <div
      class="relative w-full overflow-hidden transition-all duration-500 ease-in-out group-hover:rounded-xl"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
    </div>

    <!-- Titre -->
    <h2 class="text-xl font-lactos md:text-2xl mt-2">{{ title }}</h2>

    <!-- Sous-titre avec effet de couleur -->
    <p
      class="text-xs font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-sm cursor-pointer"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Project Image',
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>
