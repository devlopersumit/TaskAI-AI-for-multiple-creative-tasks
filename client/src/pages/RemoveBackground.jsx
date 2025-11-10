import React from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { Upload } from 'lucide-react'

const steps = ['Upload or drop an image (PNG/JPG, max 10MB)', 'TaskAI detects the subject automatically', 'Download the clean PNG or add a new background']

const RemoveBackground = () => {
  return (
    <AIModuleLayout
      badge='Image cleanup'
      title='Background remover'
      description='Drop in product shots, portraits, or mockups and TaskAI will isolate the subject in seconds.'
      sidebar={
        <div className='space-y-4 text-xs text-gray-600'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Best results</h3>
            <ul className='mt-3 space-y-2'>
              <li>• Use high-contrast photos where the subject is centered.</li>
              <li>• Slight shadows are fine—TaskAI preserves natural lighting.</li>
              <li>• Try uploading a PNG to keep original transparency.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4'>
            Export history is stored for 72 hours. Re-download previous results anytime in the Pro plan.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          We are building batch processing so you can clean entire product catalogues in one go. Stay tuned!
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Upload</h2>
        <div className='mt-4 flex flex-col gap-6 lg:flex-row'>
          <label className='flex flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center transition hover:border-indigo-300 hover:bg-white'>
            <Upload className='h-8 w-8 text-indigo-500' />
            <span className='mt-4 text-sm font-semibold text-gray-900'>Drop image here</span>
            <span className='mt-2 text-xs text-gray-500'>PNG or JPG up to 10MB</span>
            <input type='file' accept='image/png,image/jpeg' className='hidden' />
          </label>
          <div className='flex-1 space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600'>
            <h3 className='text-base font-semibold text-gray-900'>How it works</h3>
            <ol className='mt-3 list-decimal space-y-2 pl-5'>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Preview</h2>
        <div className='mt-4 grid gap-6 md:grid-cols-2'>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
            <p className='text-sm font-semibold text-gray-900'>Original</p>
            <div className='mt-3 flex h-56 items-center justify-center rounded-xl border border-dashed border-gray-300'>
              <span className='text-xs text-gray-500'>Upload an image to preview</span>
            </div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
            <p className='text-sm font-semibold text-gray-900'>Background removed</p>
            <div className='mt-3 flex h-56 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAUEBAQCI/7kAAAAASUVORK5CYII=")]'>
              <span className='text-xs text-gray-500'>Result will appear here</span>
            </div>
            <div className='mt-4 flex flex-wrap gap-2 text-xs'>
              <button className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'>
                Download PNG
              </button>
              <button className='rounded-full border border-gray-300 px-4 py-2 text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'>
                Replace background
              </button>
            </div>
          </div>
        </div>
      </section>
    </AIModuleLayout>
  )
}

export default RemoveBackground
