<script setup lang="ts">
import Arrow from "@/components/icons/Arrow.vue";
import FleurBleu from "@/components/icons/FleurBleu.vue";
import FleurPleineRouge from "@/components/icons/FleurPleineRouge.vue";
import FleurPleineYellow from "@/components/icons/FleurPleineYellow.vue";
import ProjectCompIndex from "@/components/ProjectCompIndex.vue";

// Fonction pour gérer le défilement dynamique avec des valeurs différentes suivant les écrans
const scrollDown = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let scrollMultiplier;

  if (screenWidth >= 1750) {
    scrollMultiplier = 1.1;
  } else if (screenWidth >= 1024) {
    scrollMultiplier = 1.18;
  } else if (screenWidth >= 768) {
    scrollMultiplier = 0.8;
  } else {
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
    </section>

    <!-- Images responsives -->
    <img src="/public/img/GreatDesignMobile.webp" alt="GreatDesignMobile" class="block md:hidden mt-52">
    <img src="/public/img/GreatDesignTablet.webp" alt="GreatDesignTablet" class="hidden md:block lg:hidden mt-52">
    <img src="/public/img/GreatDesignDesktop.webp" alt="GreatDesignDesktop" class="hidden lg:block mt-64">

    <!-- Section avec les projets -->
    <section class="my-[28rem] md:my-[32rem] lg:my-[40rem]">
      <h3 class="text-[12vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue">YOUNG <span class="text-colored"> <br> WEB  DESIGNER</span> </h3>
      <p class="font-unbounded font-light text-sm md:text-base md:w-2/3 md:m-auto lg:text-2xl text-center">
        I bring a unique perspective to every project, blending expertise in
        <span class="font-medium">web design</span>, <span class="font-medium">motion design</span>
        with a passion for creativity. I’m committed to creating meaningful, impactful
        designs. <br> Let’s collaborate <span class="font-medium">to bring your vision to life</span>.
      </p>

      <!-- Grille des projets -->
      <section class="mt-10 md:mt-14 lg:mt-20">
        <div>
  <ProjectCompIndex
    imageSrc="/img/Accueilimg1.webp"
    imageAlt="Example Project"
    title="EYE ON ME"
    subtitle="VIEW PROJECT >"
    class="w-2/4 md:w-1/4 lg:w-1/4 text-sm cursor-pointer"
  />
</div>
<div>
  <ProjectCompIndex
    imageSrc="/img/Accueilimg2.webp"
    imageAlt="Example Project"
    title="BRANDING PROJECT"
    subtitle="VIEW PROJECT >"
    class="w-2/4 md:w-1/4 lg:w-1/4 cursor-pointer"
  />
</div>
<div>
  <ProjectCompIndex
    imageSrc="/img/Accueilimg3.webp"
    imageAlt="Example Project"
    title="WEB PROJECT"
    subtitle="VIEW PROJECT >"
    class="w-2/4 md:w-1/4 lg:w-1/4 cursor-pointer"
  />
</div>
<div>
  <ProjectCompIndex
    imageSrc="/img/Accueilimg2.webp"
    imageAlt="Example Project"
    title="FULL DESIGN"
    subtitle="VIEW PROJECT >"
    class="w-2/4 md:w-1/4 lg:w-1/4 cursor-pointer"
  />
</div>
      </section>
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
