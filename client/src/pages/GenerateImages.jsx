import React, { useState } from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { assets } from '../assets/assets'
import { Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { api, getUserPayload } from '../services/apiClient'

const styles = ['Photorealistic', 'Illustration', 'Minimalist', '3D render', 'Watercolour']
const ratios = ['Square 1:1', 'Portrait 4:5', 'Landscape 16:9']

const GenerateImages = () => {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState(styles[0])
  const [ratio, setRatio] = useState(ratios[0])
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const { user } = useUser()

  const handleGenerate = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setImages([])

    try {
      const data = await api.generateImages({
        prompt,
        style,
        ratio,
        user: getUserPayload(user),
      })
      const generated = data?.images ?? []
      setImages(generated.length ? generated : [assets.ai_gen_img_1, assets.ai_gen_img_2, assets.ai_gen_img_3])
    } catch (apiError) {
      setError(apiError.message || 'Unable to generate images. Please try again.')
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AIModuleLayout
      badge='Image studio'
      title='Generate images'
      description='Describe the visual you need, pick a style, and TaskAI will deliver production-ready artwork for your project.'
      sidebar={
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Prompt formula</h3>
            <ul className='mt-3 space-y-2 text-xs text-gray-600'>
              <li>• Subject: who or what is the focus?</li>
              <li>• Setting: where does it live? add lighting or mood.</li>
              <li>• Style: pick an art style, lens type, or colour palette.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs text-gray-600'>
            Tip: use variants to explore ideas, then upscale your favourite results before exporting.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          All generated images are yours to use. For commercial projects we recommend doing a quick brand and quality check
          before publishing.
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Describe your image</h2>
        <form className='mt-6 space-y-6' onSubmit={handleGenerate}>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='prompt'>
              Prompt
            </label>
            <textarea
              id='prompt'
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={4}
              placeholder='e.g. Futuristic workspace with a designer and engineer collaborating beside a glowing interface, cinematic lighting'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              required
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='style'>
                Style
              </label>
              <select
                id='style'
                value={style}
                onChange={(event) => setStyle(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {styles.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700' htmlFor='ratio'>
                Aspect ratio
              </label>
              <select
                id='ratio'
                value={ratio}
                onChange={(event) => setRatio(event.target.value)}
                className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              >
                {ratios.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' /> Generating
              </>
            ) : (
              'Generate images'
            )}
          </button>
        </form>

        {error && (
          <p className='mt-4 text-sm text-red-600'>
            {error}
          </p>
        )}
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Gallery</h2>
        <p className='mt-2 text-sm text-gray-500'>
          Each run produces three variants. Select your favourite to upscale or download.
        </p>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {images.length === 0 && (
            <p className='rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
              Your generated images will appear here. Use a descriptive prompt to get started.
            </p>
          )}
          {images.map((src, index) => (
            <figure key={index} className='flex flex-col gap-3'>
              <img src={src} alt={`Generated variant ${index + 1}`} className='aspect-square w-full rounded-2xl object-cover' />
              <div className='flex flex-wrap gap-2 text-xs'>
                <button className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'>
                  Upscale
                </button>
                <button
                  className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
                  onClick={() => window.open(src, '_blank')}
                >
                  Download
                </button>
              </div>
            </figure>
          ))}
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default GenerateImages
