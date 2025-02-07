<template>
  <router-link :to="`/projects/${id}`" class="flex flex-col group" @click="scrollToTop">
    <div class="relative w-full overflow-hidden transition-all duration-500 ease-in-out">
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="w-full object-cover transition-transform duration-500 ease-in-out max-h-[20rem] md:max-h-[23rem]  xl:w-[40rem] xl:h-[25rem]"
      />
      <div class="hidden xl:block">
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-100 transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-8 h-full"
        >
          <h2 class="text-white text-2xl font-lactos xl:text-7xl self-start">{{ title }}</h2>
          <div
            class="flex border border-white p-2 px-7 rounded-[10rem] w-60 text-white space-x-5 hover:bg-colored transition-colors duration-500"
          >
            <p class="text-sm font-unbounded font-light md:text-base self-start">
              {{ subtitle }}
            </p>
            <Arrow class="w-4 -rotate-90" />
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-lactos xl:text-3xl xl:hidden pt-4">{{ title }}</h2>
    <div
      class="flex items-center xl:hidden text-coloblue hover:text-colored transition-colors duration-500 space-x-3 pb-4"
    >
      <p class="text-sm font-unbounded font-light md:text-base xl:hidden">
        {{ subtitle }}
      </p>
      <Arrow class="w-3 -rotate-90" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Arrow from '@/components/icons/Arrow.vue'

defineProps<{
  id: string
  imageSrc: string
  imageAlt?: string
  title: string
  subtitle: string
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>
