import React from 'react'
import { Link } from 'react-router-dom'

function FooterPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <footer className="bg-colored overflow-hidden">
      <div className="mx-5 pt-12 pb-1 text-colowhite">
        {/* Citation et cercle pour tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-12 md:mb-16">
          <p className="font-lactos text-[4vw] text-coloyellow md:text-[2vw] xl:text-4xl">
            "DESIGNING WITH FREEDOM MEANS CREATING SOLUTIONS THAT REFLECT AUTHENTICITY, EMBRACE
            INDIVIDUALITY, AND EMPOWER CHOICES FOR A LIMITLESS FUTURE."
          </p>
          {/* Cercle pour tablet/desktop */}
          <div className="hidden md:flex md:justify-end">
            <Link to="/contact">
              <p
                className="bg-coloblue text-xl text-center rounded-full flex items-center justify-center w-[6rem] h-[6rem] p-5 font-lactos text-coloyellow animate-spin-slow md:text-2xl md:w-[7rem] md:h-[7rem] md:p-8 xl:text-3xl xl:w-[9rem] xl:h-[9rem] xl:p-12 hover:text-colowhite transition-colors duration-500"
                onClick={scrollToTop}
              >
                LET'S WORK
              </p>
            </Link>
          </div>
        </div>
        {/* Liens de navigation, réseaux et informations de contact */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 mb-8 md:mb-0">
          {/* Liens de navigation */}
          <div className="space-y-2">
            <h3 className="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">PAGES</h3>
            <ul className="font-unbounded text-xs text-black font-medium md:text-sm xl:text-xl">
              <li>
                <Link
                  to="/"
                  className="hover:text-colowhite transition-colors duration-500"
                  onClick={scrollToTop}
                >
                  INDEX
                </Link>
              </li>
              <li>
                <Link
                  to="/project"
                  className="hover:text-colowhite transition-colors duration-500"
                  onClick={scrollToTop}
                >
                  PROJECT
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-colowhite transition-colors duration-500"
                  onClick={scrollToTop}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          {/* Réseaux */}
          <div className="ml-16 space-y-2 md:ml-0">
            <h3 className="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">SOCIAL</h3>
            <ul className="font-unbounded text-xs text-black font-medium md:text-sm xl:text-xl">
              <li>
                <a
                  href="https://www.instagram.com/nvt_vnn/?next=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-colowhite transition-colors duration-500"
                >
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nathan-schwarz04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-colowhite transition-colors duration-500"
                >
                  LINKEDIN
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/NathScz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-colowhite transition-colors duration-500"
                >
                  X (TWITTER)
                </a>
              </li>
            </ul>
          </div>
          {/* Informations de contact */}
          <div className="space-y-2">
            <h3 className="font-lactos text-xl text-coloyellow md:text-2xl xl:text-3xl">
              INFORMATION
            </h3>
            <ul className="font-unbounded text-xs text-black font-medium md:text-sm xl:text-xl">
              <li className="break-words">MONTBELIARD, FRANCE</li>
              <li className="break-words hover:text-colowhite transition-colors duration-500 underline">
                <a href="mailto:nathan.schwarz04@gmail.com">NATHAN.SCHWARZ04@GMAIL.COM</a>
              </li>
              <li className="break-words">
                <a
                  href="/CV_NATHAN_SCHWARZ.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-colowhite transition-colors duration-500 underline"
                >
                  CV A TELECHARGER
                </a>
              </li>
            </ul>
          </div>
          {/* Cercle pour mobile (grid-cols-2 row-2) */}
          <div className="ml-16 md:hidden md:ml-0">
            <Link to="/contact">
              <p
                className="bg-coloblue text-lg text-center rounded-full flex items-center justify-center w-[6rem] h-[6rem] p-5 font-lactos text-coloyellow animate-spin-slow md:text-2xl md:w-[8rem] md:h-[8rem] md:p-8 xl:text-4xl xl:w-[11rem] xl:h-[11rem] xl:p-12"
                onClick={scrollToTop}
              >
                LET'S WORK
              </p>
            </Link>
          </div>
        </div>
        {/* Grand texte et copyright */}
        <p className="font-lactos text-[21vw] md:text-[22vw] lg:text-[22.5vw] text-coloyellow">
          NVT_VNN
        </p>
        <p className="font-lactos text-[2.5vw] md:text-[2vw] text-coloyellow -mt-6 md:-mt-16 lg:-mt-24 mb-8">
          © 2025 NATHAN SCHWARZ
        </p>
      </div>
    </footer>
  )
}

export default FooterPage
