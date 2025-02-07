<template>
  <header
    :class="[
      'fixed flex items-center justify-between mt-3 md:mt-0 p-4 md:p-8 md:py-5 md:pt-4 top-0 md:top-4 z-50 w-full md:border-0 z-50',
      isHeaderVisible ? 'header-visible' : 'header-hidden',
    ]"
  >
    <!-- Logo -->
    <router-link
      to="/"
      class="block border pt-1.5 pb-1  px-4 md:pt-1 md:pb-0.5 lg:p-2 lg:pb-1 lg:px-5 xl:p-3 xl:pb-2 xl:px-6 border-black bg-colowhite rounded-[10rem] md:hover:bg-black md:hover:text-colowhite transition-colors duration-500"
      @click="scrollToTop"
    >
      <p class=" font-lactos text-lg md:text-[1.8vw] xl:text-[1.3vw]">NATHAN SCHWARZ</p>
    </router-link>

    <!-- Navigation Desktop -->
    <nav class="hidden md:flex space-x-2 md:space-x-6 xl:space-x-8 md:text-[1.8vw] xl:text-[1.3vw]">
      <router-link
        to="/"
        class="font-lactos hover:bg-coloyellow hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5  border-black bg-colowhite rounded-[10rem]"
        @click="scrollToTop"
      >
        HOME
      </router-link>
      <router-link
        to="/project"
        class="font-lactos hover:bg-colored hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5 border-black bg-colowhite rounded-[10rem]"
        @click="scrollToTop"
      >
        PROJECT
      </router-link>
      <router-link
        to="/contact"
        class="font-lactos hover:bg-coloblue hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5 border-black bg-colowhite rounded-[10rem]"
        @click="scrollToTop"
      >
        CONTACT
      </router-link>
    </nav>

    <!-- Menu Mobile -->
    <button
      @click="toggleMenu"
      class="md:hidden absolute right-5 w-[4rem] h-10 focus:outline-none z-50 rounded-[10rem] px-5 transition-all duration-300"
      :class="isMenuOpen ? 'border-transparent ' : 'border border-black bg-colowhite'"
    >
      <svg
        viewBox="0 0 74 50"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full text-black cursor-pointer"
      >
        <path
          class="menu-line top"
          d="M5.04004 5.00659H68.917"
          :stroke="isMenuOpen ? 'black' : 'currentColor'"
          stroke-width="9"
          stroke-linecap="round"
          :class="{ 'transform top-rotate': isMenuOpen }"
        />
        <path
          class="menu-line middle"
          d="M21.3408 25.0066L68.9168 25.0066"
          :stroke="isMenuOpen ? 'black' : 'currentColor'"
          stroke-width="9"
          stroke-linecap="round"
          :class="{ 'transform middle-rotate': isMenuOpen }"
        />
        <path
          class="menu-line bottom"
          d="M38.4629 45.0066L68.917 45.0066"
          stroke="currentColor"
          stroke-width="9"
          stroke-linecap="round"
          :class="{ 'transform bottom-fade': isMenuOpen }"
        />
      </svg>
    </button>

    <!-- Menu Mobile Content -->
    <div
      class="md:hidden absolute top-3 right-5 w-32 border border-1 border-black bg-colowhite pt-10 pb-6 px-5 rounded-3xl shadow-lg transition-all duration-500 ease-in-out transform"
      :class="isMenuOpen ? 'opacity-100' : 'opacity-0 invisible'"
    >
      <ul class="space-y-4">
        <li @click="scrollToTop">
          <router-link
            to="/"
            class="block text-xl font-lactos hover:text-coloyellow transition-colors duration-500"
          >
            HOME
          </router-link>
        </li>
        <li @click="scrollToTop">
          <router-link
            to="/project"
            class="block text-xl font-lactos text-right hover:text-colored transition-colors duration-500"
          >
            PROJECT
          </router-link>
        </li>
        <li @click="scrollToTop">
          <router-link
            to="/contact"
            class="block text-xl font-lactos hover:text-coloblue transition-colors duration-500"
          >
            CONTACT
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isHeaderVisible = ref(true)
let lastScrollY = window.scrollY

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  if (currentScrollY < lastScrollY || currentScrollY <= 0) {
    isHeaderVisible.value = true
  } else {
    isHeaderVisible.value = false
  }
  lastScrollY = currentScrollY
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
  closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.menu-line {
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
}
.top-rotate {
  transform: translate(-10px, 20px) rotate(30deg);
}
.middle-rotate {
  transform: translate(-10px, 0px) rotate(-30deg);
}
.bottom-fade {
  transform: scaleX(0);
}

.header-visible {
  transform: translateY(0);
  opacity: 1;
  transition:
    transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.5s ease;
}

.header-hidden {
  transform: translateY(-150%);
  opacity: 0;
  transition:
    transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.5s ease;
}
</style>
