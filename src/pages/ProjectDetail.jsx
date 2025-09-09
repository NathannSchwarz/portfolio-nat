import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import projects from '../data/projectsData'
import ProjectCompIndex from '../components/ProjectCompIndex'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    if (project) {
      document.title = `NATHAN SCHWARZ - ${project.title}`
    } else {
      document.title = 'NATHAN SCHWARZ - PROJECT'
    }
    const link = document.querySelector("link[rel='icon']") || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = '/img/FleurPleineRouge.webp'
    if (!link.parentNode) document.head.appendChild(link)
  }, [project])

  // Calcul des projets liés (même catégorie, hors projet courant)
  const relatedProjects = React.useMemo(() => {
    if (!project) return []
    const filtered = projects.filter((p) => p.category === project.category && p.id !== project.id)
    // Mélange aléatoire et limite à 3
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3)
  }, [project])

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Project not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  return (
    <section className="relative bg-colowhite pb-32 overflow-hidden  pt-20 md:pt-24 lg:pt-28">
      <div className="lg:grid lg:grid-cols-12 mb-24 md:mb-28 lg:mb-36 px-5">
        {/* Colonne principale */}
        <div className="lg:w-10/12 lg:col-span-10">
          <h1 className="text-5xl text-black font-lactos md:text-[5rem] lg:text-[5.5rem] xl:text-[7rem] pt-8 md:pt-12 lg:pt-12 pb-8">
            {project.title}
          </h1>
          <h2 className="text-black font-unbounded font-semibold text-lg md:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-8">
            {project.subtitleid}
          </h2>
          <p
            className="font-unbounded font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-8 lg:w-4/5 xl:w-9/12 xl:leading-[3.6vh]"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-colored hover:text-coloblue text-sm md:text-base xl:text-xl font-semibold font-unbounded transition-colors duration-500"
            >
              {project.externalLinktext}
            </a>
          )}
        </div>
        {/* Colonne latérale */}
        <div className="flex lg:flex-col mt-10 lg:mt-10 gap-[5vw] md:gap-[7vw] lg:gap-[2vw] lg:col-span-2">
          <div>
            <h2 className="text-black font-unbounded font-semibold text-base md:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-4 lg:mb-5">
              MY WORK
            </h2>
            <ul className="font-unbounded font-light text-sm md:text-base lg:text-xl xl:text-2xl">
              {project.myWork && project.myWork.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
          <div className="lg:mt-14">
            <h2 className="text-black font-unbounded font-semibold text-base md:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-4 lg:mb-5">
              SOFTWARE USED
            </h2>
            <div className="grid grid-cols-4 gap-y-2 lg:gap-y-4 ">
              {project.softwareImages &&
                project.softwareImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Software Used"
                    className="w-8 md:w-10 xl:w-12"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Image principale ou vidéo */}
      <section className="mx-auto md:-mx-5 px-5 md:px-0">
        {project.images?.principal &&
          (project.images.principal.endsWith('.mp4') ? (
            <video
              className="w-full md:h-[55vw] object-cover mb-0.5 lg:mb-1 pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.principal}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="w-full md:h-[55vw] object-cover mb-0.5 lg:mb-1 pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.principal}
              alt="Project First Image"
            />
          ))}
      </section>
      {/* Bloc WHAT I DID (description2) */}
      {project.description2 && (
        <div className="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
          <div className="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
            <h3 className="text-black mx-4 font-unbounded font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-7">
              WHAT I DID
            </h3>
            <p
              className="font-unbounded mx-4 font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-10 md:mb-12 lg:w-3/4 xl:leading-[3.6vh]"
              dangerouslySetInnerHTML={{ __html: project.description2 }}
            />
          </div>
        </div>
      )}
      {/* Grille 2 images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 px-5 md:px-0">
        {project.images?.main && (
          <img
            className="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
            src={project.images.main}
            alt="Project Main Image"
          />
        )}
        {project.images?.secondary1 && (
          <img
            className="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
            src={project.images.secondary1}
            alt="Project Secondary Image"
          />
        )}
      </div>
      {/* Bloc WHAT I DID (description3) */}
      {project.description3 && (
        <div className="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
          <div className="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
            <h3 className="text-black mx-4 font-unbounded font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-7">
              WHAT I DID
            </h3>
            <p
              className="font-unbounded mx-4 font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-10 md:mb-12 lg:w-3/4 xl:leading-[3.6vh]"
              dangerouslySetInnerHTML={{ __html: project.description3 }}
            />
          </div>
        </div>
      )}
      {/* Image/vidéo secondary2 en grand */}
      {project.images?.secondary2 && (
        <section className="mx-auto md:-mx-5 px-5 md:px-0">
          {project.images.secondary2.endsWith('.mp4') ? (
            <video
              className="w-full md:h-[55vw] object-cover mb-0.5  pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.secondary2}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="w-full md:h-[55vw] object-cover mb-0.5 pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.secondary2}
              alt="Project Last Image"
            />
          )}
        </section>
      )}
      {/* Grille 2 images */}
      {(project.images?.secondary3 || project.images?.secondary4) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 px-5 md:px-0">
          {project.images?.secondary3 && (
            <img
              className="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
              src={project.images.secondary3}
              alt="Project Main Image"
            />
          )}
          {project.images?.secondary4 && (
            <img
              className="w-full md:h-[45vw] object-cover rounded-lg md:rounded-none"
              src={project.images.secondary4}
              alt="Project Secondary Image"
            />
          )}
        </div>
      )}
      {/* Bloc WHAT I DID (description3) */}
      {project.description4 && (
        <div className="md:grid md:grid-cols-12 mt-16 md:mt-32 lg:mt-40 mb-16 md:mb-20 lg:mb-40">
          <div className="md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-12">
            <h3 className="text-black mx-4 font-unbounded font-semibold text-lg md:text-xl lg:text-xl xl:text-2xl mb-4 md:mb-5 lg:mb-7">
              WHAT I DID
            </h3>
            <p
              className="font-unbounded mx-4 font-light text-base md:text-lg lg:text-xl xl:text-2xl mb-10 md:mb-12 lg:w-3/4 xl:leading-[3.6vh]"
              dangerouslySetInnerHTML={{ __html: project.description4 }}
            />
          </div>
        </div>
      )}
      {/* Image/vidéo main2 en grand */}
      {project.images?.main2 && (
        <section className="mx-auto md:-mx-5 px-5 md:px-0">
          {project.images.main2.endsWith('.mp4') ? (
            <video
              className="w-full md:h-[55vw] object-cover mb-16 md:mb-20 lg:mb-40 pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.main2}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="w-full md:h-[55vw] object-cover mb-16 md:mb-20 lg:mb-40 pointer-events-none touch-none rounded-lg md:rounded-none"
              src={project.images.main2}
              alt="Project Last Image"
            />
          )}
        </section>
      )}
      {/* Projets liés */}
      {relatedProjects.length > 0 && (
        <section className="mt-20 px-5">
          <h4 className="text-3xl text-black font-lactos md:text-[2rem] lg:text-[3rem] mb-6">
            RELATED PROJECTS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-0">
            {relatedProjects.map((related) => (
              <ProjectCompIndex
                key={related.id}
                id={related.id}
                imageSrc={related.imageSrc}
                imageAlt={related.imageAlt}
                title={related.title}
                subtitle={related.subtitle}
                variant="project"
              />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default ProjectDetail
