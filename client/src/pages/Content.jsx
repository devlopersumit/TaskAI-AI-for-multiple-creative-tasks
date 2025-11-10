import React from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  PenTool,
  Calendar,
  BarChart3,
  Sparkles,
  GaugeCircle,
  Bookmark,
  FolderKanban
} from 'lucide-react'
import PageLayout from '../components/PageLayout'

const contentSuites = [
  {
    title: 'Long-form articles',
    description: 'Generate briefs, outlines, SEO-optimized drafts, and ready-to-publish articles in minutes.',
    icon: FileText
  },
  {
    title: 'Campaign copy',
    description: 'Produce on-brand ads, subject lines, and social copy tuned to each persona and channel.',
    icon: PenTool
  },
  {
    title: 'Content calendar',
    description: 'Plan, assign, and schedule content with AI prioritization and automated approvals.',
    icon: Calendar
  },
  {
    title: 'Performance insights',
    description: 'Track conversions, readability, and engagement powered by predictive analytics.',
    icon: BarChart3
  }
]

const automations = [
  {
    title: 'Brand governance',
    detail: 'Style guides, tone, and compliance rules enforced automatically across every draft.',
    icon: Bookmark
  },
  {
    title: 'Multi-channel repurposing',
    detail: 'Turn one core asset into social threads, email drips, and landing pages instantly.',
    icon: FolderKanban
  },
  {
    title: 'Optimization loops',
    detail: 'Real-time data triggers AI refreshes to keep evergreen content ranking and relevant.',
    icon: GaugeCircle
  }
]

const Content = () => {
  return (
    <PageLayout
      eyebrow='Content intelligence'
      title='Scale storytelling without sacrificing quality'
      description='QuickAI Content combines strategy, creation, and optimization in a single workspace built for high-performing marketing teams.'
      actions={
        <>
          <Link
            to='/ai/write-article'
            className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
          >
            Launch writer
          </Link>
          <a
            href='#automation'
            className='rounded-full border border-indigo-200 px-5 py-2 text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50'
          >
            Review automations
          </a>
        </>
      }
    >
      <section className='grid gap-6 md:grid-cols-2'>
        {contentSuites.map((suite) => (
          <article
            key={suite.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <suite.icon className='h-10 w-10 text-indigo-500' />
            <h2 className='mt-5 text-xl font-semibold'>{suite.title}</h2>
            <p className='mt-3 text-sm text-gray-600'>{suite.description}</p>
          </article>
        ))}
      </section>

      <section className='mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr]'>
        <div className='rounded-3xl border border-indigo-100 bg-white p-10 shadow-sm'>
          <h2 className='flex items-center gap-2 text-2xl font-semibold md:text-3xl'>
            <Sparkles className='h-7 w-7 text-indigo-600' /> From idea to launch in one brief
          </h2>
          <ol className='mt-6 space-y-5 text-sm text-gray-700'>
            <li>
              <span className='font-semibold text-indigo-600'>1.</span> Start with your goal, audience, and call-to-action.
              QuickAI suggests angles and keywords.
            </li>
            <li>
              <span className='font-semibold text-indigo-600'>2.</span> Generate outlines, intros, and visual prompts while keeping your brand voice intact.
            </li>
            <li>
              <span className='font-semibold text-indigo-600'>3.</span> Export to CMS, schedule on social, or send for approvals without leaving the workspace.
            </li>
          </ol>
        </div>

        <div className='space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-5'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500'>Live insight</p>
            <p className='mt-3 text-sm text-gray-700'>“AI + Coding” article predicted to outperform baseline by 32% conversion.</p>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-gray-50 p-5'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500'>Suggested follow-up</p>
            <p className='mt-3 text-sm text-gray-700'>Repurpose into a developer webinar series with companion email drip.</p>
          </div>
        </div>
      </section>

      <section id='automation' className='mt-16 grid gap-6 md:grid-cols-3'>
        {automations.map((item) => (
          <div key={item.title} className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <item.icon className='h-8 w-8 text-indigo-500' />
            <h3 className='mt-4 text-lg font-semibold text-gray-900'>{item.title}</h3>
            <p className='mt-2 text-sm text-gray-600'>{item.detail}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  )
}

export default Content

