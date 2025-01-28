<script setup lang="ts">
import Arrow from '@/components/icons/Arrow.vue'
import FleurBleu from '@/components/icons/FleurBleu.vue'
import FleurPleineRouge from '@/components/icons/FleurPleineRouge.vue'
import FleurPleineYellow from '@/components/icons/FleurPleineYellow.vue'
import ProjectCompIndex from '@/components/ProjectCompIndex.vue'

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
    scrollMultiplier = 1.1
  } else if (screenWidth >= 1024) {
    scrollMultiplier = 1.18
  } else if (screenWidth >= 768) {
    scrollMultiplier = 0.8
  } else {
    scrollMultiplier = 0.8
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>

<template>
  <section class="relative bg-colowhite overflow-hidden px-5 relative">
    <section>
      <h1
        class="text-6xl text-black font-lactos z-10 relative mt-2 md:mt-3 md:text-[7rem] lg:text-[13rem] md:ml-20 lg:ml-36"
      >
        NATHAN
      </h1>

      <img
        src="/img/Accueilimg3.webp"
        alt="imgaccueil3"
        class="m-auto -mt-5 object-cover h-[25rem] md:object-fill md:w-1/2 md:-mt-14 lg:-mt-32 md:h-full"
      />

      <h2
        class="text-6xl text-black font-lactos -mt-2 z-10 relative border-colowhite border-1 text-end md:-mt-6 md:text-[7rem] md:mr-20 lg:text-[13rem] lg:-mt-12 lg:mr-36"
      >
        SCHWARZ
      </h2>

      <!-- Bouton Arrow -->
      <button
        @click="scrollDown"
        class="arrow-animation absolute top-[32rem] left-6 w-8 md:w-11 md:top-[31rem] lg:w-16 lg:top-[42vw] lg:left-20 z-50 group"
      >
        <Arrow class="text-black group-hover:text-colored transition-colors duration-500" />
      </button>

      <FleurBleu
        class="absolute top-[35rem] -right-4 w-28 z-0 md:-right-10 md:top-[30rem] md:w-[14vw] lg:-right-20 lg:top-[35rem] animate-spin-reverse"
      />
      <FleurPleineRouge
        class="absolute top-[23rem] -left-6 w-24 z-0 md:left-28 md:top-[12rem] md:w-[16vw] lg:left-48 lg:top-[25rem] animate-spin-slow"
      />
      <FleurPleineYellow
        class="absolute top-2 right-8 w-24 z-0 md:right-20 md:w-[16vw] lg:right-32 animate-spin-reverse-slow"
      />
    </section>

    <!-- Images responsives -->
    <img
      src="/public/img/GreatDesignMobile.webp"
      alt="GreatDesignMobile"
      class="block md:hidden mt-52"
    />
    <img
      src="/public/img/GreatDesignTablet.webp"
      alt="GreatDesignTablet"
      class="hidden md:block lg:hidden mt-52"
    />
    <img
      src="/public/img/GreatDesignDesktop.webp"
      alt="GreatDesignDesktop"
      class="hidden lg:block mt-64"
    />

    <!-- Section avec les projets -->
    <section class="my-[28rem] md:my-[32rem] lg:my-[40rem]">
      <h3 class="text-[12vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue">
        YOUNG
        <span class="text-colored">
          <br />
          WEB DESIGNER</span
        >
      </h3>
      <p
        class="font-unbounded font-light text-sm md:text-base md:w-2/3 md:m-auto lg:text-2xl text-center"
      >
        I bring a unique perspective to every project, blending expertise in
        <span class="font-medium">web design</span>,
        <span class="font-medium">motion design</span> with a passion for creativity. I’m committed
        to creating meaningful, impactful designs. <br />
        Let’s collaborate <span class="font-medium">to bring your vision to life</span>.
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

  <section ref="horizontalPinSection" class="relative overflow-hidden">
    <!--
      Sur mobile :
        - on n’applique PAS w-[200vw] ni flex
        - on garde w-screen, h-auto (affichage normal en pile)
      Sur desktop (lg:...) :
        - on applique flex et w-[200vw]
        - on fixe h-screen (hauteur pleine page)
    -->
    <div
      ref="horizontalScrollSection"
      class="w-screen h-auto /* Fallback pour mobile, vertical */ md:flex md:w-[200vw] md:h-screen /* Layout horizontal à partir de md */"
    >
      <!-- SECTION 1 : WHO AM I -->
      <section
        class="w-full h-auto /* Mobile : occupe toute la largeur, hauteur auto */ md:w-screen md:h-screen /* Desktop : occupe un écran en largeur/hauteur */ flex-none bg-coloyellow flex flex-col justify-center items-center"
      >
        <div class="relative mx-5 mb-10 md:mb-16">
          <img src="/img/Accueilimg1.webp" alt="Accueilimg1" class="mx-auto md:w-5/12" />
          <h3
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10.5vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue w-full"
          >
            BUT WHO AM I ?
          </h3>
        </div>

        <div class="text-center flex flex-col gap-4 md:gap-6 items-center">
          <h4 class="text-[7.8vw] md:text-[5.5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-right md:pr-40 lg:pr-72">
            UNIQUE WEB DESIGNER
          </h4>
          <h4 class="text-[7.8vw] md:text-[5.5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-left md:pl-40 lg:pl-72">
            PASSIONATED BY DESIGN
          </h4>
          <p
            class="mx-9 font-unbounded font-light text-sm md:text-base md:w-3/5 md:m-auto lg:text-2xl text-center"
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
        class="w-full h-auto md:w-screen md:h-screen flex-none bg-coloyellow flex items-center justify-center"
      >
        <div class="relative mx-5 flex flex-col items-center justify-center md:flex-row md:mr-20">
          <img
            src="/img/Accueilimg2.webp"
            alt="Accueilimg2"
            class="mx-auto md:w-1/3 mb-10 md:mb-0"
          />
          <div class="text-center">
            <h4
              class="text-[7.8vw] md:text-[5.5vw] font-lactos leading-[1.1] text-coloyellow mb-2 lg:mb-4"
            >
              IF YOU INTERESTED <br />
              TO WORK WITH ME
            </h4>
            <router-link
              to="/contact"
              class="font-lactos text-[7.8vw] md:text-[3.5vw] text-coloblue relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-[8px] before:w-full before:bg-coloblue before:transition-transform before:duration-500 before:origin-left hover:before:scale-x-0 inline-block"
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
</style>
