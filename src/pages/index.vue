<script setup lang="ts">
import Arrow from '@/components/icons/Arrow.vue'
import FleurBleu from '@/components/icons/FleurBleu.vue'
import FleurPleineRouge from '@/components/icons/FleurPleineRouge.vue'
import FleurPleineYellow from '@/components/icons/FleurPleineYellow.vue'
import ScrollE from '@/components/scrollElement.vue'

// Imports de GSAP et enregistrement des plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

// Fonction pour gérer le défilement dynamique avec des valeurs différentes suivant les écrans
const scrollDown = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  let scrollMultiplier

  if (screenWidth >= 1750) {
    scrollMultiplier = 1.55
  } else if (screenWidth >= 1024) {
    scrollMultiplier = 1.15
  } else if (screenWidth >= 768) {
    scrollMultiplier = 1.05
  } else {
    scrollMultiplier = 1.1
  }

  const scrollValue = screenHeight * scrollMultiplier
  window.scrollBy({ top: scrollValue, behavior: 'smooth' })
}

const horizontalPinSection = ref<HTMLElement | null>(null)
const horizontalScrollSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const pinSection = horizontalPinSection.value
  const scrollSection = horizontalScrollSection.value
  if (!pinSection || !scrollSection) return

  // matchMedia va créer l’animation UNIQUEMENT si la condition est vérifiée
  ScrollTrigger.matchMedia({
    // "(min-width: 768px)" signifie "à partir de 768px de large"
    '(min-width: 768px)': function () {
      // Largeur totale du container horizontal
      const totalWidth = scrollSection.scrollWidth
      const windowWidth = window.innerWidth

      // Animation GSAP
      gsap.to(scrollSection, {
        x: -(totalWidth - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          pin: true,
          scrub: 0,
          start: 'top top',
          end: () => '+=' + (totalWidth - windowWidth),
        },
      })
    },
  })
})

