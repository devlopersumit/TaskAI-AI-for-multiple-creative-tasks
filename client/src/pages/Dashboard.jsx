import React, { useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import AIModuleLayout from '../components/AIModuleLayout'
import { AiToolsData, assets } from '../assets/assets'
import { Sparkles, Clock, ArrowRight, ExternalLink, Loader2 } from 'lucide-react'
import { api } from '../services/apiClient'

const Dashboard = () => {
  const { user } = useUser()
  const [summary, setSummary] = useState({
    stats: {
      drafts: 0,
      published: 0,
      toolsAvailable: AiToolsData.length,
      lastActive: null,
    },
    recentDrafts: [],
    publishedHighlights: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.id) return

    let ignore = false

    const loadSummary = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getDashboardSummary({ userId: user.id })
        if (ignore) return
        setSummary({
          stats: {
            drafts: data?.stats?.drafts ?? 0,
            published: data?.stats?.published ?? 0,
            toolsAvailable: data?.stats?.toolsAvailable ?? AiToolsData.length,
            lastActive: data?.stats?.lastActive ?? null,
          },
          recentDrafts: data?.recentDrafts ?? [],
          publishedHighlights: data?.publishedHighlights ?? [],
        })
      } catch (apiError) {
        if (ignore) return
        setError(apiError.message || 'Unable to load your dashboard summary.')
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadSummary()

    return () => {
      ignore = true
    }
  }, [user?.id])

  const usageCards = useMemo(
    () => [
      { label: 'Drafts saved', value: summary.stats.drafts },
      { label: 'Items published', value: summary.stats.published },
      { label: 'Available AI tools', value: summary.stats.toolsAvailable },
      {
        label: 'Last active',
        value: summary.stats.lastActive
          ? new Date(summary.stats.lastActive).toLocaleString()
          : 'Just now',
      },
    ],
    [summary.stats],
  )

  const getDraftPreview = (item) => {
    if (item?.type === 'article') {
      return item.content?.draft?.slice(0, 160)
    }
    if (item?.type === 'blog-title') {
      return item.content?.titles?.slice(0, 3)?.join(', ')
    }
    if (item?.type === 'image') {
      return 'Generated an image set—open to view the variants.'
    }
    if (item?.type === 'resume-review') {
      return item.content?.feedback?.highlights?.[0]
    }
    return item.prompt
  }

  const getHighlightMedia = (item) => {
    if (item?.type === 'image') {
      return item.content?.images?.[0]
    }
    if (item?.type === 'background-removal' || item?.type === 'object-removal') {
      return item.content?.resultUrl
    }
    return assets.ai_gen_img_1
  }

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
              <li>• {summary.stats.drafts} drafts saved this month</li>
              <li>• {summary.stats.published} creations published</li>
              <li>• {summary.stats.toolsAvailable} AI tools available in your plan</li>
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
      {error && (
        <div className='mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {usageCards.map((stat) => (
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
          {isLoading && summary.recentDrafts.length === 0 && (
            <div className='rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
              <Loader2 className='mb-2 h-5 w-5 animate-spin text-indigo-500' />
              Fetching your latest drafts…
            </div>
          )}
          {summary.recentDrafts.map((item) => (
            <article key={item.id} className='rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600'>
              <p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500'>
                <Clock className='h-3.5 w-3.5' />
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className='mt-3 font-semibold text-gray-900'>{item.prompt}</p>
              <p className='mt-2 line-clamp-3 text-xs text-gray-500'>
                {getDraftPreview(item) || 'Open this draft to continue refining it.'}
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
          {isLoading && summary.publishedHighlights.length === 0 && (
            <div className='rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
              <Loader2 className='mb-2 h-5 w-5 animate-spin text-indigo-500' />
              Loading published highlights…
            </div>
          )}
          {summary.publishedHighlights.map((item) => (
            <article key={item.id} className='flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4'>
              <img src={getHighlightMedia(item)} alt={item.prompt} className='h-20 w-20 rounded-xl object-cover' />
              <div className='text-sm text-gray-700'>
                <p className='font-semibold text-gray-900 line-clamp-2'>{item.prompt}</p>
                <p className='mt-2 text-xs text-gray-500'>Likes: {item.metadata?.likes?.length ?? 0}</p>
              </div>
            </article>
          ))}
          {!isLoading && summary.publishedHighlights.length === 0 && (
            <p className='rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
              Publish a creation from any AI tool and toggle “Share with community” to see it highlighted here.
            </p>
          )}
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default Dashboard
