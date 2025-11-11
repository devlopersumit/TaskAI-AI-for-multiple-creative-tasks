import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import AIModuleLayout from '../components/AIModuleLayout'
import { api, getUserPayload } from '../services/apiClient'

const tones = ['Friendly', 'Professional', 'Playful', 'Technical']
const lengths = ['Short (300 words)', 'Medium (600 words)', 'Long (1,000+ words)']
const outlines = [
  'Intro → Key insights → Practical tips → Conclusion',
  'Problem → Why now → Solution → How TaskAI helps',
  'Story hook → Lesson → Action steps → Summary'
]

const WriteArticle = () => {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState(tones[0])
  const [length, setLength] = useState(lengths[1])
  const [outline, setOutline] = useState(outlines[0])
  const [keywords, setKeywords] = useState('')
  const [result, setResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useUser()

  const handleGenerate = async (event) => {
    event.preventDefault()
    setIsGenerating(true)
    setError(null)
    setResult('')

    try {
      const payload = {
        topic,
        tone,
        length,
        outline,
        keywords,
        user: getUserPayload(user),
      }

      const data = await api.generateArticle(payload)
      setResult(data?.draft ?? '')
    } catch (apiError) {
      setError(apiError.message || 'Unable to generate article. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AIModuleLayout
      badge='Content writer'
      title='Article generator'
      description='Capture your topic, tone, and structure. TaskAI will give you a working draft you can polish instantly.'
      sidebar={
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Tips for great drafts</h3>
            <ul className='mt-3 space-y-2 text-xs text-gray-600'>
              <li>• Include audience and outcome in the topic field.</li>
              <li>• Add 3-5 keywords to keep the AI focused.</li>
              <li>• Pick an outline before generating the full article.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs text-gray-600'>
            Save your favourite outlines and tones in the Pro plan so your team stays consistent.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          Need help editing? Duplicating existing drafts and regenerating single sections keeps your voice intact while speeding
          up revisions.
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Setup your article</h2>
        <form className='mt-6 space-y-6' onSubmit={handleGenerate}>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='topic'>
              Topic / headline
            </label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder='e.g. Launching an AI-powered marketing workflow'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              required
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='tone'>
                Tone
              </label>
              <select
                id='tone'
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {tones.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='length'>
                Length
              </label>
              <select
                id='length'
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {lengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='outline'>
              Outline
            </label>
            <select
              id='outline'
              value={outline}
              onChange={(event) => setOutline(event.target.value)}
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            >
              {outlines.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='keywords'>
              Keywords (comma separated)
            </label>
            <input
              id='keywords'
              type='text'
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              placeholder='e.g. automation, customer journey, launch plan'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>

          <div className='flex flex-wrap gap-3'>
            <button
              type='submit'
              className='inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60'
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' /> Generating
                </>
              ) : (
                'Generate draft'
              )}
            </button>
            <button
              type='button'
              className='rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
              onClick={() => {
                setTopic('')
                setKeywords('')
                setResult('')
                setError(null)
              }}
            >
              Clear
            </button>
          </div>

          {error && (
            <p className='text-sm text-red-600'>
              {error}
            </p>
          )}
        </form>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Draft output</h2>
          <button
            type='button'
            className='rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
            onClick={() => {
              if (result) {
                navigator.clipboard.writeText(result)
              }
            }}
          >
            Copy to clipboard
          </button>
        </div>
        <div className='mt-4 min-h-[200px] rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 whitespace-pre-wrap'>
          {result || 'Your article draft will appear here after you click “Generate draft”.'}
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default WriteArticle
