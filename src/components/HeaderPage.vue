<template>
  <header
    :class="[
      'sticky flex items-center justify-between p-8 top-0 z-50 w-full bg-colowhite',
      isHeaderVisible ? 'header-visible' : 'header-hidden',
    ]"
  >
    <!-- Logo -->
    <img class="w-32" src="/img/Logo.png" alt="logo" />

    <!-- Menu / Cross Button -->
    <button
      @click="toggleMenu"
      class="absolute right-7 w-10 h-12 md:right-8 md:w-12 lg:right-10 lg:w-14 focus:outline-none z-50"
    >
      <svg
        viewBox="0 0 74 50"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full text-black cursor-pointer"
      >
        <!-- Barre du haut -->
        <path
          class="menu-line top"
          d="M5.04004 5.00659H68.917"
          :stroke="isMenuOpen ? 'white' : 'currentColor'"
          stroke-width="9"
          stroke-linecap="round"
          :class="{ 'transform top-rotate': isMenuOpen }"
        />
        <!-- Barre du milieu -->
        <path
          class="menu-line middle"
          d="M21.3408 25.0066L68.9168 25.0066"
          :stroke="isMenuOpen ? 'white' : 'currentColor'"
          stroke-width="9"
          stroke-linecap="round"
          :class="{ 'transform middle-rotate': isMenuOpen }"
        />
        <!-- Barre du bas -->
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

    <!-- Menu Content -->
    <div
      class="absolute top-3 right-4 w-44 bg-black text-white pt-16 pb-10 px-6 rounded-[30px] shadow-lg transition-all duration-500 ease-in-out transform md:right-6 md:pt-16 md:pb-10 md:px-9 md:w-60 lg:pt-18 lg:pb-14 lg:px-12 lg:w-80"
      :class="isMenuOpen ? 'opacity-100' : 'opacity-0 invisible'"
    >
      <ul class="space-y-8 lg:space-y-12">
        <li
          class="text-left font-lactos text-3xl text-colowhite md:text-4xl lg:text-5xl hover:text-coloyellow transition-colors duration-500 cursor-pointer"
        >
          <router-link to="/" class="block" @click="scrollToTop">INDEX</router-link>
        </li>
        <li
          class="text-right font-lactos text-3xl text-colowhite md:text-4xl lg:text-5xl hover:text-colored transition-colors duration-500 cursor-pointer"
        >
          <router-link to="/project" class="block" @click="scrollToTop">PROJECT</router-link>
        </li>
        <li
          class="text-left font-lactos text-3xl text-colowhite md:text-4xl lg:text-5xl hover:text-coloblue transition-colors duration-500 cursor-pointer"
        >
          <router-link to="/contact" class="block" @click="scrollToTop">CONTACT</router-link>
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
  const currentScrollY = window.scrollY;

  // Si on remonte ou si on est proche du haut de la page, le header apparaît
  if (currentScrollY < lastScrollY || currentScrollY <= 0) {
    isHeaderVisible.value = true;
  } else {
    isHeaderVisible.value = false;
  }

  lastScrollY = currentScrollY;
};

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
/* Styles identiques */
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
