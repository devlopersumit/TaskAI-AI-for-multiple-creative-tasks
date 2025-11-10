import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-[url(./assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>
      <div className='text-center mb-8'>
        <div className='inline-flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full mb-6 shadow-sm'>
          <span className='animate-pulse size-2 bg-green-500 rounded-full'></span>
          <span className='text-sm text-gray-600'>AI Tools Available Now</span>
        </div>

        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Your AI-Powered <br />
          <span className='bg-gradient-to-r from-[#5044E5] to-[#7B5EE4] text-transparent bg-clip-text'>Content Creation</span> Suite
        </h1>

        <p className='mt-6 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-sm text-gray-600'>
          Generate images, write articles, code faster, and enhance your workflow with our advanced AI tools
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs mb-8'>
        <button
          className='bg-[#5044E5] text-white px-10 py-3.5 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-200'
          onClick={() => user ? navigate('/ai') : openSignIn()}
        >
          Start Creating Now
        </button>
        <button
          className='group bg-white px-10 py-3.5 rounded-lg border border-gray-200 hover:border-[#5044E5] hover:scale-105 active:scale-95 transition-all duration-200'
          onClick={() => navigate('/pricing')}
        >
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-[#5044E5]' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Explore Features
          </div>
        </button>
      </div>

      <div className='flex flex-col items-center gap-4 mx-auto'>
        <div className='flex items-center gap-3 text-gray-600'>
          <img src={assets.user_group} className='h-8' alt="Users" />
          <span>Trusted by 10k+ creators</span>
        </div>

        <div className='flex gap-6 mt-4 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            AI-Powered Tools
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            24/7 Availability
          </div>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-green-500' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Real-time Results
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
