<template>
  <div class="flex flex-col ">
    <img :src="imageSrc" :alt="imageAlt" class="w-full object-cover mb-2" />
    <h2 class="text-2xl font-lactos md:text-3xl">{{ title }}</h2>
    <p class="text-sm font-unbounded font-light text-coloblue hover:text-colored transition-colors duration-500 md:text-base">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "ProjectComp",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "Project Image",
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>


