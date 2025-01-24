<script setup lang="ts">
import Arrow from "@/components/icons/Arrow.vue";
import FleurBleu from "@/components/icons/FleurBleu.vue";
import FleurPleineRouge from "@/components/icons/FleurPleineRouge.vue";
import FleurPleineYellow from "@/components/icons/FleurPleineYellow.vue";

// Fonction pour gérer le défilement dynamique avec des valeurs différentes suivant les écrans
const scrollDown = () => {
  const screenWidth = window.innerWidth; // Largeur de l'écran
  const screenHeight = window.innerHeight; // Hauteur de l'écran
  let scrollMultiplier;

  if (screenWidth >= 1750) {
    // Desktop large
    scrollMultiplier = 1.1;
  } else if (screenWidth >= 1024) {
    // Desktop standard
    scrollMultiplier = 1.18;
  } else if (screenWidth >= 768) {
    // Tablet
    scrollMultiplier = 0.8;
  } else {
    // Mobile
    scrollMultiplier = 0.8;
  }

  const scrollValue = screenHeight * scrollMultiplier;
  window.scrollBy({ top: scrollValue, behavior: "smooth" });
};
</script>

<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5 relative">
    <section>
      <h1 class="text-6xl text-black font-lactos z-10 relative mt-2 md:mt-3 md:text-[7rem] lg:text-[13rem] md:ml-20 lg:ml-36">
        NATHAN
      </h1>

      <img src="/img/Accueilimg3.webp" alt="imgaccueil3" class="m-auto -mt-5 object-cover h-[25rem] md:object-fill md:w-1/2 md:-mt-14 lg:-mt-32 md:h-full">

      <h2 class="text-6xl text-black font-lactos -mt-2 z-10 relative border-colowhite border-1 text-end md:-mt-6 md:text-[7rem] md:mr-20 lg:text-[13rem] lg:-mt-12 lg:mr-36">
        SCHWARZ
      </h2>

      <!-- Bouton Arrow -->
      <button
        @click="scrollDown"
        class="arrow-animation absolute top-[32rem] left-6 w-8 md:w-11 md:top-[31rem] lg:w-16 lg:top-[42vw] lg:left-20 z-50 group"
      >
        <Arrow class="text-black group-hover:text-colored transition-colors duration-500" />
      </button>

      <FleurBleu class="absolute top-[35rem] -right-4 w-28 z-0 md:-right-10 md:top-[30rem] md:w-[14vw] lg:-right-20 lg:top-[35rem] animate-spin-reverse"/>
      <FleurPleineRouge class="absolute top-[23rem] -left-6 w-24 z-0 md:left-28 md:top-[12rem] md:w-[16vw] lg:left-48 lg:top-[25rem] animate-spin-slow"/>
      <FleurPleineYellow class="absolute top-2 right-8 w-24 z-0 md:right-20 md:w-[16vw] lg:right-32 animate-spin-reverse-slow"/>

      <!-- Images responsives -->
      <img src="/public/img/GreatDesignMobile.webp" alt="GreatDesignMobile" class="block md:hidden mt-52">
      <img src="/public/img/GreatDesignTablet.webp" alt="GreatDesignTablet" class="hidden md:block lg:hidden mt-52">
      <img src="/public/img/GreatDesignDesktop.webp" alt="GreatDesignDesktop" class="hidden lg:block mt-64">
    </section>
  </section>
</template>

<style scoped>
.arrow-animation {
  animation: bounce 2s infinite ease-in-out;
  cursor: pointer;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(8px);
  }
}
</style>
