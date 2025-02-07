<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProjectCompIndex from '@/components/ProjectCompIndex.vue'
import Arrow from '@/components/icons/Arrow.vue'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    id: 'watergirl',
    speed: 0.8,
    xPercent: 30,
    yPercent: 10,
    imageSrc: '/img/Femme2.webp',
    imageAlt: 'watergirl',
    title: 'WATER GIRL',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'jo2024',
    speed: 0.9,
    xPercent: 70,
    yPercent: 45,
    imageSrc: 'img/JO2024-1.webp',
    imageAlt: 'JO 2024',
    title: 'JO 2024',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'webproject',
    speed: 1.0,
    xPercent: 30,
    yPercent: 70,
    imageSrc: '/img/Accueilimg3.webp',
    imageAlt: 'WEB PROJECT',
    title: 'WEB PROJECT',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'fulldesign',
    speed: 1.1,
    xPercent: 60,
    yPercent: 95,
    imageSrc: '/img/Accueilimg2.webp',
    imageAlt: 'FULL DESIGN',
    title: 'FULL DESIGN',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'fulldesign2',
    speed: 1.1,
    xPercent: 5,
    yPercent: 95,
    imageSrc: '/img/Accueilimg2.webp',
    imageAlt: 'FULL DESIGN',
    title: 'FULL DESIGN',
    subtitle: 'VIEW PROJECT',
  },
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // ⚡ Attendre que la page ait bien chargé avant de rafraîchir GSAP
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);

  // ⚡ Supprime tous les anciens ScrollTrigger pour éviter les bugs
  ScrollTrigger.getAll().forEach((t) => t.kill());
  ScrollTrigger.refresh();

  const mm = gsap.matchMedia();

  mm.add("(max-width: 375px)", () => {
    console.log("📱 Mobile mode");
    updateProjects([3, 18, 3, 18, 3], [0, 16, 33, 49, 67]);
    createTextPin(window.innerHeight * 2.7); // Moins long sur mobile
  });

  mm.add("(min-width: 376px) and (max-width: 640px)", () => {
    console.log("📱 Mobile mode");
    updateProjects([17, 33, 17, 33, 17], [0, 16, 33, 49, 67]);
    createTextPin(window.innerHeight * 2.7); // Moins long sur mobile
  });

  mm.add("(min-width: 641px) and (max-width: 1023px)", () => {
    console.log("📲 Tablet mode");
    updateProjects([10, 40, 15, 38, 10], [10, 20, 35, 48, 62]);
    createTextPin(window.innerHeight * 2.1); // Valeur spécifique pour tablette
  });

  mm.add("(min-width: 1024px) and (max-width: 1280px)", () => {
    console.log("🖥️ Tablet 2 mode");
    updateProjects([10, 40, 8, 35, 15], [0, 19, 35, 45, 62]);
    createTextPin(window.innerHeight * 2.8); // Longueur intermédiaire
  });

  mm.add("(min-width: 1281px)", () => {
    console.log("🖥️ Desktop mode");
    updateProjects([0, 25, 7, 32, 2], [0, 17, 37, 52, 70]);
    createTextPin(window.innerHeight * 2.7); // Plus long sur desktop
  });

  function updateProjects(xValues: number[], yValues: number[]) {
    projects.value = projects.value.map((p, i) => ({
      ...p,
      xPercent: xValues[i],
      yPercent: yValues[i],
    }));
    updateAnimations();
  }

  function createTextPin(endValue: number) {
    // ⚡ Supprime les anciens textPin pour éviter les doublons
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger && t.trigger.classList.contains("intro-text")) {
        t.kill();
      }
    });

    // ⚡ Crée un nouveau textPin avec la bonne valeur de end
    ScrollTrigger.create({
      trigger: ".intro-text",
      start: "top+=160vh center",
      end: `+=${endValue}px`, // ⚡ Valeur différente selon la taille d'écran
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    console.log(`📌 textPin updated with end: ${endValue}px`);
  }

  async function updateAnimations() {
    await nextTick(); // Assure que Vue applique les nouvelles valeurs avant GSAP
    console.log("📌 New project values:", projects.value);

    // Effet parallaxe sur les images
    document.querySelectorAll(".parallax-project").forEach((el, i) => {
      const project = el as HTMLElement;

      const xInitial = projects.value[i].xPercent;
      const yInitial = projects.value[i].yPercent;

      // Mise à jour GSAP
      gsap.set(project, {
        x: `${xInitial}vw`,
        y: `${yInitial}vh`,
      });

      gsap.to(project, {
        ease: "none",
        scrollTrigger: {
          trigger: project,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // 🔄 Rafraîchir GSAP après la mise à jour des animations
    ScrollTrigger.refresh();
  }

  // 🟢 Fixer le texte après le passage des images


  // 🎯 Réapparition du titre lorsqu'on remonte la page
  gsap.to(".text", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".images",
      start: "top top",
      end: "top+=5px top",
      scrub: true,
    },
  });



  // 🟢 Rendre le bouton invisible tant que les images sont visibles
  // 🟢 Cacher le bouton dès que la première image arrive à l'écran
  gsap.fromTo(
    ".project-button",
    { opacity: 1 },
    {
      opacity: 0, // Le bouton disparaît
      scrollTrigger: {
        trigger: ".parallax-project:first-child", // Première image
        start: "top 100%", // Dès qu'elle commence à apparaître
        end: "top 50%", // Le bouton reste invisible
        scrub: true,
      },
    }
  );

  // 🟢 Faire réapparaître le bouton quand la dernière image quitte l'écran
  gsap.fromTo(
    ".project-button",
    { opacity: 0 },
    {
      opacity: 1, // Le bouton réapparaît
      scrollTrigger: {
        trigger: ".parallax-project:last-child", // Dernière image
        start: "bottom 100%", // Lorsqu'elle approche de la sortie
        end: "bottom 0%", // Le bouton devient totalement visible
        scrub: true,
      },
    }
  );

  // 🔄 Assure que GSAP prend en compte la hauteur correcte après chargement
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
}
</script>

<template>
  <div
    class="overflow-hidden mt-[18rem] pb-[30rem] md:mt-[30rem] md:mb-[15rem] lg:pb-[45rem] lg:mt-[20rem] lg:mb-[10rem] xl:mt-[35rem] xl:pb-[55rem] xl:mb-[25rem] -mx-5"
  >
    <!-- Bloc du titre + description qui sera fixé -->
    <div class="intro-text">
      <h3
        class="text-[10vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue lg:text-[7vw] xl:text-[6vw]"
      >
        YOUNG
        <span class="text-colored">
          <br />
          WEB DESIGNER
        </span>
      </h3>

      <p
        class="font-unbounded font-light text-xs md:text-base md:w-9/12 md:m-auto lg:text-lg lg:w-7/12 xl:text-2xl xl:w-7/12 text-center mx-5"
      >
        I bring a unique perspective to every project, blending expertise in
        <span class="font-medium">web design</span>,
        <span class="font-medium">motion design</span> with a passion for creativity. I’m committed
        to creating meaningful, impactful designs. <br />
        Let’s collaborate <span class="font-medium">to bring your vision to life</span>.
      </p>
      <routerLink to="/project" @click="scrollToTop">
        <button
          class="text-xs md:text-sm xl:text-base project-button border-colored border text-colored p-1 px-3 md:p-2 md:px-4 lg:p-3 lg:px-6 rounded-[12rem] hover:text-coloblue hover:border-coloblue transition-colors duration-500 flex space-x-4 items-center mx-auto mt-3 lg:mt-6"
        >
          <p class="font-unbounded">MY PROJECTS</p>
          <Arrow class="w-3 md:w-4 xl:w-4 -rotate-90" />
        </button>
      </routerLink>

      <div class="buffer-space"></div>
    </div>

    <!-- ✅ Espace supplémentaire pour éviter que le texte soit coupé -->

    <!-- Conteneur des projets -->
    <div class="relative w-full max-w-[1200px] mx-auto min-h-[150vh]">
      <ProjectCompIndex
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :imageSrc="project.imageSrc"
        :imageAlt="project.imageAlt"
        :title="project.title"
        :subtitle="project.subtitle"
        class="absolute project-item parallax-project w-7/12 md:w-4/12 lg:w-3/12 xl:w-4/12 text-sm"
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
