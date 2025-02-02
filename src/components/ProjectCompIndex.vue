<template>
  <router-link :to="`/${id}`" class="block group" @click="scrollToTop">
    <div
      class="relative w-full overflow-hidden transition-all duration-500 ease-in-out group-hover:rounded-2xl"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
    </div>

    <h2 class="text-xl font-lactos md:text-2xl mt-2">{{ title }}</h2>

    <p
      class="text-xs font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-sm cursor-pointer"
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
