import React, { useRef, useEffect } from 'react'
import Arrow from '../components/Arrow'
import ReverseLoopVideo from '../components/ReverseLoopVideo'
import FleurPleineYellow from '../components/FleurPleineYellow'
import FleurPleineRouge from '../components/FleurPleineRouge'
import FleurPleineBleu from '../components/FleurPleineBleu'
import FleurBleu from '../components/FleurBleu'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollElement from '../components/ScrollElement'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  // Préparation des refs pour GSAP (scroll horizontal, pin, etc.)
  const horizontalPinSection = useRef(null)
  const horizontalScrollSection = useRef(null)

  // Logique scrollDown (sera branchée plus tard avec GSAP)
  const scrollDown = () => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    let scrollMultiplier
    if (screenWidth >= 1750) {
      scrollMultiplier = 1.285
    } else if (screenWidth >= 1024) {
      scrollMultiplier = 1.28
    } else if (screenWidth >= 768) {
      scrollMultiplier = 1.05
    } else {
      scrollMultiplier = 1.1
    }
    const scrollValue = screenHeight * scrollMultiplier
    window.scrollBy({ top: scrollValue, behavior: 'smooth' })
  }

  useEffect(() => {
    // Title & favicon
    document.title = 'NATHAN SCHWARZ'
    const link = document.querySelector("link[rel='icon']") || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = '/img/FleurPleineRouge.webp'
    if (!link.parentNode) document.head.appendChild(link)

    const pinSection = horizontalPinSection.current
    const scrollSection = horizontalScrollSection.current
    if (!pinSection || !scrollSection) return

    // Animation scroll horizontal GSAP (desktop uniquement)
    const matchMedia = ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        const totalWidth = scrollSection.scrollWidth
        const windowWidth = window.innerWidth
        gsap.to(scrollSection, {
          x: -(totalWidth - windowWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 0,
            start: 'top top',
            end: () => '+=' + (totalWidth - windowWidth),
          },
        })
      },
    })

    // Animation pin sur le heading (exemple, à adapter selon le markup)
    const headingTrigger = gsap.to('.pinned-heading-container', {
      scrollTrigger: {
        trigger: '.pinned-section',
        start: 'top center',
        end: 'bottom center',
        pin: true,
        scrub: false,
        markers: false,
      },
    })

    // Nettoyage des triggers à la destruction du composant
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (matchMedia && matchMedia.revert) matchMedia.revert()
      if (headingTrigger && headingTrigger.kill) headingTrigger.kill()
    }
  }, [])

  return (
    <>
      {/* SECTION 1 : Vidéo de fond et titre */}
      <section className="relative h-screen">
        <ReverseLoopVideo />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-[#F5F5F5] to-colowhite"></div>
        <div className="absolute bottom-10 left-5 lg:bottom-20 lg:left-20 text-black font-lactos z-10">
          <h1 className="text-[10vw] md:text-[7vw] xl:text-[6rem] leading-none text-stroke-black text-transparent">
            HEY, I'M <br />
            NATHAN SCHWARZ <br />A WEB DESIGNER
          </h1>
          <button
            className="bg-red flex items-center space-x-6 bg-colowhite p-1 pb-0.5 lg:p-3 px-4 lg:pb-2 lg:px-6 rounded-[10rem] border border-black hover:text-colowhite hover:bg-colored transition-colors duration-500"
            onClick={scrollDown}
          >
            <p className="text-base md:text-lg lg:text-2xl">CHECK OUT MY WORK</p>
            <Arrow className="w-3 lg:w-4" />
          </button>
        </div>
      </section>

      {/* SECTION 2 : Image et décorations */}
      <section className="relative bg-colowhite overflow-hidden px-5 relative">
        <section>
          <img
            src="/img/perso2.webp"
            alt="imgaccueil3"
            className="m-auto mt-72 rounded-xl object-cover h-[62vh] md:w-[40vw] md:mt-[30rem] md:h-full lg:object-fill lg:mt-[40vh] lg:mb-[50vh] lg:w-[30vw] xl:w-[30%] xl:mt-[40vh] xl:mb-[20vh]"
          />
          {/* Exemple d'intégration d'une fleur décorative */}
          <FleurPleineYellow className="absolute top-28 right-8 w-32 z-0 md:right-20 md:top-32 md:w-[24vw] lg:right-16 lg:w-[20vw] xl:w-[16vw] lg:top-10 xl:top-20 animate-spin-reverse-slow" />
          <FleurPleineRouge className="absolute top-[23rem] -left-6 w-28 z-0 md:left-8 md:top-[40rem] md:w-[20vw] lg:left-32 lg:w-[18vw] xl:w-[14vw] lg:top-[20rem] xl:top-[25rem] animate-spin-slow" />
          <FleurPleineBleu className="absolute top-[43rem] -right-4 w-32 z-0 md:-right-10 md:top-[60rem] md:w-[24vw] lg:-right-20 lg:w-[20vw] xl:w-[16vw] lg:top-[35rem] xl:top-[50rem] animate-spin-reverse" />

          {/* Ajout des décorations manquantes */}
          <FleurPleineYellow className="absolute top-[130vh] -right-10 w-24 z-0 md:-right-10 md:top-[120vh] md:w-[20vw] lg:-right-16 lg:top-[120vh] lg:w-[18vw] xl:-right-16 xl:top-[180vh] xl:w-[15vw] animate-spin-reverse-slow" />
          <FleurPleineRouge className="absolute top-[115vh] -left-6 w-24 z-0 md:-left-5 md:top-[110vh] md:w-[18vw] lg:top-[110vh] lg:w-[16vw] xl:-left-16 xl:top-[160vh] xl:w-[13vw] animate-spin-slow" />
          <FleurPleineRouge className="absolute top-[190rem] -left-6 w-24 z-0 md:left-0 md:top-[360vh] md:w-[20vw] lg:-left-5 lg:top-[410vh] lg:w-[18vw] xl:top-[465vh] xl:w-[15vw] animate-spin-slow" />
          <FleurBleu className="absolute top-[190rem] -right-4 w-28 z-0 md:-right-10 md:top-[375vh] md:w-[19vw] lg:-right-10 lg:top-[430vh] lg:w-[16vw] xl:top-[485vh] xl:w-[13vw] animate-spin-reverse" />
          {/* Ajouter les autres décorations SVG ici */}
        </section>
        {/* <ScrollE /> */}
        <ScrollElement />
      </section>

      {/* SECTION 3 : Scroll horizontal (complet) */}
      <section ref={horizontalPinSection} className="relative overflow-hidden">
        <div
          ref={horizontalScrollSection}
          className="w-screen h-auto lg:flex lg:w-[200vw] lg:h-screen"
        >
          {/* SECTION 1 : WHO AM I */}
          <section className="w-full h-auto lg:w-screen lg:h-screen flex-none bg-coloyellow flex flex-col justify-center items-center border-t border-black">
            <div className="relative mt-32 mx-5 mb-10 md:mb-16 md:mt-44 md:mb-16 lg:mt-2">
              <img
                src="/img/Accueilimg1.webp"
                alt="Accueilimg1"
                className="mx-auto md:w-7/12 lg:w-5/12 rounded-xl"
              />
              <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10.5vw] lg:text-[7.5vw] xl:text-[8vw] font-lactos leading-[1.1] text-center text-coloblue w-full">
                BUT WHO AM I ?
              </h3>
            </div>
            <div className="text-center flex flex-col gap-4 md:gap-6 items-center">
              <h4 className="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-right lg:pr-80 xl:pr-[30rem] text-stroke-black">
                CREATIVE THINKER
              </h4>
              <h4 className="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow text-center md:text-left lg:pl-40 xl:pl-72 text-stroke-black">
                INDEPENDENT DESIGNER
              </h4>
              <p className="mx-8 md:mx-9 font-unbounded font-light text-xs mb-44 md:text-base lg:text-lg xl:text-2xl md:w-9/12 lg:w-7/12 xl:w-7/12 md:m-auto lg:text-2xl text-center xl:leading-[3.6vh]">
                In my designs and worldview,<span className="font-normal"> freedom</span> is one of
                my most cherished values. After my studies, I aspire to embrace independence{' '}
                <span className="font-normal">as my ideal professional path</span>. While I'm aware
                of its uncertainties, it offers the priceless opportunity to fully control my
                creative vision.
              </p>
            </div>
          </section>
          {/* SECTION 2 : CONTACT ME */}
          <section className="w-full h-auto lg:w-screen lg:h-screen flex-none bg-coloyellow flex items-center justify-center border-b border-black ">
            <div className="relative mx-5 flex flex-col items-center justify-center md:mt-56 lg:mt-48 xl:flex-row xl:mr-36 xl:mt-12">
              <img
                src="/img/Accueilimg2.webp"
                alt="Accueilimg2"
                className="object-cover mx-auto md:w-7/12 lg:w-[40vw] lg:h-[33vh] xl:h-full xl:w-4/12 mb-10 md:mb-12 lg:mb-14 rounded-xl"
              />
              <div className="text-center xl:mt-52">
                <h4 className="text-[7.8vw] md:text-[7vw] lg:text-[6vw] xl:text-[5vw] font-lactos leading-[1.1] text-coloyellow mb-2 md:mb-6 lg:mb-4 text-stroke-black">
                  IF YOU INTERESTED <br />
                  TO WORK WITH ME
                </h4>
                <Link
                  to="/contact"
                  className="font-lactos text-[7vw] md:text-[4.5vw] xl:text-[3.5vw] mb-44 md:mb-64 text-coloblue relative before:content-[''] before:absolute before:bottom-0 before:right-0 before:h-[8px] before:w-full before:bg-coloblue before:transition-transform before:duration-500 before:origin-left hover:before:scale-x-0 inline-block"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
                >
                  CONTACT ME
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default Home
