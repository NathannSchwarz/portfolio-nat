import React from 'react'
import Arrow from './Arrow'
import { Link } from 'react-router-dom'

function ProjectCompIndex({ id, imageSrc, imageAlt, title, subtitle, variant = 'home' }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <Link to={`/projects/${id}`} className="flex flex-col group" onClick={scrollToTop}>
      <div className="relative w-full overflow-hidden transition-all duration-500 ease-in-out rounded-lg group-hover:rounded-2xl">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full object-cover transition-transform duration-500 ease-in-out ${
            variant === 'project'
              ? 'h-[55vw] md:h-[30vw] lg:h-[20vw] xl:h-[20vw]'
              : 'h-[40vw] md:h-[20vw] lg:h-[14vw] xl:h-[15vw]'
          }`}
        />
        <div className="hidden xl:block">
          <div className="absolute inset-0 bg-black transition-all duration-300 bg-opacity-0 group-hover:bg-opacity-100 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-7 h-full">
            <h2 className="text-white text-2xl font-lactos xl:text-6xl self-start">{title}</h2>
            <div className="flex border border-white p-2 px-7 rounded-[10rem] w-60 text-white space-x-5 hover:bg-colored transition-colors duration-500">
              <p className="text-sm font-unbounded font-light md:text-base self-start">
                {subtitle}
              </p>
              <Arrow className="w-4 -rotate-90" />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-lactos xl:text-4xl pt-4 xl:hidden">{title}</h2>
      <div className="flex items-center text-coloblue hover:text-colored transition-colors duration-500 space-x-3 pb-4 xl:hidden">
        <p className="text-sm font-unbounded font-light xl:text-lg">{subtitle}</p>
        <Arrow className="w-3 -rotate-90" />
      </div>
    </Link>
  )
}

export default ProjectCompIndex
