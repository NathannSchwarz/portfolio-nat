import React, { useState, useEffect } from 'react'
import FleurPleineBleu from '../components/FleurPleineBleu'
import FleurPleineRouge from '../components/FleurPleineRouge'
import FleurPleineYellow from '../components/FleurPleineYellow'
import ProjectCompIndex from '../components/ProjectCompIndex'
import projects from '../data/projectsData'

const filters = ['ALL', 'BRANDING', 'GRAPHIC DESIGN', 'WEB SITE']

function Project() {
  const [activeFilters, setActiveFilters] = useState(['ALL'])

  useEffect(() => {
    document.title = 'NATHAN SCHWARZ - PROJECT'
    const link = document.querySelector("link[rel='icon']") || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = '/img/FleurPleineRouge.webp'
    if (!link.parentNode) document.head.appendChild(link)
  }, [])

  const filteredProjects = activeFilters.includes('ALL')
    ? projects
    : projects.filter((project) => activeFilters.includes(project.category))

  const toggleFilter = (filter) => {
    if (filter === 'ALL') {
      setActiveFilters(['ALL'])
    } else {
      let newFilters = activeFilters.filter((f) => f !== 'ALL')
      if (newFilters.includes(filter)) {
        newFilters = newFilters.filter((f) => f !== filter)
      } else {
        newFilters.push(filter)
      }
      if (newFilters.length === 0) newFilters = ['ALL']
      setActiveFilters(newFilters)
    }
  }

  const countProjects = (filter) => {
    if (filter === 'ALL') return projects.length
    return projects.filter((project) => project.category === filter).length
  }

  return (
    <section className="relative bg-colowhite pb-32 overflow-hidden px-5">
      <h1 className="text-5xl text-black font-lactos md:text-[7rem] lg:text-[8rem] xl:text-[10rem] pt-28 md:pt-36 lg:pt-40 z-10 relative pb-8 lg:pb-20">
        MY WORK
      </h1>
      <p className="font-unbounded font-light text-xs md:text-base md:w-2/3 lg:text-lg lg:w-8/12 xl:text-2xl xl:w-7/12 -mt-4 md:-mt-6 lg:-mt-16 leading-[2vh] xl:leading-[3.6vh]">
        Every project is an opportunity to refine ideas, explore new perspectives, and craft unique
        design solutions that blend <span className="font-normal">creativity</span> and{' '}
        <span className="font-normal">functionality</span>. From concept to execution, I strive to
        create visuals that not only look great but also{' '}
        <span className="font-normal">serve a purpose</span>.
      </p>
      {/* Décorations */}
      <FleurPleineRouge className="absolute top-[20.5rem] left-2 w-[18vw] z-0 md:top-[27rem] md:left-10 md:w-[14vw] lg:left-20 lg:top-[32rem] xl:w-[12vw] xl:top-[35rem] animate-spin-slow-20" />
      <FleurPleineYellow className="absolute top-20 -right-6 w-[24vw] z-0 md:right-20 md:top-[5rem] md:w-[16vw] lg:right-32 lg:top-24 xl:w-[15vw] xl:top-[10rem] animate-spin-slow" />
      <FleurPleineBleu className="absolute top-[19rem] right-10 w-[20vw] z-0 md:w-[24vw] md:top-[20rem] md:right-20 lg:right-32 lg:top-[25rem] xl:w-[21vw] xl:top-[25rem] xl:right-40 animate-spin-reverse-slow" />
      {/* Filtres */}
      <ul className="flex flex-wrap font-unbounded font-light text-base mt-44 gap-3 gap-x-6 md:mt-52 md:text-xl md:gap-x-8 lg:text-2xl lg:gap-x-10 lg:mt-96 xl:text-4xl xl:gap-x-14">
        {filters.map((filter) => (
          <li
            key={filter}
            className={`relative cursor-pointer transition-colors duration-500 hover:text-colored ${activeFilters.includes(filter) ? 'text-colored' : 'text-black'}`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
            <sup className="absolute -top-3 -right-4 text-sm">{countProjects(filter)}</sup>
          </li>
        ))}
      </ul>
      {/* Grille des projets fidèle à project.vue */}
      <section className="mt-10 md:mt-14 lg:mt-16 xl:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-10 xl:gap-0 xl:-mx-5">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className={project.gridClass || ''}>
            <ProjectCompIndex {...project} variant="project" />
          </div>
        ))}
      </section>
    </section>
  )
}

export default Project
