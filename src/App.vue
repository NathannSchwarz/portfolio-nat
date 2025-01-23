<script setup lang="ts">
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <HeaderPage />
    <RouterView/>
    <FooterPage />
  </div>
</template>
