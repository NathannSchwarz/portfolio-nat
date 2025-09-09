import React from 'react'

function ReverseLoopVideo(props) {
  return (
    <video
      muted
      autoPlay
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover no-controls"
      style={{ pointerEvents: 'none', userSelect: 'none' }}
      {...props}
    >
      <source src="/video/Fleur.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  )
}

export default ReverseLoopVideo
