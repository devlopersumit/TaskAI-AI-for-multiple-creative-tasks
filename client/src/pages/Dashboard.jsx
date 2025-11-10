import React from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { AiToolsData, dummyCreationData, dummyPublishedCreationData } from '../assets/assets'
import { Sparkles, Clock, ArrowRight, ExternalLink } from 'lucide-react'

const Dashboard = () => {
  const recentCreations = dummyCreationData.slice(0, 3)
  const publishedCreations = dummyPublishedCreationData.slice(0, 2)

  return (
    <AIModuleLayout
      badge='Workspace overview'
      title='Welcome back to TaskAI'
      description='See what you and your teammates have generated recently, track progress, and jump into the tools you need next.'
      sidebar={
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Usage snapshot</h3>
            <ul className='mt-3 space-y-2 text-xs text-gray-600'>
              <li>• {dummyCreationData.length} drafts saved this month</li>
              <li>• {dummyPublishedCreationData.length} creations published</li>
              <li>• {AiToolsData.length} AI tools available in your plan</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600'>Tip</p>
            <p className='mt-2 text-sm text-gray-600'>
              Share drafts with collaborators from each tool to gather feedback before publishing.
            </p>
          </div>
        </div>
      }
      info={
        <div className='flex flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-2'>
            <Sparkles className='h-4 w-4 text-indigo-500' />
            We are working on real-time collaboration and version comparisons next.
          </div>
          <a
            href='mailto:hello@taskai.app'
            className='inline-flex items-center gap-2 text-indigo-600 hover:underline'
          >
            Send feedback <ExternalLink className='h-4 w-4' />
          </a>
        </div>
      }
    >
      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {[
          { label: 'Drafts saved', value: dummyCreationData.length },
          { label: 'Items published', value: dummyPublishedCreationData.length },
          { label: 'Available AI tools', value: AiToolsData.length },
          { label: 'Last active', value: '2 hours ago' }
        ].map((stat) => (
          <div key={stat.label} className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <p className='text-xs font-semibold uppercase tracking-[0.3em] text-gray-500'>{stat.label}</p>
            <p className='mt-3 text-2xl font-semibold text-gray-900'>{stat.value}</p>
          </div>
        ))}
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Recent drafts</h2>
            <p className='text-sm text-gray-500'>These items are saved privately—open them to keep refining.</p>
          </div>
          <a href='/ai' className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-600'>
            View all <ArrowRight className='h-4 w-4' />
          </a>
        </div>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {recentCreations.map((item) => (
            <article key={item.id} className='rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600'>
              <p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500'>
                <Clock className='h-3.5 w-3.5' />
                {new Date(item.created_at).toLocaleDateString()}
              </p>
              <p className='mt-3 font-semibold text-gray-900'>{item.prompt}</p>
              <p className='mt-2 line-clamp-3 text-xs text-gray-500'>
                {item.content?.slice(0, 160)}{item.content?.length > 160 ? '…' : ''}
              </p>
              <a href='/ai' className='mt-4 inline-flex items-center gap-2 text-xs font-semibold text-indigo-600'>
                Continue editing <ArrowRight className='h-3.5 w-3.5' />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Quick actions</h2>
            <p className='text-sm text-gray-500'>Jump straight into the tools your workspace uses most.</p>
          </div>
        </div>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {AiToolsData.map((tool) => (
            <button
              key={tool.title}
              className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-700 transition hover:border-indigo-400 hover:bg-white'
            >
              <tool.Icon className='h-5 w-5 text-indigo-500' />
              <div>
                <p className='font-semibold text-gray-900'>{tool.title}</p>
                <p className='text-xs text-gray-500'>{tool.description.slice(0, 60)}…</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Published highlights</h2>
            <p className='text-sm text-gray-500'>Shared with the TaskAI community.</p>
          </div>
        </div>
        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          {publishedCreations.map((item) => (
            <article key={item.id} className='flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
              <img src={item.content} alt={item.prompt} className='h-20 w-20 rounded-xl object-cover' />
              <div className='text-sm text-gray-700'>
                <p className='font-semibold text-gray-900 line-clamp-2'>{item.prompt}</p>
                <p className='mt-2 text-xs text-gray-500'>Likes: {item.likes.length}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default Dashboard
