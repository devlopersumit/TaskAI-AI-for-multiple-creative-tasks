import React, { useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handlePricingClick = () => {
    const scrollToPricing = () => {
      const section = document.getElementById('pricing')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }

    if (window.location.pathname === '/') {
      scrollToPricing()
    } else {
      navigate('/')
      timeoutRef.current = setTimeout(scrollToPricing, 150)
    }
  }

  return (
    <nav className='fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl'>
      <div className='flex items-center justify-between py-3 px-4 sm:px-20 xl:px-32'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <Sparkles className='w-8 h-8 text-[#5044E5]' />
          <span className='text-xl font-bold'>TaskAI</span>
        </div>

        <div className='hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600'>
          <button
            className='transition-colors hover:text-[#5044E5]'
            onClick={handlePricingClick}
          >
            Pricing
          </button>
        </div>

        {/* Auth Button / User Menu */}
        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <Link
                to='/ai'
                className='hidden sm:inline-flex items-center gap-2 rounded-full border border-[#5044E5]/30 px-5 py-2 text-sm font-semibold text-[#5044E5] transition-colors hover:bg-[#5044E5]/10'
              >
                Open workspace
              </Link>
              <UserButton afterSignOutUrl='/' />
            </>
          ) : (
            <>
              <button
                className='text-sm font-medium text-gray-600 transition-colors hover:text-[#5044E5]'
                onClick={openSignIn}
              >
                Sign in
              </button>
              <button
                className='flex items-center gap-2 rounded-full bg-[#5044E5] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4035c9]'
                onClick={openSignIn}
              >
                Start for free <ArrowRight className='w-4 h-4' />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
