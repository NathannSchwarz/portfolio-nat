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
      <source src="https://res.cloudinary.com/dy048q5gh/video/upload/f_auto,q_auto,w_auto/v1757448805/Fleur_lzlvm1.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  )
}

export default ReverseLoopVideo
