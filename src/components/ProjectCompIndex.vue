<template>
  <div class="flex flex-col">
    <img :src="imageSrc" :alt="imageAlt" class="w-full object-cover mb-2" />
    <h2 class="text-xl font-lactos md:text-2xl">{{ title }}</h2>
    <p class="text-xs font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-sm">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: "Project Image",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>
