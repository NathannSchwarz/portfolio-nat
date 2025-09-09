import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCompIndex from './ProjectCompIndex'
import Arrow from './Arrow'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

// Configuration centralisée du layout responsive
const LAYOUT_CONFIG = {
  mobile: {
    maxWidth: 375,
    columns: 1,
    spacing: { x: 55, y: 150 },
    startOffset: { x: 10, y: 20 },
    alternanceOffset: 1,
    rowVariation: [0, 5, -3, 8, -2], // Variation Y pour chaque colonne de la ligne
  },
  mobileLarge: {
    maxWidth: 640,
    columns: 2,
    spacing: { x: 46, y: 260 },
    startOffset: { x: 5, y: -50 },
    alternanceOffset: 0.3,
    rowVariation: [-40, 100], // Col 1: +0, Col 2: +15
  },
  tablet: {
    maxWidth: 1023,
    columns: 2,
    spacing: { x: 140, y: 200 },
    startOffset: { x: 10, y: -35 },
    alternanceOffset: 0.3,
    rowVariation: [0, 100], // Décalage entre les 2 colonnes
  },
  desktop: {
    maxWidth: 1280,
    columns: 2,
    spacing: { x: 250, y: 180 },
    startOffset: { x: 0, y: -20 },
    alternanceOffset: 0.2,
    rowVariation: [0, 60], // 3 hauteurs différentes
  },
  desktopLarge: {
    maxWidth: Infinity,
    columns: 2,
    spacing: { x: 180, y: 230 },
    startOffset: { x: -60, y: -30 },
    alternanceOffset: 0.4,
    rowVariation: [0, 70], // Forte variation entre les 2 colonnes
  },
}

const initialProjects = [
  {
    id: 'trainingmanual',
    speed: 1.0,

    imageSrc: '/img/trainingmanual/manual1.webp',
    imageAlt: 'TRAINING MANUAL',
    title: 'TRAINING MANUAL',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'i-activ',
    speed: 1.1,

    imageSrc: '/img/iactiv/iactiv_mockups_5.webp',
    imageAlt: 'I-ACTIV',
    title: 'I-ACTIV',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'Chateaudemontbéliard',
    speed: 0.8,

    imageSrc: '/img/sae403/sae_403_mockups_6.webp',
    imageAlt: 'sae403',
    title: 'CHATEAU DE WURTEMBERG',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'jo2024',
    speed: 0.9,

    imageSrc: '/img/jo2024/JO2024-3.jpg',
    imageAlt: 'JO 2024',
    title: 'JO 2024',
    subtitle: 'VIEW PROJECT',
  },
  {
    id: 'feater',
    speed: 1.1,

    imageSrc: '/img/Feater/Feater2.webp',
    imageAlt: 'FEATER',
    title: 'FEATER',
    subtitle: 'VIEW PROJECT',
  },
]

// ✅ AVANTAGES DU NOUVEAU SYSTÈME :
// 1. Ajout/suppression de projets automatique
// 2. Configuration centralisée facile à modifier
// 3. Logique cohérente sur tous les écrans
// 4. Maintenance simplifiée
// 5. Extensible pour de nouveaux breakpoints

