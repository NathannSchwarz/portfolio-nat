<script setup lang="ts">
import { ref, onMounted } from 'vue';

const videoRef = ref<HTMLVideoElement | null>(null);
const isReversing = ref(false);

onMounted(() => {
  const video = videoRef.value;
  if (!video) return;

  // Forcer l'autoplay sur mobile et desktop
  const ensurePlayback = () => {
    if (video.paused) {
      video.play().catch(() => console.log("Lecture bloquée par le navigateur"));
    }
  };
  setInterval(ensurePlayback, 500);
  video.play().catch(() => console.log("Lecture bloquée au démarrage"));

  // Détecter la fin de la vidéo et inverser la lecture
  video.addEventListener("ended", () => {
    isReversing.value = true;
    video.playbackRate = -1; // Inverser la vitesse de lecture
    video.currentTime = video.duration - 0.1; // Déclencher l'inversion
    video.play();
  });

  // Détecter le début de la vidéo pour repartir en avant
  video.addEventListener("timeupdate", () => {
    if (isReversing.value && video.currentTime <= 0.1) {
      isReversing.value = false;
      video.playbackRate = 1; // Revenir à la vitesse normale
      video.currentTime = 0.1;
      video.play();
    }
  });
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
