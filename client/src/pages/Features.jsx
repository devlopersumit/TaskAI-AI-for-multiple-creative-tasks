import React from 'react'
import PageLayout from '../components/PageLayout'
import { AiToolsData } from '../assets/assets'
import { Zap, Puzzle, ServerCog, BarChart4 } from 'lucide-react'

const platformHighlights = [
  {
    icon: Zap,
    title: 'Unified workspace',
    description: 'Switch between text, image, and code generation with shared context and asset libraries.'
  },
  {
    icon: Puzzle,
    title: 'Plug-and-play integrations',
    description: 'Connect to Slack, GitHub, Notion, HubSpot, and more with ready-made automation recipes.'
  },
  {
    icon: ServerCog,
    title: 'Choice of models',
    description: 'Run on OpenAI, Anthropic, or custom fine-tuned models with easy failover policies.'
  },
  {
    icon: BarChart4,
    title: 'Operational analytics',
    description: 'Track AI usage, approvals, and impact across teams with rich dashboards and exports.'
  }
]

const Features = () => {
  return (
    <PageLayout
      eyebrow='Platform overview'
      title='Everything you need to create, automate, and scale with AI'
      description='Explore the modules that power QuickAI — purpose-built for cross-functional teams who want dependable, responsible AI capabilities.'
    >
      <section className='grid gap-6 md:grid-cols-2'>
        {platformHighlights.map((highlight) => (
          <article
            key={highlight.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <highlight.icon className='h-10 w-10 text-indigo-500' />
            <h2 className='mt-5 text-xl font-semibold'>{highlight.title}</h2>
            <p className='mt-3 text-sm text-gray-600'>{highlight.description}</p>
          </article>
        ))}
      </section>

      <section className='mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm'>
        <h2 className='text-2xl font-semibold md:text-3xl'>Signature AI tools</h2>
        <p className='mt-2 max-w-2xl text-sm text-gray-600'>
          Pair individual modules together to orchestrate entire customer journeys — from ideation through delivery and
          support.
        </p>
        <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {AiToolsData.map((tool) => (
            <article key={tool.title} className='rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm'>
              <tool.Icon className='h-10 w-10 text-indigo-500' />
              <h3 className='mt-5 text-lg font-semibold text-gray-900'>{tool.title}</h3>
              <p className='mt-3 text-sm text-gray-600'>{tool.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='mt-16 grid gap-8 md:grid-cols-[1.2fr_1fr]'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold md:text-3xl'>Governance and control</h2>
          <p className='text-sm text-gray-600'>
            QuickAI gives admins granular oversight with approval workflows, audit trails, and policy enforcement. Align
            AI usage with your brand and compliance requirements without slowing teams down.
          </p>
          <ul className='space-y-3 text-sm text-gray-600'>
            <li>• Role-based access, SSO, and SCIM provisioning</li>
            <li>• Prompt and response retention policies</li>
            <li>• Bias detection and toxicity filters configurable per workspace</li>
          </ul>
        </div>
        <div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-indigo-600'>Integrations snapshot</h3>
          <ul className='mt-4 space-y-3 text-sm text-gray-600'>
            <li>• Developer tools: GitHub, GitLab, Jira, Linear</li>
            <li>• Marketing stack: HubSpot, Webflow, Marketo</li>
            <li>• Support & ops: Zendesk, Intercom, Salesforce</li>
            <li>• Storage & data: Notion, Google Drive, Snowflake</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  )
}

export default Features

