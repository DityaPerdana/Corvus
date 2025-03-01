import React from 'react'
import { MacbookScroll } from './ui/macbook-scroll'

const Hero = () => {
  return (
    <div id='home'>
    <div>
        <div className="flex flex-col items-center text-center p-6 md:hidden">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
                Tired of the same old boring LMS?
            </h1>
            <h2 className="text-2xl font-semibold text-primary mb-6">
                Corvus is here to help.
            </h2>
            <p className="text-lg mb-8 max-w-md">
                A modern learning management system designed for better engagement, improved retention, and seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Get Started
                </button>
            </div>
            <img 
                src="/heroimg.webp" 
                alt="Corvus LMS Preview" 
                className="mt-8 rounded-lg shadow-lg w-full max-w-sm" 
            />
        </div>
    </div>
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full hidden sm:block">
      <MacbookScroll
        title={
          <span >
            Tired of the same old boring LMS? <br />
            <span className="text-primary">Corvus</span> is here to help.
          </span>
        }
        src={`/heroimg.webp`}
        showGradient={false}
      />
    </div>
    </div>
  )
}

export default Hero
