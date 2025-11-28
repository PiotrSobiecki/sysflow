import React, { useEffect, useState } from 'react'
import { Hero } from '@components/home/Hero'
import { Problems } from '@components/home/Problems'
import { Solutions } from '@components/home/Solutions'
import { Training } from '@components/home/Training'
import { FlowOne } from '@components/home/FlowOne'
import { Team } from '@components/home/Team'
import { WhyChoose } from '@components/home/WhyChoose'
import { CTA } from '@components/home/CTA'
import { Contact } from '@components/home/Contact'
import './App.css'

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Loading animation
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Hero />
      <Problems />
      <Solutions />
      <Training />
      <FlowOne />
      <Team />
      <WhyChoose />
      <CTA />
      <Contact />
    </div>
  )
}

export default App

