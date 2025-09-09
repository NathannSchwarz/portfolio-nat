import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import FleurPleineBleu from '../components/FleurPleineBleu'
import FleurPleineRouge from '../components/FleurPleineRouge'
import FleurPleineYellow from '../components/FleurPleineYellow'
import IconWhite from '../components/Arrow'
import { Link } from 'react-router-dom'

const whatDoYouNeedOptions = ['BRANDING', 'WEB SITE', 'GRAPHIC DESIGN', 'OTHER']
const whereDidYouHearOptions = ['SOCIAL MEDIA', 'FRIEND', 'GOOGLE', 'OTHER']

export default function Contact() {
  const [selected, setSelected] = useState({
    whatDoYouNeed: [],
    whereDidYouHear: [],
  })
  const [formData, setFormData] = useState({
    deadline: '',
    budget: '',
    name: '',
    company: '',
    enquiryType: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    deadline: false,
    budget: false,
    name: false,
    company: false,
    enquiryType: false,
    message: false,
    whatDoYouNeed: false,
    whereDidYouHear: false,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'NATHAN SCHWARZ - CONTACT'
    const link = document.querySelector("link[rel='icon']") || document.createElement('link')
    link.type = 'image/png'
    link.rel = 'icon'
    link.href = '/img/FleurPleineRouge.webp'
    if (!link.parentNode) document.head.appendChild(link)
  }, [])

  const toggleSelection = (category, option) => {
    setSelected((prev) => {
      const already = prev[category].includes(option)
      return {
        ...prev,
        [category]: already
          ? prev[category].filter((item) => item !== option)
          : [...prev[category], option],
      }
    })
  }

  const validateForm = () => {
    const newErrors = {
      deadline: !formData.deadline,
      budget: !formData.budget,
      name: !formData.name,
      company: !formData.company,
      enquiryType: !formData.enquiryType,
      message: !formData.message,
      whatDoYouNeed: selected.whatDoYouNeed.length === 0,
      whereDidYouHear: selected.whereDidYouHear.length === 0,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).includes(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const submitForm = async (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (validateForm()) {
      const templateParams = {
        whatDoYouNeed: selected.whatDoYouNeed.join(', '),
        whereDidYouHear: selected.whereDidYouHear.join(', '),
        ...formData,
      }
      try {
        await emailjs.send(
          'service_hzbrzie',
          'template_krgmlk4',
          templateParams,
          'tYitGWe_Aq6TJD53H',
        )
        setFormSubmitted(true)
      } catch (error) {
        alert('Failed to send email. Please try again.')
      }
    } else {
      const firstError = document.querySelector('.error')
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-colowhite pb-32 overflow-hidden">
      <div>
        <FleurPleineRouge className="absolute top-36 left-2 w-[16vw] z-0 md:top-32 md:left-10 md:w-[14vw] lg:left-16 animate-spin-slow-20" />
        <FleurPleineYellow className="absolute top-20 right-4 w-[18vw] z-0 md:right-12 md:w-[16vw] lg:right-20 animate-spin-reverse-slow" />
        {!formSubmitted && (
          <FleurPleineBleu className="absolute top-[25rem] right-0 w-[16vw] z-0 md:-right-10 md:w-[14vw] lg:-right-20 lg:top-[40rem] animate-spin-reverse" />
        )}
        {!formSubmitted && (
          <FleurPleineYellow className="absolute top-[35rem] -left-6 w-[18vw] z-0 md:-left-14 md:top-[40rem] md:w-[16vw] lg:right-32 lg:top-[50rem] animate-spin-slow" />
        )}
        {!formSubmitted && (
          <FleurPleineRouge className="absolute bottom-10 -right-10 w-[16vw] z-0 md:w-[14vw] lg:right-32 animate-spin-slow-20" />
        )}
        <FleurPleineBleu className="absolute bottom-[15rem] -left-10 w-[18vw] z-0 md:w-[16vw] md:bottom-[10rem] md:-left-20 lg:right-32 animate-spin-reverse-slow" />
      </div>
      {!formSubmitted ? (
        <>
          <h1 className="text-5xl text-black font-lactos text-center md:text-[7rem] lg:text-[8rem] xl:text-[10rem] pt-28 md:pt-36 lg:pt-40 z-10 relative pb-8 lg:pb-20">
            START A<br />
            PROJECT
          </h1>
          <section className="bg-black mx-4 lg:w-8/12 lg:m-auto flex justify-center items-center rounded-3xl lg:py-20 z-10">
            <div className="p-8 bg-black max-w-4xl md:w-4/5 text-white rounded-3xl shadow-lg font-unbounded z-10">
              <form onSubmit={submitForm} className="space-y-6 md:space-y-10 lg:space-y-14 z-10">
                {/* WHAT DO YOU NEED */}
                <div>
                  <h2 className="text-sm md:text-base lg:text-lg mb-4 flex items-center">
                    WHAT DO YOU NEED?
                    {errors.whatDoYouNeed && <span className="text-red-500 ml-2">&#9888;</span>}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {whatDoYouNeedOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => toggleSelection('whatDoYouNeed', option)}
                        className={`border border-white p-1.5 px-4 text-center rounded-full cursor-pointer text-xs md:text-sm lg:text-base flex-shrink-0 transition-colors duration-500 ${selected.whatDoYouNeed.includes(option) ? 'bg-colored text-white' : 'hover:text-colored'} ${errors.whatDoYouNeed ? 'error' : ''}`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
                {/* WHERE DID YOU HEAR ABOUT ME? */}
                <div>
                  <h2 className="text-sm md:text-base lg:text-lg mb-4 flex items-center">
                    WHERE DID YOU HEAR ABOUT ME?
                    {errors.whereDidYouHear && <span className="text-red-500 ml-2">&#9888;</span>}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {whereDidYouHearOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => toggleSelection('whereDidYouHear', option)}
                        className={`border border-white p-1.5 px-4 text-center rounded-full cursor-pointer text-xs md:text-sm lg:text-base flex-shrink-0 transition-colors duration-500 ${selected.whereDidYouHear.includes(option) ? 'bg-colored text-white' : 'hover:text-colored'} ${errors.whereDidYouHear ? 'error' : ''}`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
                {/* DEADLINE TARGET */}
                <div>
                  <h2 className="text-sm md:text-base lg:text-lg mb-4 flex items-center">
                    DEADLINE TARGET
                    {errors.deadline && <span className="text-red-500 ml-2">&#9888;</span>}
                  </h2>
                  <input
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    type="date"
                    className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 text-xs md:text-sm lg:text-base ${errors.deadline ? 'border-red-500 error' : ''}`}
                  />
                </div>
                {/* BUDGET */}
                <div>
                  <h2 className="text-sm md:text-base lg:text-lg mb-4 flex items-center">
                    DO YOU HAVE A BUDGET RANGE IN MIND ?
                    {errors.budget && <span className="text-red-500 ml-2">&#9888;</span>}
                  </h2>
                  <input
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    type="text"
                    placeholder="ENTER YOUR BUDGET RANGE"
                    className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 text-xs md:text-sm lg:text-base ${errors.budget ? 'border-red-500 error' : ''}`}
                  />
                </div>
                {/* DETAILS */}
                <div>
                  <h2 className="text-sm md:text-base lg:text-lg mb-4 flex items-center">
                    YOUR DETAILS
                    {(errors.name || errors.company || errors.enquiryType || errors.message) && (
                      <span className="text-red-500 ml-2">&#9888;</span>
                    )}
                  </h2>
                  <div className="space-y-4 text-xs md:text-sm lg:text-base">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="NAME"
                      className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 ${errors.name ? 'border-red-500 error' : ''}`}
                    />
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      type="text"
                      placeholder="COMPANY"
                      className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 ${errors.company ? 'border-red-500 error' : ''}`}
                    />
                    <input
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENQUIRY TYPE"
                      className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 ${errors.enquiryType ? 'border-red-500 error' : ''}`}
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="MESSAGE"
                      rows={6}
                      className={`w-full bg-white p-4 text-black focus:outline-none focus:ring-2 focus:ring-gray-700 ${errors.message ? 'border-red-500 error' : ''}`}
                    />
                  </div>
                </div>
                {/* Submit */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="flex items-center bg-colored text-white p-2 px-4 rounded-full hover:bg-coloblue text-xs md:text-sm lg:text-base transition-colors duration-500"
                  >
                    SEND
                    <IconWhite className="ml-2 md:ml-3 lg:ml-4 w-3 md:w-4 lg:w-[1.2rem] -rotate-90" />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-5xl text-black font-lactos md:text-[7rem] lg:text-[10rem] pt-8 md:pt-12 lg:pt-16 z-10 relative pb-8 lg:pb-4">
            THANK YOU
          </h1>
          <div className="bg-black mx-4 lg:w-8/12 lg:m-auto flex flex-col items-center rounded-3xl lg:py-20 font-unbounded p-8 z-10">
            <p className="text-base md:text-lg lg:text-xl text-colowhite pb-8 w-3/4">
              Your submission has been received !
            </p>
            <Link
              to="/"
              className="flex items-center justify-center bg-colored text-white px-6 py-3 rounded-full text-xs md:text-sm lg:text-base hover:bg-coloblue transition-colors duration-500"
            >
              BACK TO HOME
              <IconWhite className="ml-2 md:ml-3 lg:ml-4 w-3 md:w-4 lg:w-[1.2rem] -rotate-90" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
