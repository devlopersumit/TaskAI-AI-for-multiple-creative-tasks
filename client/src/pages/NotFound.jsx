import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

const NotFound = () => {
  return (
    <PageLayout
      title='Page not found'
      description='The page you are looking for might have been removed, renamed, or is temporarily unavailable.'
      actions={
        <Link
          to='/'
          className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
        >
          Back to home
        </Link>
      }
      contentClassName='flex justify-center'
    >
      <div className='max-w-xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm'>
        <h2 className='text-7xl font-bold text-indigo-200'>404</h2>
        <p className='mt-4 text-sm text-gray-600'>
          We can&apos;t seem to find the resource you&apos;re looking for. Try heading back to the homepage or exploring
          our AI tools.
        </p>
      </div>
    </PageLayout>
  )
}

export default NotFound

