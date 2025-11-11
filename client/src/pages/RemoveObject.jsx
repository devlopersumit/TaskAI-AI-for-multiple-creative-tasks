import React, { useEffect, useRef, useState } from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { Upload, Eraser, Wand2, Loader2 } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { api, getUserPayload } from '../services/apiClient'

const RemoveObject = () => {
  const [notes, setNotes] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [resultUrl, setResultUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const { user } = useUser()

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return () => {}
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0]
    if (selected) {
      setFile(selected)
      setResultUrl('')
      setError(null)
    }
  }

  const handleObjectRemoval = async () => {
    if (!file) {
      setError('Upload an image to edit.')
      return
    }
    if (!notes.trim()) {
      setError('Describe the object you want to remove.')
      return
    }

    setIsProcessing(true)
    setError(null)
    setResultUrl('')

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('prompt', notes)
      formData.append('user', JSON.stringify(getUserPayload(user)))

      const data = await api.removeObject(formData)
      setResultUrl(data?.imageUrl ?? '')
    } catch (apiError) {
      setError(apiError.message || 'Unable to remove object. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <AIModuleLayout
      badge='Image cleanup'
      title='Object remover'
      description='Paint over unwanted items and TaskAI fills the area with context-aware pixels in one click.'
      sidebar={
        <div className='space-y-4 text-xs text-gray-600'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Works best when</h3>
            <ul className='mt-3 space-y-2'>
              <li>• Objects are small relative to the full scene.</li>
              <li>• Background has a consistent pattern or colour.</li>
              <li>• You leave a few pixels of border untouched.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4'>
            For tricky edits, try multiple passes with small brush strokes and review the history list.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          Batch editing and timeline comparison are coming soon—perfect for e-commerce teams retouching product photos.
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Upload and describe</h2>
        <div className='mt-4 grid gap-6 lg:grid-cols-[1.2fr_1fr]'>
          <label className='flex h-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center transition hover:border-indigo-300 hover:bg-white'>
            <Upload className='h-8 w-8 text-indigo-500' />
            <span className='mt-4 text-sm font-semibold text-gray-900'>Drop image here</span>
            <span className='mt-2 text-xs text-gray-500'>PNG or JPG up to 10MB</span>
            <input
              ref={inputRef}
              type='file'
              accept='image/png,image/jpeg'
              className='hidden'
              onChange={handleFileChange}
            />
          </label>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='notes'>
              What should we remove?
            </label>
            <textarea
              id='notes'
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={6}
              placeholder='e.g. Remove the coffee cup on the left side of the desk'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>
        </div>
        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            type='button'
            className='inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60'
            onClick={handleObjectRemoval}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' /> Processing
              </>
            ) : (
              'Remove object'
            )}
          </button>
          <button
            type='button'
            className='rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
            onClick={() => {
              setFile(null)
              setNotes('')
              setResultUrl('')
              setError(null)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          >
            Reset
          </button>
        </div>
        {error && (
          <p className='mt-4 text-sm text-red-600'>
            {error}
          </p>
        )}
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Editing tools</h2>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {[
            {
              icon: Eraser,
              title: 'Brush',
              description: 'Paint over the object you want to remove. Adjust size with the slider.'
            },
            {
              icon: Wand2,
              title: 'Magic select',
              description: 'TaskAI auto-detects foreground subjects—perfect for people or products.'
            },
            {
              icon: Upload,
              title: 'Fill with image',
              description: 'Upload a replacement background or texture to blend into the cleared area.'
            }
          ].map((tool) => (
            <div key={tool.title} className='rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600'>
              <tool.icon className='h-6 w-6 text-indigo-500' />
              <h3 className='mt-3 text-base font-semibold text-gray-900'>{tool.title}</h3>
              <p className='mt-2'>{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Preview & history</h2>
        <div className='mt-4 grid gap-6 md:grid-cols-[1.2fr_1fr]'>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
            <p className='text-sm font-semibold text-gray-900'>Canvas</p>
            {previewUrl ? (
              <img src={previewUrl} alt='Canvas preview' className='mt-3 h-72 w-full rounded-xl object-cover' />
            ) : (
              <div className='mt-3 flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-300'>
                <span className='text-xs text-gray-500'>Upload and paint to start editing</span>
              </div>
            )}
            <div className='mt-4 flex flex-wrap gap-2 text-xs'>
              <button className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'>
                Undo
              </button>
              <button className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'>
                Redo
              </button>
              <button
                className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-60'
                disabled={!resultUrl}
                onClick={() => resultUrl && window.open(resultUrl, '_blank')}
              >
                Download edit
              </button>
            </div>
          </div>
          <div className='space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600'>
            {resultUrl && (
              <div>
                <h3 className='text-base font-semibold text-gray-900'>Result preview</h3>
                <img src={resultUrl} alt='Result after object removal' className='mt-3 w-full rounded-xl object-cover' />
              </div>
            )}
            <div>
              <h3 className='text-base font-semibold text-gray-900'>History</h3>
              <ul className='mt-3 space-y-2 text-xs'>
                <li>• Step 3 – Fill applied to right corner</li>
                <li>• Step 2 – Brush stroke (medium)</li>
                <li>• Step 1 – Magic select background</li>
              </ul>
            </div>
            <div>
              <h3 className='text-base font-semibold text-gray-900'>Suggestions</h3>
              <p className='mt-2 text-xs'>
                Zoom in for detailed edges and keep strokes small. You can always apply multiple passes to improve quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default RemoveObject
