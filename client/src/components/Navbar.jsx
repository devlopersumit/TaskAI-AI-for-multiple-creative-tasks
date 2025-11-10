import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Menu, X, Sparkles, Code2, Image, MessageSquare, FileText } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Tools', path: '/ai', icon: Sparkles },
    { name: 'Code', path: '/code', icon: Code2 },
    { name: 'Images', path: '/images', icon: Image },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Content', path: '/content', icon: FileText },
  ];

  return (
    <nav className='fixed top-0 z-50 w-full backdrop-blur-xl bg-white/75 border-b border-gray-200'>
      <div className='flex items-center justify-between py-3 px-4 sm:px-20 xl:px-32'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <Sparkles className='w-8 h-8 text-[#5044E5]' />
          <span className='text-xl font-bold'>TaskAI</span>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className='flex items-center gap-2 text-gray-600 hover:text-[#5044E5] transition-colors'
            >
              <item.icon className='w-4 h-4' />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Button / User Menu */}
        <div className='flex items-center gap-4'>
          {user ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <button
              className='flex items-center gap-2 rounded-full text-sm bg-[#5044E5] text-white px-6 py-2.5 hover:bg-[#4035c9] transition-colors'
              onClick={openSignIn}
            >
              Get Started <ArrowRight className='w-4 h-4' />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden px-4 py-4 bg-white border-t border-gray-100'>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className='flex items-center gap-2 py-3 text-gray-600 hover:text-[#5044E5] transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className='w-4 h-4' />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
