<template>
  <router-link :to="`/${id}`" class="flex flex-col group" @click="scrollToTop">
    <div
      class="relative w-full overflow-hidden transition-all duration-500 ease-in-out "
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full object-cover mb-2 transition-transform duration-500 ease-in-out "
      />
    </div>

    <h2 class="text-2xl font-lactos md:text-3xl">{{ title }}</h2>
    <p
      class="text-sm font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-base"
    >
      {{ subtitle }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  id: number
  imageSrc: string
  imageAlt?: string
  title: string
  subtitle: string
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>
