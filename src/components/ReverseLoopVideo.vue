
<template>
  <video
    ref="videoRef"
    muted
    autoplay
    loop
    playsinline
    class="absolute top-0 left-0 w-full h-full object-cover no-controls"
  >
    <source src="/video/Fleur.mp4" type="video/mp4" />
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
