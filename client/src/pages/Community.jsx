import React from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { dummyPublishedCreationData } from '../assets/assets'
import { Users, Heart } from 'lucide-react'

const Community = () => {
  const creations = dummyPublishedCreationData.slice(0, 6)

  return (
    <AIModuleLayout
      badge='Community gallery'
      title='See what everyone is building'
      description='Discover featured creations from TaskAI makers, leave feedback, and share your own experiments.'
      sidebar={
        <div className='space-y-4 text-xs text-gray-600'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>How to get featured</h3>
            <ul className='mt-3 space-y-2'>
              <li>• Publish your best work from any TaskAI tool.</li>
              <li>• Write a short description that shares the process.</li>
              <li>• Tag it with a use case so others can find it.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4'>
            Join the weekly community call to swap tips and vote on upcoming features.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          We highlight new creators every Friday. Submit yours by publishing from any tool and toggling “Share with community”.
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Featured this week</h2>
          <a
            href='mailto:community@taskai.app'
            className='text-xs font-semibold text-indigo-600 hover:underline'
          >
            Submit your work
          </a>
        </div>
        <div className='mt-6 grid gap-6 md:grid-cols-3'>
          {creations.map((item) => (
            <article key={item.id} className='flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600'>
              <img src={item.content} alt={item.prompt} className='aspect-square w-full rounded-2xl object-cover' />
              <div>
                <p className='line-clamp-3 text-gray-700'>{item.prompt}</p>
                <div className='mt-4 flex items-center justify-between text-xs text-gray-500'>
                  <span className='inline-flex items-center gap-1 font-semibold text-indigo-600'>
                    <Users className='h-3.5 w-3.5' /> {item.user_id.replace('user_', 'Creator ')}
                  </span>
                  <span className='inline-flex items-center gap-1'>
                    <Heart className='h-3.5 w-3.5 text-pink-500' /> {item.likes.length}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Share your next experiment</h2>
        <div className='mt-4 grid gap-6 md:grid-cols-2'>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600'>
            <h3 className='text-base font-semibold text-gray-900'>How to publish</h3>
            <ol className='mt-3 list-decimal space-y-2 pl-5'>
              <li>Create something you are proud of using any TaskAI tool.</li>
              <li>Toggle “Share with community” before saving or exporting.</li>
              <li>Add a short note about what you tried or learned.</li>
            </ol>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 text-sm text-gray-600'>
            <h3 className='text-base font-semibold text-gray-900'>Join the chat</h3>
            <p className='mt-2'>
              Hop into the Discord server to request feedback, discover prompts, and team up with other makers. Invite link is
              sent after your first published creation.
            </p>
          </div>
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default Community
