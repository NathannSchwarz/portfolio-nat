<template>
  <router-link :to="`/projects/${id}`" class="block group" @click="scrollToTop">
    <div
      class="relative w-full overflow-hidden transition-all duration-700 ease-in-out group-hover:rounded-xl"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 xl:group-hover:scale-100"
      />
      <div class="hidden xl:block">
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-100 transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-8 h-full"
        >
          <h2 class="text-white text-2xl font-lactos xl:text-6xl self-start">{{ title }}</h2>
          <div
            class="flex border border-white p-2 px-6 pb-1 rounded-[10rem] w-8/12 text-white space-x-5 hover:bg-colored transition-colors duration-500"
          >
            <p class="text-sm font-unbounded font-light self-start">
              {{ subtitle }}
            </p>
            <Arrow class="w-4 -rotate-90" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-xl font-lactos md:text-2xl mt-2 xl:hidden">{{ title }}</h2>
    <p
      class="text-xs font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-sm cursor-pointer xl:hidden"
    >
      {{ subtitle }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Arrow from '@/components/icons/Arrow.vue'
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
