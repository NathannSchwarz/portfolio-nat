import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Project from './pages/Project'
import ProjectDetail from './pages/ProjectDetail'
import HeaderPage from './components/HeaderPage'
import FooterPage from './components/FooterPage'

function App() {
  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <FooterPage />
    </>
  )
}

export default App
