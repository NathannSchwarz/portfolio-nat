import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function HeaderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const location = useLocation()
  let lastScrollY = window.scrollY

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false) // Ferme le menu au changement de page
  }, [location])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed flex items-center justify-between mt-3 md:mt-0 p-4 md:p-8 md:py-5 md:pt-4 top-0 md:top-4 z-50 w-full md:border-0 ${isHeaderVisible ? 'header-visible' : 'header-hidden'}`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="block border ml-1 md:ml-0 pt-1.5 pb-1 px-4 md:pt-1 md:pb-0.5 lg:p-2 lg:pb-1 lg:px-5 xl:p-3 xl:pb-2 xl:px-6 border-black bg-colowhite rounded-[10rem] md:hover:bg-black md:hover:text-colowhite transition-colors duration-500"
        onClick={scrollToTop}
      >
        <p className="font-lactos text-lg md:text-[1.8vw] xl:text-[1.3vw]">NATHAN SCHWARZ</p>
      </Link>

      {/* Navigation Desktop */}
      <nav className="hidden md:flex space-x-2 md:space-x-6 xl:space-x-8 md:text-[1.8vw] xl:text-[1.3vw]">
        <Link
          to="/"
          className="font-lactos hover:bg-coloyellow hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5 border-black bg-colowhite rounded-[10rem]"
          onClick={scrollToTop}
        >
          HOME
        </Link>
        <Link
          to="/project"
          className="font-lactos hover:bg-colored hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5 border-black bg-colowhite rounded-[10rem]"
          onClick={scrollToTop}
        >
          PROJECT
        </Link>
        <Link
          to="/contact"
          className="font-lactos hover:bg-coloblue hover:text-colowhite transition-colors duration-500 border p-1.5 pb-1 px-5 border-black bg-colowhite rounded-[10rem]"
          onClick={scrollToTop}
        >
          CONTACT
        </Link>
      </nav>

      {/* Menu Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden absolute right-5 w-[3.7rem] h-10 focus:outline-none z-50 rounded-full px-4 transition-all duration-300 ${isMenuOpen ? 'border-transparent' : 'border border-black bg-colowhite'}`}
      >
        <svg
          viewBox="0 0 74 50"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-black cursor-pointer"
        >
          <path
            className={`menu-line top ${isMenuOpen ? 'top-rotate' : ''}`}
            d="M5.04004 5.00659H68.917"
            stroke={isMenuOpen ? 'black' : 'currentColor'}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            className={`menu-line middle ${isMenuOpen ? 'middle-rotate' : ''}`}
            d="M21.3408 25.0066L68.9168 25.0066"
            stroke={isMenuOpen ? 'black' : 'currentColor'}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            className={`menu-line bottom ${isMenuOpen ? 'bottom-fade' : ''}`}
            d="M38.4629 45.0066L68.917 45.0066"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Menu Mobile Content */}
      <div
        className={`md:hidden absolute top-4 right-5 w-32 border border-1 border-black bg-colowhite pt-10 pb-6 px-5 rounded-3xl shadow-lg transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
      >
        <ul className="space-y-4">
          <li onClick={scrollToTop}>
            <Link
              to="/"
              className="block text-xl font-lactos hover:text-coloyellow transition-colors duration-500"
            >
              HOME
            </Link>
          </li>
          <li onClick={scrollToTop}>
            <Link
              to="/project"
              className="block text-xl font-lactos text-right hover:text-colored transition-colors duration-500"
            >
              PROJECT
            </Link>
          </li>
          <li onClick={scrollToTop}>
            <Link
              to="/contact"
              className="block text-xl font-lactos hover:text-coloblue transition-colors duration-500"
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default HeaderPage

// Ajoute les styles utilitaires dans le CSS global React (menu-line, top-rotate, etc.)
