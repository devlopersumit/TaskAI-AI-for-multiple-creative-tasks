import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const PageLayout = ({
  eyebrow,
  title,
  description,
  actions,
  children,
  headerClassName = '',
  contentClassName = ''
}) => {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50 text-gray-900'>
      <Navbar />

      <main className='flex-1 pt-[73px]'>
        <section
          className={`border-b border-gray-200 bg-white px-4 py-12 sm:px-20 xl:px-32 ${headerClassName}`}
        >
          <div className='max-w-4xl'>
            {eyebrow && (
              <p className='text-sm font-medium uppercase tracking-[0.18em] text-indigo-600'>
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className='mt-4 text-3xl font-semibold sm:text-5xl'>
                {title}
              </h1>
            )}
            {description && (
              <p className='mt-4 text-base text-gray-600 sm:text-lg'>
                {description}
              </p>
            )}
            {actions && (
              <div className='mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-900'>
                {actions}
              </div>
            )}
          </div>
        </section>

        <div className={`px-4 py-12 sm:px-20 xl:px-32 ${contentClassName}`}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PageLayout