// Configuration du pin
document.addEventListener('DOMContentLoaded', function () {
  gsap.to('.pinned-heading-container', {
    scrollTrigger: {
      trigger: '.pinned-section', // la section qui déclenche le pin
      start: 'top center', // début du pin : quand le haut de la section atteint le centre de l'écran
      end: 'bottom center', // fin du pin : quand le bas de la section atteint le centre de l'écran
      pin: true, // on épingle l'élément
      scrub: false, // pas de scrub progressif (on/off)
      markers: false, // passer à true pour voir les repères de debug
    },
  })
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>

<template>
  <section class="relative bg-colowhite overflow-hidden px-5 relative">
    <section>
      <h1
        class="text-[15vw] mt-28 text-black font-lactos z-10 relative text-stroke md:mt-52 md:text-[12vw] md:ml-12 lg:text-[11vw] lg:ml-[12vw] lg:mt-[7vw] xl:text-[12rem] xl:mt-[4%] xl:ml-[14vw]"
      >
        NATHAN
      </h1>

      <img
        src="/img/Accueilimg3.webp"
        alt="imgaccueil3"
        class="m-auto -mt-9 object-cover h-[55vh] md:w-[80vw] md:-mt-14 md:h-full lg:object-fill lg:-mt-[12vh] lg:w-[50vw] xl:w-[41%] xl:-mt-[14vh]"
      />

      <h2
        class="text-[15vw] text-black font-lactos -mt-5 z-10 relative border-colowhite text-stroke text-end md:-mt-8 md:mr-12 md:text-[12vw] lg:-mt-12 lg:mr-[12vw] xl:text-[12rem] lg:-mt-20"
      >
        SCHWARZ
      </h2>

      <!-- Bouton Arrow -->
      <button
        @click="scrollDown"
        class="arrow-animation absolute z-50 group top-[40rem] left-6 w-8 md:w-11 md:top-[60rem] lg:top-[40rem] lg:left-20 xl:top-[50rem] xl:w-14"
      >
        <Arrow class="text-black group-hover:text-colored transition-colors duration-500" />
      </button>

      <FleurPleineYellow
        class="absolute top-12 right-8 w-24 z-0 md:right-20 md:top-32 md:w-[14vw] lg:right-16 lg:top-10 xl:top-20 animate-spin-reverse-slow"
      />
      <FleurPleineRouge
        class="absolute top-[23rem] -left-6 w-24 z-0 md:left-8 md:top-[40rem] md:w-[16vw] lg:left-32 lg:top-[20rem] xl:top-[25rem] animate-spin-slow"
      />
      <FleurBleu
        class="absolute top-[43rem] -right-4 w-28 z-0 md:-right-10 md:top-[60rem] md:w-[14vw] lg:-right-20 lg:top-[35rem] xl:top-[50rem] animate-spin-reverse"
      />

      <FleurPleineYellow
        class="absolute top-[210vh] -right-10 w-24 z-0 md:-right-10 md:top-[220vh] md:w-[20vw] lg:-right-16 lg:top-[220vh] lg:w-[18vw] xl:-right-16 xl:top-[280vh] xl:w-[15vw] animate-spin-reverse-slow"
      />
      <FleurPleineRouge
        class="absolute top-[205vh] -left-6 w-24 z-0 md:-left-5 md:top-[210vh] md:w-[18vw] lg:top-[210vh] lg:w-[16vw] xl:-left-16 xl:top-[260vh] xl:w-[13vw] animate-spin-slow"
      />
      <FleurPleineRouge
        class="absolute top-[265rem] -left-6 w-24 z-0 md:left-0 md:top-[500vh] md:w-[20vw] lg:-left-5 lg:top-[510vh] lg:w-[18vw] xl:top-[565vh] xl:w-[15vw] animate-spin-slow"
      />
      <FleurBleu
        class="absolute top-[275rem] -right-4 w-28 z-0 md:-right-10 md:top-[520vh] md:w-[19vw] lg:-right-10 lg:top-[530vh] lg:w-[16vw] xl:top-[605vh] xl:w-[13vw] animate-spin-reverse"
      />
    </section>

    <!-- Images responsives -->
    <img
      src="/img/GreatDesignMobile.webp"
      alt="GreatDesignMobile"
      class="block md:hidden mt-[22rem]"
    />
    <img
      src="/img/GreatDesignTablet.webp"
      alt="GreatDesignTablet"
      class="hidden md:block lg:hidden mt-[25rem]"
    />
    <img
      src="/img/GreatDesignDesktop.webp"
      alt="GreatDesignDesktop"
      class="hidden lg:block mt-[25rem] xl:mt-[30rem]"
    />

    <!-- Section avec les projets -->
    <ScrollE />
  </section>

  <section ref="horizontalPinSection" class="relative overflow-hidden">
    <!--
      Sur mobile :
        - on n’applique PAS w-[200vw] ni flex
        - on garde w-screen, h-auto (affichage normal en pile)
      Sur desktop (lg:...) :
        - on applique flex et w-[200vw]
        - on fixe h-screen (hauteur pleine page)
    -->

    <div ref="horizontalScrollSection" class="w-screen h-auto lg:flex lg:w-[200vw] lg:h-screen">
      <!-- SECTION 1 : WHO AM I -->
      <section
        class="w-full h-auto lg:w-screen lg:h-screen flex-none bg-coloyellow flex flex-col justify-center items-center border-t border-black"
      >
        <div class="relative mt-32 mx-5 mb-10 md:mb-16 md:mt-44 md:mb-16 lg:mt-2">
          <img src="/img/Accueilimg1.webp" alt="Accueilimg1" class="mx-auto md:w-7/12 lg:w-5/12" />
          <h3
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10.5vw] lg:text-[7.5vw] xl:text-[8vw] font-lactos leading-[1.1] text-center text-coloblue w-full"
          >
            BUT WHO AM I ?
          </h3>
        </div>

        <div class="text-center flex flex-col gap-4 md:gap-6 items-center">
          <h4
            class="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-right lg:pr-40 xl:pr-72"
          >
            UNIQUE WEB DESIGNER
          </h4>
          <h4
            class="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-left lg:pl-40 xl:pl-72"
          >
            PASSIONATED BY DESIGN
          </h4>
          <p
            class="mx-9 font-unbounded font-light text-sm mb-44 md:text-xl lg:text-lg xl:text-2xl md:w-4/5 lg:w-9/12 xl:w-7/12 md:m-auto lg:text-2xl text-center"
          >
            In my designs and worldview, <span class="font-medium">freedom</span> is one of my most
            cherished values. After my studies, I aspire to embrace independence
            <span class="font-medium">as my ideal professional path</span>. While I’m aware of its
            uncertainties, it offers the priceless opportunity to fully control
          </p>
        </div>
      </section>

      <!-- SECTION 2 : CONTACT ME -->
      <section
        class="w-full h-auto lg:w-screen lg:h-screen flex-none bg-coloyellow flex items-center justify-center border-b border-black"
      >
        <div
          class="relative mx-5 flex flex-col items-center justify-center md:mt-56 lg:mt-48 xl:flex-row lg:mr-20 xl:mt-12"
        >
          <img
            src="/img/Accueilimg2.webp"
            alt="Accueilimg2"
            class="mx-auto md:w-7/12 lg:w-5/12 xl:w-4/12 mb-10 md:mb-12 lg:mb-14"
          />
          <div class="text-center xl:mt-52">
            <h4
              class="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow mb-2 md:mb-6 lg:mb-4"
            >
              IF YOU INTERESTED <br />
              TO WORK WITH ME
            </h4>
            <router-link
              to="/contact"
              class="font-lactos text-[7.8vw] md:text-[4.5vw] xl:text-[3.5vw] mb-44 md:mb-64 text-coloblue relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-[8px] before:w-full before:bg-coloblue before:transition-transform before:duration-500 before:origin-left hover:before:scale-x-0 inline-block"
              @click="scrollToTop"
            >
              CONTACT ME
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.arrow-animation {
  animation: bounce 2s infinite ease-in-out;
  cursor: pointer;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(8px);
  }
}

h4 {
  -webkit-text-stroke: 1.3px black; /* Par défaut */
}

@media (min-width: 1024px) {
  h4 {
    -webkit-text-stroke: 2px black; /* Desktop */
  }
}

.text-stroke {
  -webkit-text-stroke: 1px #f7f4f2;
}
</style>
