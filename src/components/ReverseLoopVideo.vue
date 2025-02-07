<script setup lang="ts">
import { ref, onMounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const video = videoRef.value;
  if (!video) return;

  // Forcer la lecture automatique même si l'utilisateur essaye de l'arrêter
  const ensurePlayback = () => {
    if (video.paused) {
      video.play().catch(() => console.log("Lecture bloquée par le navigateur"));
    }
  };

  // Vérifier toutes les 500ms si la vidéo joue
  setInterval(ensurePlayback, 500);

  video.play().catch(() => console.log("Lecture bloquée au démarrage"));
});
</script>

<template>
  <video
    ref="videoRef"
    muted
    autoplay
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover no-controls"
  >
    <source src="/video/Fleur_1.mp4" type="video/mp4" />
    Votre navigateur ne supporte pas la lecture de vidéos.
  </video>
</template>

<style scoped>
/* Empêcher toute interaction utilisateur */
video {
  pointer-events: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
