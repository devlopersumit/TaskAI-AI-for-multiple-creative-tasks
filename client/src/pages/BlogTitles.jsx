import React, { useMemo, useState } from 'react'
import AIModuleLayout from '../components/AIModuleLayout'

const categories = ['Technology', 'Marketing', 'Productivity', 'Design', 'AI & Data']
const vibes = ['Educational', 'Curious', 'Bold', 'Conversational', 'Playful']

const generateTitles = (topic, vibe) => {
  if (!topic) return []
  const base = topic.trim()
  const tone = vibe.toLowerCase()
  return [
    `${base}: ${tone === 'bold' ? 'The Playbook' : 'A Practical Guide'}`,
    `Why ${base} Matters in ${new Date().getFullYear()}`,
    `From Idea to Impact: ${base} Explained`,
    `${base} – ${tone === 'playful' ? 'Surprising Truths' : 'Key Lessons'} You Should Know`,
    `How to Master ${base} Without Burning Out`
  ]
}

const BlogTitles = () => {
  const [topic, setTopic] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [vibe, setVibe] = useState(vibes[0])
  const [savedTitles, setSavedTitles] = useState([])

  const suggestions = useMemo(() => generateTitles(topic, vibe), [topic, vibe])

  const handleSave = (title) => {
    if (!savedTitles.includes(title)) {
      setSavedTitles((previous) => [...previous, title])
    }
  }

  return (
    <AIModuleLayout
      badge='Headline helper'
      title='Blog title generator'
      description='Describe your post, pick a category, and TaskAI will suggest headline variations you can tweak and save.'
      sidebar={
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>What works well</h3>
            <ul className='mt-3 space-y-2 text-xs text-gray-600'>
              <li>• Keep topic clear and action-focused.</li>
              <li>• Try multiple vibes to see different hooks.</li>
              <li>• Save favourites to reuse or A/B test later.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs text-gray-600'>
            In the Pro plan you can export title packs or sync them to your content calendar.
          </div>
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Describe your post</h2>
        <div className='mt-6 space-y-6'>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='topic'>
              Post topic
            </label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder='e.g. Building a marketing workflow with AI assistants'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='category'>
                Category
              </label>
              <select
                id='category'
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='vibe'>
                Headline vibe
              </label>
              <select
                id='vibe'
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {vibes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Suggestions</h2>
          <p className='text-xs text-gray-500'>
            Category: <span className='font-semibold text-indigo-600'>{category}</span> · Tone:{' '}
            <span className='font-semibold text-indigo-600'>{vibe}</span>
          </p>
        </div>
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          {suggestions.length === 0 && (
            <p className='rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
              Add a topic to generate headline options. You can then save, copy, or refine them.
            </p>
          )}
          {suggestions.map((title) => (
            <div key={title} className='flex flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700'>
              <p className='font-semibold text-gray-900'>{title}</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                <button
                  type='button'
                  className='rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
                  onClick={() => navigator.clipboard.writeText(title)}
                >
                  Copy
                </button>
                <button
                  type='button'
                  className='rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50'
                  onClick={() => handleSave(title)}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Saved titles</h2>
        {savedTitles.length === 0 ? (
          <p className='mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
            Saved titles will appear here—perfect for content calendars or A/B tests.
          </p>
        ) : (
          <ul className='mt-4 space-y-3 text-sm text-gray-700'>
            {savedTitles.map((title) => (
              <li key={title} className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3'>
                {title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </AIModuleLayout>
  )
}

export default BlogTitles
