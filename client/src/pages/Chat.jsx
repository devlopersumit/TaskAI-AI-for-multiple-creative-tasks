import React from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquare,
  Sparkles,
  Globe,
  Mic,
  Workflow,
  Shield,
  Users,
  Headphones
} from 'lucide-react'
import PageLayout from '../components/PageLayout'

const assistants = [
  {
    title: 'Knowledge chat',
    description: 'Upload PDFs, wikis, and product docs. QuickAI builds a semantic knowledge graph for reliable answers.',
    icon: Globe
  },
  {
    title: 'Voice concierge',
    description: 'Deploy realtime voice bots with dynamic personas and multilingual speech synthesis.',
    icon: Mic
  },
  {
    title: 'Automation agent',
    description: 'Chain actions across CRMs, support desks, and analytics tools through secure API connectors.',
    icon: Workflow
  },
  {
    title: 'Team huddles',
    description: 'Summarize meetings, assign tasks, and surface blockers with AI meeting notes.',
    icon: Users
  }
]

const differentiators = [
  {
    title: 'Enterprise safeguards',
    detail: 'SOC 2 Type II, GDPR, and HIPAA compliant deployments with in-region data residency options.',
    icon: Shield
  },
  {
    title: 'Human escalation',
    detail: 'Route complex inquiries to live agents with full context, transcripts, and suggested responses.',
    icon: Headphones
  },
  {
    title: 'Continuous learning',
    detail: 'Feedback loops improve intent detection and tone automatically across every channel.',
    icon: Sparkles
  }
]

const Chat = () => {
  return (
    <PageLayout
      eyebrow='Conversational AI'
      title='Engage every customer with intelligent chat'
      description='QuickAI Chat powers omnichannel assistants that handle support, sales, and onboarding with human-level fluency and enterprise-grade governance.'
      actions={
        <>
          <Link
            to='/ai'
            className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
          >
            Launch console
          </Link>
          <a
            href='#assistants'
            className='rounded-full border border-indigo-200 px-5 py-2 text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50'
          >
            Explore use cases
          </a>
        </>
      }
    >
      <section id='assistants' className='grid gap-6 md:grid-cols-2'>
        {assistants.map((assistant) => (
          <article
            key={assistant.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <assistant.icon className='h-10 w-10 text-indigo-500' />
            <h2 className='mt-5 text-xl font-semibold'>{assistant.title}</h2>
            <p className='mt-3 text-sm text-gray-600'>{assistant.description}</p>
          </article>
        ))}
      </section>

      <section className='mt-16 rounded-3xl border border-indigo-100 bg-white p-10 shadow-sm'>
        <h2 className='flex items-center gap-2 text-2xl font-semibold md:text-3xl'>
          <MessageSquare className='h-7 w-7 text-indigo-600' /> Unified conversation hub
        </h2>
        <p className='mt-3 max-w-2xl text-sm text-gray-600'>
          Deploy once and reach users on the web, mobile, WhatsApp, Slack, and custom voice channels. Orchestrate every
          conversation from a single dashboard.
        </p>

        <div className='mt-8 grid gap-6 md:grid-cols-3'>
          {differentiators.map((item) => (
            <div key={item.title} className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
              <item.icon className='h-8 w-8 text-indigo-500' />
              <h3 className='mt-4 text-lg font-semibold text-gray-900'>{item.title}</h3>
              <p className='mt-2 text-sm text-gray-600'>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-16 grid items-center gap-8 md:grid-cols-[1fr_1.2fr]'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold md:text-3xl'>Designed for global teams</h2>
          <p className='text-sm text-gray-600'>
            QuickAI automatically detects languages, sentiment, and intent while translating replies instantly. Build
            consistent experiences across markets without stitching multiple tools together.
          </p>
          <ul className='space-y-3 text-sm text-gray-600'>
            <li>• Support for 50+ languages out of the box</li>
            <li>• Real-time tone and compliance monitoring</li>
            <li>• Channel-specific analytics and SLAs</li>
          </ul>
        </div>
        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='flex h-12 items-center justify-between rounded-2xl bg-gray-50 px-4 text-xs font-medium text-gray-500'>
            <span>#support-ticket-3042</span>
            <span>Live · 0:42</span>
          </div>
          <div className='mt-5 space-y-4 text-sm'>
            <div className='space-y-2 rounded-2xl bg-indigo-50 p-4 text-gray-700'>
              <p className='font-semibold text-indigo-700'>Customer</p>
              <p>Our deployment failed after yesterday&apos;s update. Can we roll back without downtime?</p>
            </div>
            <div className='space-y-2 rounded-2xl bg-gray-900 p-4 text-gray-100'>
              <p className='font-semibold text-indigo-200'>QuickAI Assistant</p>
              <p>
                I ran a diagnostic. Two services are on the new image. I can revert them and shunt traffic with zero
                downtime. Would you like me to proceed?
              </p>
            </div>
            <div className='flex justify-end'>
              <button className='rounded-full border border-indigo-200 px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50'>
                Approve action
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Chat