function ScrollElement() {
  const [projects, setProjects] = useState(initialProjects)
  const containerRef = useRef(null)
  const projectRefs = useRef([])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.getAll().forEach((t) => t.kill())
    ScrollTrigger.refresh()
    const mm = gsap.matchMedia()

    // Système de placement automatique des projets
    function calculateProjectPositions(screenWidth) {
      const numProjects = initialProjects.length

      // Sélection de la configuration selon la taille d'écran
      let config
      if (screenWidth <= LAYOUT_CONFIG.mobile.maxWidth) {
        config = LAYOUT_CONFIG.mobile
      } else if (screenWidth <= LAYOUT_CONFIG.mobileLarge.maxWidth) {
        config = LAYOUT_CONFIG.mobileLarge
      } else if (screenWidth <= LAYOUT_CONFIG.tablet.maxWidth) {
        config = LAYOUT_CONFIG.tablet
      } else if (screenWidth <= LAYOUT_CONFIG.desktop.maxWidth) {
        config = LAYOUT_CONFIG.desktop
      } else {
        config = LAYOUT_CONFIG.desktopLarge
      }

      // Calcul automatique des positions
      const positions = { x: [], y: [] }
      for (let i = 0; i < numProjects; i++) {
        const row = Math.floor(i / config.columns)
        const col = i % config.columns

        // Position X avec alternance pour créer du dynamisme
        let xPos = config.startOffset.x + col * config.spacing.x
        if (row % 2 === 1) xPos += config.spacing.x * config.alternanceOffset

        // Position Y progressive avec variation par colonne
        let yPos = config.startOffset.y + row * config.spacing.y

        // Ajouter la variation spécifique à chaque colonne de la ligne
        if (config.rowVariation && config.rowVariation[col] !== undefined) {
          yPos += config.rowVariation[col]
        }

        positions.x.push(xPos)
        positions.y.push(yPos)
      }

      return positions
    }

    function updateProjects(positions) {
      setProjects((prev) =>
        prev.map((p, i) => ({
          ...p,
          xPercent: positions.x[i],
          yPercent: positions.y[i],
        })),
      )
    }

    function createTextPin(endValue) {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && t.trigger.classList && t.trigger.classList.contains('intro-text')) {
          t.kill()
        }
      })
      ScrollTrigger.create({
        trigger: '.intro-text',
        start: 'top+=170vh center',
        end: '+=' + endValue + 'px',
        pin: true,
        pinSpacing: false,
        scrub: 1,
      })
    }

    // Application du système responsive unifié
    mm.add('(max-width: 375px)', () => {
      const positions = calculateProjectPositions(375)
      updateProjects(positions)
      createTextPin(window.innerHeight * 2.7)
    })

    mm.add('(max-width: 640px)', () => {
      const positions = calculateProjectPositions(640)
      updateProjects(positions)
      createTextPin(window.innerHeight * 2.7)
    })

    mm.add('(min-width: 641px) and (max-width: 1023px)', () => {
      const positions = calculateProjectPositions(1023)
      updateProjects(positions)
      createTextPin(window.innerHeight * 2.5)
    })

    mm.add('(min-width: 1024px) and (max-width: 1280px)', () => {
      const positions = calculateProjectPositions(1280)
      updateProjects(positions)
      createTextPin(window.innerHeight * 2.7)
    })

    mm.add('(min-width: 1281px)', () => {
      const positions = calculateProjectPositions(1400)
      updateProjects(positions)
      createTextPin(window.innerHeight * 2.7)
    })

    // Réapparition du titre
    gsap.to('.text', {
      opacity: 1,
      scrollTrigger: {
        trigger: '.images',
        start: 'top top',
        end: 'top+=5px top',
        scrub: true,
      },
    })

    // S'assurer que le bouton est visible au début
    gsap.set('.project-button', { opacity: 1 })

    // Disparition du bouton
    gsap.to('.project-button', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.intro-text',
        start: 'top center',
        end: 'center+=200vh center',
        scrub: true,
        refreshPriority: -1,
        invalidateOnRefresh: true,
      },
    })

    // Réapparition du bouton - sera gérée dans useEffect des projets

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // UseEffect séparé pour mettre à jour les animations quand les projets changent
  useEffect(() => {
    const updateAnimations = () => {
      setTimeout(() => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger && projectRefs.current.includes(t.trigger)) {
            t.kill()
          }
        })

        // Nettoyage de l'ancienne animation du bouton
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars && t.vars.id === 'button-reappear') {
            t.kill()
          }
        })

        projectRefs.current.forEach((el, i) => {
          if (!el) return
          const project = projects[i]
          if (!project) return

          gsap.set(el, {
            x: `${project.xPercent}%`,
            y: `${project.yPercent}%`,
          })
          gsap.to(el, {
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })

        // Réapparition du bouton à la fin du dernier projet (FEATER)
        const lastProjectRef = projectRefs.current[4] // 5ème projet (FEATER)
        if (lastProjectRef) {
          gsap.to('.project-button', {
            opacity: 1,
            scrollTrigger: {
              id: 'button-reappear',
              trigger: lastProjectRef,
              start: 'bottom center', // Quand la dernière image finit de passer
              end: 'bottom top',
              scrub: true,
              refreshPriority: -1,
              invalidateOnRefresh: true,
            },
          })
        }

        ScrollTrigger.refresh()
      }, 50)
    }

    updateAnimations()
  }, [projects])

  return (
    <div
      ref={containerRef}
      className="overflow-hidden mt-[18rem] pb-[30rem] md:mt-[30rem] md:mb-[15rem] lg:pb-[45rem] lg:mt-[20rem] lg:mb-[10rem] xl:mt-[35rem] xl:pb-[60vh] -mx-5"
    >
      {/* Bloc du titre + description qui sera fixé */}
      <div className="intro-text">
        <h3 className="text-[10vw] md:text-[7.5vw] font-lactos leading-[1.1] text-center text-coloblue lg:text-[7vw] xl:text-[6vw]">
          YOUNG
          <span className="text-colored">
            <br />
            WEB DESIGNER
          </span>
        </h3>
        <p className="font-unbounded font-light text-xs md:text-base md:w-9/12 md:m-auto lg:text-lg lg:w-7/12 xl:text-2xl xl:w-7/12 text-center mx-5 xl:leading-[3.6vh]">
          I bring a unique perspective to every project, blending expertise in
          <span className="font-normal"> web design</span>,
          <span className="font-normal"> motion design</span> with a passion for creativity. I'm
          committed to creating meaningful, impactful designs. <br />
          Let's collaborate <span className="font-normal">to bring your vision to life</span>.
        </p>
        <Link to="/project" onClick={scrollToTop}>
          <button className="text-xs md:text-sm xl:text-base project-button border-colored border text-colored p-1 px-3 md:p-2 md:px-4 lg:p-3 lg:px-6 rounded-[12rem] hover:text-coloblue hover:border-coloblue transition-colors duration-500 flex space-x-4 items-center mx-auto mt-3 lg:mt-6">
            <p className="font-unbounded">MY PROJECTS</p>
            <Arrow className="w-3 md:w-4 xl:w-4 -rotate-90" />
          </button>
        </Link>
        <div className="buffer-space" />
      </div>
      {/* Espace supplémentaire pour éviter que le texte soit coupé */}
      <div className="relative w-full max-w-[1000px] mx-auto h-[200vh]">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (projectRefs.current[i] = el)}
            className="absolute project-item parallax-project w-7/12 md:w-4/12 lg:w-3/12 xl:w-5/12 text-sm "
            data-speed={project.speed}
          >
            <ProjectCompIndex
              id={project.id}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              title={project.title}
              subtitle={project.subtitle}
              variant="home"
            />
          </div>
        ))}
      </div>
      <style>{`.buffer-space { height: 300px; width: 100%; }`}</style>
    </div>
  )
}

export default ScrollElement
