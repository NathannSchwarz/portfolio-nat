<template>
  <footer class="bg-colored overflow-hidden">
    <div class="mx-5 pt-12 pb-1 text-colowhite">
      <!-- Citation et cercle pour tablet/desktop -->
      <div class="grid grid-cols-1 md:grid-cols-2 items-center mb-12 md:mb-16">
        <p class="font-lactos text-xl text-coloyellow md:text-2xl xl:text-4xl">
          "DESIGNING WITH FREEDOM MEANS CREATING SOLUTIONS THAT REFLECT AUTHENTICITY, EMBRACE
          INDIVIDUALITY, AND EMPOWER CHOICES FOR A LIMITLESS FUTURE."
        </p>
        <!-- Cercle pour tablet/desktop -->
        <div class="hidden md:flex md:justify-end">
          <router-link to="/contact">
            <p
              class="bg-coloblue text-xl text-center rounded-full flex items-center justify-center w-[6rem] h-[6rem] p-5 font-lactos text-coloyellow animate-spin-slow md:text-2xl md:w-[7rem] md:h-[7rem] md:p-8 lg:text-3xl lg:w-[9rem] lg:h-[9rem] lg:p-12 hover:text-colowhite transition-colors duration-500"
              @click="scrollToTop"
            >
              LET'S WORK
            </p>
          </router-link>
        </div>
      </div>

      <!-- Liens de navigation, réseaux et informations de contact -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-y-10 mb-8 md:mb-0">
        <!-- Liens de navigation -->
        <div class="space-y-2">
          <h3 class="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">PAGES</h3>
          <ul class="font-unbounded text-sm text-black font-medium md:text-base xl:text-xl">
            <li>
              <router-link
                to="/"
                class="hover:text-colowhite transition-colors duration-500"
                @click="scrollToTop"
                >INDEX</router-link
              >
            </li>
            <li>
              <router-link
                to="/project"
                class="hover:text-colowhite transition-colors duration-500"
                @click="scrollToTop"
                >PROJECT</router-link
              >
            </li>
            <li>
              <router-link
                to="/contact"
                class="hover:text-colowhite transition-colors duration-500"
                @click="scrollToTop"
                >CONTACT</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Réseaux -->
        <div class="ml-16 space-y-2 md:ml-0">
          <h3 class="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">SOCIAL</h3>
          <ul class="font-unbounded text-sm text-black font-medium md:text-base xl:text-xl">
            <li>
              <a
                href="https://www.instagram.com/nvt_vnn/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-colowhite transition-colors duration-500"
                >INSTAGRAM</a
              >
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nathan-schwarz04/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-colowhite transition-colors duration-500"
                >LINKEDIN</a
              >
            </li>
            <li>
              <a
                href="https://x.com/NathScz"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-colowhite transition-colors duration-500"
                >X (TWITTER)</a
              >
            </li>
          </ul>
        </div>

        <!-- Informations de contact -->
        <div class="space-y-2">
          <h3 class="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">INFORMATION</h3>
          <ul class="font-unbounded text-sm text-black font-medium md:text-base xl:text-xl">
            <li class="break-words">MONTBELIARD, FRANCE</li>
            <li class="break-words">NATHAN.SCHWARZ04@GMAIL.COM</li>
            <li class="break-words">
              <a
                href="/CV_NATHAN_SCHWARZ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-colowhite transition-colors duration-500 underline"
              >
                CV A TELECHARGER
              </a>
            </li>
          </ul>
        </div>

        <!-- Cercle pour mobile (grid-cols-2 row-2) -->
        <div class="ml-16 md:hidden md:ml-0">
          <router-link to="/contact">
            <p
              class="bg-coloblue text-lg text-center rounded-full flex items-center justify-center w-[6rem] h-[6rem] p-5 font-lactos text-coloyellow animate-spin-slow md:text-2xl md:w-[8rem] md:h-[8rem] md:p-8 lg:text-4xl lg:w-[11rem] lg:h-[11rem] lg:p-12"
              @click="scrollToTop"
            >
              LET'S WORK
            </p>
          </router-link>
        </div>
      </div>

      <!-- Grand texte et copyright -->
      <p class="font-lactos text-[21vw] md:text-[22vw] lg:text-[22.5vw] text-coloyellow">NVT_VNN</p>
      <p
        class="font-lactos text-[2.5vw] md:text-[2vw] text-coloyellow -mt-6 md:-mt-16 lg:-mt-24 mb-8"
      >
        © 2024 NATHAN SCHWARZ
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>
