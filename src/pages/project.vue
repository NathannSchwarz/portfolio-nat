<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectComp from "@/components/ProjectComp.vue";
import FleurPleineBleu from "@/components/icons/FleurPleineBleu.vue";
import FleurPleineRouge from "@/components/icons/FleurPleineRouge.vue";
import FleurPleineYellow from "@/components/icons/FleurPleineYellow.vue";
// Filtres disponibles
const filters = ["ALL", "WEB SITE", "BRANDING", "GRAPHIC DESIGN"];

// Filtres actifs (par défaut "ALL")
const activeFilters = ref(["ALL"]);

// Liste des projets
const projects = ref([
  {
    title: "EYE ON ME",
    subtitle: "VIEW PROJECT >",
    imageSrc: "/img/Accueilimg1.webp",
    imageAlt: "Example Project",
    category: "GRAPHIC DESIGN",
    gridClass: "lg:col-span-3 ",
  },
  {
    title: "BRANDING PROJECT",
    subtitle: "VIEW PROJECT >",
    imageSrc: "/img/Accueilimg2.webp",
    imageAlt: "Example Project",
    category: "BRANDING",
    gridClass: "lg:col-span-2",
  },
  {
    title: "WEB PROJECT",
    subtitle: "VIEW PROJECT >",
    imageSrc: "/img/Accueilimg3.webp",
    imageAlt: "Example Project",
    category: "WEB SITE",
    gridClass: "lg:col-span-3",
  },
  {
    title: "FULL DESIGN",
    subtitle: "VIEW PROJECT >",
    imageSrc: "/img/Accueilimg2.webp",
    imageAlt: "Example Project",
    category: "GRAPHIC DESIGN",
    gridClass: "lg:col-span-4",
  },
  {
    title: "FULL DESIGN",
    subtitle: "VIEW PROJECT >",
    imageSrc: "/img/Accueilimg2.webp",
    imageAlt: "Example Project",
    category: "GRAPHIC DESIGN",
    gridClass: "lg:col-span-4",
  },
]);

// Projets filtrés en fonction des filtres actifs
const filteredProjects = computed(() => {
  if (activeFilters.value.includes("ALL") || activeFilters.value.length === 0) {
    return projects.value;
  }
  return projects.value.filter((project) =>
    activeFilters.value.includes(project.category)
  );
});

// Fonction pour gérer le changement des filtres
const toggleFilter = (filter: string) => {
  if (filter === "ALL") {
    // Activer uniquement "ALL"
    activeFilters.value = ["ALL"];
  } else {
    // Supprimer "ALL" si un autre filtre est sélectionné
    activeFilters.value = activeFilters.value.filter((f) => f !== "ALL");

    if (activeFilters.value.includes(filter)) {
      // Retirer le filtre s'il est déjà actif
      activeFilters.value = activeFilters.value.filter((f) => f !== filter);
    } else {
      // Ajouter le filtre s'il n'est pas actif
      activeFilters.value.push(filter);
    }

    // Si aucun filtre n'est actif, réactiver "ALL"
    if (activeFilters.value.length === 0) {
      activeFilters.value = ["ALL"];
    }
  }
};

// Compte le nombre de projets pour chaque filtre
const countProjects = (filter: string) => {
  if (filter === "ALL") {
    return projects.value.length;
  }
  return projects.value.filter((project) => project.category === filter).length;
};
</script>



<template>
  <section class="relative bg-colowhite pb-32 overflow-hidden px-5 overflow-hidden">
    <h1 class="text-5xl text-black font-lactos md:text-[7rem] lg:text-[10rem] pt-8 md:pt-12 lg:pt-16 z-10 relative pb-8 lg:pb-20 ">
      MY WORK
    </h1>
    <p class="font-unbounded font-light text-base md:text-lg md:w-2/3 lg:text-2xl lg:w-7/12 -mt-4 md:-mt-6 lg:-mt-16">
      I bring a unique perspective to every project, blending expertise in
      <span class="font-medium">web design</span>, <span class="font-medium">motion design</span>
      with a passion for creativity. I’m committed to creating meaningful, impactful
      designs.<br />Let’s collaborate <span class="font-medium">to bring your vision to life</span>.
    </p>

    <!-- Decorative Images -->
     <FleurPleineRouge
     alt="FleurPleineRouge"
      class="absolute top-[19rem] left-2 w-[18vw] z-0 md:top-[21rem] md:left-10 md:w-[14vw] lg:left-20 lg:top-[26rem] animate-spin-slow-20"
      />

     <FleurPleineYellow
      alt="FleurPleineYellow"
      class="absolute top-0 -right-6 w-[24vw] z-0 md:right-20 md:w-[16vw] lg:right-32 lg:top-2 animate-spin-slow"
      />

     <FleurPleineBleu
      alt="FleurPleineBleu"
      class="absolute top-[17rem] right-10 w-[20vw] z-0 md:w-[24vw] md:top-[15rem] md:right-20 lg:right-32 animate-spin-reverse-slow"
      />


    <!-- Filter Buttons -->
    <ul class="flex flex-wrap font-unbounded font-light text-xl mt-32 gap-4 md:mt-44 md:text-2xl md:gap-6 lg:text-3xl lg:gap-10 lg:mt-96">
  <li
    v-for="filter in filters"
    :key="filter"
    @click="toggleFilter(filter)"
    class="relative cursor-pointer transition-colors duration-500"
    :class="{
      'text-colored': activeFilters.includes(filter), // Même couleur que le titre
      'text-black': !activeFilters.includes(filter),
    }"
  >
    {{ filter }}
    <sup
      class="absolute -top-3 -right-4 text-sm"
      :class="activeFilters.includes(filter) ? 'text-colored' : 'text-black'"
    >
      {{ countProjects(filter) }}
    </sup>
  </li>
</ul>

    <!-- Project Grid -->
    <section class="mt-10 md:mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
      <div
        v-for="(project, index) in filteredProjects"
        :key="index"
        :class="project.gridClass"
      >
        <ProjectComp
          :imageSrc="project.imageSrc"
          :imageAlt="project.imageAlt"
          :title="project.title"
          :subtitle="project.subtitle"
        />
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>
