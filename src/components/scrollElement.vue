<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProjectCompIndex from '@/components/ProjectCompIndex.vue'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    id: 1,
    speed: 0.8,
    xPercent: 0,
    yPercent: 50,
    imageSrc: '/img/Accueilimg1.webp',
    imageAlt: 'EYE ON ME',
    title: 'EYE ON ME',
    subtitle: 'VIEW PROJECT >',
  },
  {
    id: 2,
    speed: 0.9,
    xPercent: 70,
    yPercent: 60,
    imageSrc: '/img/Accueilimg2.webp',
    imageAlt: 'BRANDING PROJECT',
    title: 'BRANDING PROJECT',
    subtitle: 'VIEW PROJECT >',
  },
  {
    id: 3,
    speed: 1.0,
    xPercent: 45,
    yPercent: 80,
    imageSrc: '/img/Accueilimg3.webp',
    imageAlt: 'WEB PROJECT',
    title: 'WEB PROJECT',
    subtitle: 'VIEW PROJECT >',
  },
  {
    id: 4,
    speed: 1.1,
    xPercent: 15,
    yPercent: 90,
    imageSrc: '/img/Accueilimg2.webp',
    imageAlt: 'FULL DESIGN',
    title: 'FULL DESIGN',
    subtitle: 'VIEW PROJECT >',
  },
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Effet parallaxe sur les images
  document.querySelectorAll('.parallax-project').forEach((el, i) => {
    const project = el as HTMLElement
    const speed = parseFloat(project.dataset.speed || '1')
    const xInitial = parseFloat(project.dataset.xPercent || '0')
    const yInitial = parseFloat(project.dataset.yPercent || '0')

    // 🟢 Définition initiale de la position
    gsap.set(project, {
      x: `${xInitial}vw`,
      y: `${yInitial}vh`,
    })

    // 🟢 Animation avec GSAP + ScrollTrigger
    gsap.to(project, {
      y: `-=${speed * 10}vh`, // Déplacement vertical en VH
      x: () => `${(i % 2 === 0 ? 1 : -1) * 2}vw`, // Léger déplacement horizontal
      ease: 'none',
      scrollTrigger: {
        trigger: project,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  // 🟢 Fixer le h3 et le p jusqu'à la fin des projets
  const textPin = ScrollTrigger.create({
    trigger: '.intro-text',
    start: 'top 30%',
    end: `+=${window.innerHeight * 2}px`,
    pin: true,
    pinSpacing: false,
    scrub: true,
  })

  // 🟢 Fixer le texte après le passage des images
  ScrollTrigger.create({
    start: 'bottom top',
    onEnterBack: () => textPin.enable(),
    onLeave: () => textPin.disable(),
  })

  // 🎯 Réapparition du titre lorsqu'on remonte la page
  gsap.to('.text', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.images',
      start: 'top top',
      end: 'top+=5px top',
      scrub: true,
    },
  })
})
</script>

<template>
  <div class="overflow-hidden mt-[40rem] pb-[50rem]">
    <!-- Bloc du titre + description qui sera fixé -->
    <div class="intro-text">
      <h3 class="text-[12vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue">
        YOUNG
        <span class="text-colored">
          <br />
          WEB DESIGNER
        </span>
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

      <div class="buffer-space"></div>
    </div>

    <!-- ✅ Espace supplémentaire pour éviter que le texte soit coupé -->


    <!-- Conteneur des projets -->
    <div class="relative w-full max-w-[1200px] mx-auto min-h-[150vh]">
      <ProjectCompIndex
        v-for="project in projects"
        :key="project.id"
        :imageSrc="project.imageSrc"
        :imageAlt="project.imageAlt"
        :title="project.title"
        :subtitle="project.subtitle"
        class="absolute project-item parallax-project  w-2/4 md:w-1/4 lg:w-1/4 text-sm"
        :data-speed="project.speed"
        :style="{
          left: `${project.xPercent}vw`,
          top: `${project.yPercent}vh`,
          transform: 'translate(-50%, -50%)',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.buffer-space {
  height: 300px; /* Ajuste cette valeur pour tester */
  width: 100%;
}
</style>
