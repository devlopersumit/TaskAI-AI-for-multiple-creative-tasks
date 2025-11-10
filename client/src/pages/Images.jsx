import React from 'react'
import { Link } from 'react-router-dom'
import {
  Image as ImageIcon,
  Palette,
  Sparkles,
  Shapes,
  Layers,
  Share2,
  Wand2,
  Camera
} from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { assets } from '../assets/assets'

const creativeModes = [
  {
    title: 'Generative Canvas',
    description: 'Iterate on concepts with live prompts, negative prompts, and style blend controls.',
    icon: Palette
  },
  {
    title: 'Photo Studio',
    description: 'Generate photorealistic scenes with lens, lighting, and composition presets.',
    icon: Camera
  },
  {
    title: 'Brand Kits',
    description: 'Lock brand colors, typography, and tone to keep every asset on-brand.',
    icon: Layers
  },
  {
    title: 'Motion Frames',
    description: 'Storyboard short-form motion graphics with AI-generated frame sequences.',
    icon: Shapes
  }
]

const workflow = [
  {
    step: 'Prompt',
    detail: 'Start with natural language or upload reference images for inspiration.',
    icon: Sparkles
  },
  {
    step: 'Refine',
    detail: 'Use smart sliders to adjust mood, color harmony, lighting, and composition.',
    icon: Wand2
  },
  {
    step: 'Publish',
    detail: 'Export in multiple ratios, compress for the web, or send to the content calendar.',
    icon: Share2
  }
]

const galleryItems = [
  {
    src: assets.ai_gen_img_1,
    caption: 'Anime-style illustration generated with Motion Frames mode.'
  },
  {
    src: assets.ai_gen_img_2,
    caption: 'Futuristic concept art using Generative Canvas with brand kit colors.'
  },
  {
    src: assets.ai_gen_img_3,
    caption: 'Realistic automotive visual produced with Photo Studio presets.'
  }
]

const Images = () => {
  return (
    <PageLayout
      eyebrow='Design with AI'
      title='Create standout visuals in seconds'
      description='QuickAI Images empowers creators to turn ideas into production-ready visuals with adaptive AI render engines and brand-safe automation.'
      actions={
        <>
          <Link
            to='/ai/generate-images'
            className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
          >
            Try Image Studio
          </Link>
          <a
            href='#gallery'
            className='rounded-full border border-indigo-200 px-5 py-2 text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50'
          >
            View sample outputs
          </a>
        </>
      }
    >
      <section className='grid gap-6 md:grid-cols-2'>
        {creativeModes.map((mode) => (
          <article
            key={mode.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <mode.icon className='h-10 w-10 text-indigo-500' />
            <h2 className='mt-5 text-xl font-semibold'>{mode.title}</h2>
            <p className='mt-3 text-sm text-gray-600'>{mode.description}</p>
          </article>
        ))}
      </section>

      <section id='gallery' className='mt-16'>
        <h2 className='text-2xl font-semibold md:text-3xl'>Visual inspiration</h2>
        <p className='mt-2 max-w-2xl text-sm text-gray-600'>
          Every rendering is generated directly in QuickAI with version history, brand compliance reports, and sharable
          review links.
        </p>
        <div className='mt-8 grid gap-8 md:grid-cols-3'>
          {galleryItems.map((item) => (
            <figure
              key={item.caption}
              className='overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
            >
              <img src={item.src} alt={item.caption} className='h-56 w-full object-cover' />
              <figcaption className='px-5 py-4 text-sm text-gray-600'>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className='mt-16 rounded-3xl border border-indigo-100 bg-white p-10 shadow-sm'>
        <h2 className='text-2xl font-semibold text-indigo-600 md:text-3xl'>Guided workflow</h2>
        <div className='mt-8 grid gap-6 md:grid-cols-3'>
          {workflow.map((stage) => (
            <div key={stage.step} className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm'>
                <stage.icon className='h-5 w-5 text-indigo-500' />
              </div>
              <h3 className='mt-4 text-lg font-semibold text-gray-900'>{stage.step}</h3>
              <p className='mt-2 text-sm text-gray-600'>{stage.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default Images

