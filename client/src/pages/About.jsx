import React from 'react'
import PageLayout from '../components/PageLayout'
import { Sparkles, Users, Globe, ShieldCheck } from 'lucide-react'

const milestones = [
  {
    year: '2023',
    title: 'QuickAI is founded',
    detail: 'Former product leads and ML researchers unite around a vision to democratize everyday AI.'
  },
  {
    year: '2024',
    title: 'First enterprise rollout',
    detail: 'Scaled to 100k+ monthly users with SOC 2 compliance and multi-region data infrastructure.'
  },
  {
    year: '2025',
    title: 'Global creator network',
    detail: 'Launching community-driven templates and co-creation marketplace for teams worldwide.'
  }
]

const principles = [
  {
    icon: Sparkles,
    title: 'Human-centered AI',
    description: 'We build AI that augments creativity, respects human judgment, and stays transparent.'
  },
  {
    icon: Users,
    title: 'Inclusive collaboration',
    description: 'Our platform is built for cross-functional collaboration among marketers, engineers, and designers.'
  },
  {
    icon: ShieldCheck,
    title: 'Trust by default',
    description: 'Enterprise-grade security, privacy controls, and ethical safeguards power every workflow.'
  },
  {
    icon: Globe,
    title: 'Borderless impact',
    description: 'Supporting multilingual teams and localized experiences so innovation can flourish anywhere.'
  }
]

const About = () => {
  return (
    <PageLayout
      eyebrow='Our story'
      title='We help teams unlock the full potential of human + AI collaboration'
      description='QuickAI was created to give builders, storytellers, and innovators a unified workspace where AI feels intuitive, responsible, and empowering.'
    >
      <section className='grid gap-10 md:grid-cols-[1.1fr_1fr]'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold md:text-3xl'>Why we started QuickAI</h2>
          <p className='text-sm text-gray-600'>
            After years of leading distributed teams, we saw the same challenges repeat: endless tools, scattered
            knowledge, and workflows that slowed down the people doing the work. We set out to craft an AI platform that
            connects every part of the creative cycle, from ideas to shipping.
          </p>
          <p className='text-sm text-gray-600'>
            Today, thousands of teams trust QuickAI to write, design, code, and support their customers. We believe the
            future of work is cooperative — humans providing direction, AI amplifying outcomes.
          </p>
        </div>
        <div className='rounded-3xl border border-indigo-100 bg-white p-10 shadow-sm'>
          <h3 className='text-lg font-semibold text-indigo-600'>By the numbers</h3>
          <ul className='mt-6 space-y-4 text-sm text-gray-600'>
            <li>
              <span className='text-3xl font-semibold text-gray-900'>10k+</span> active teams building with QuickAI.
            </li>
            <li>
              <span className='text-3xl font-semibold text-gray-900'>48%</span> faster time-to-market across AI-augmented
              projects.
            </li>
            <li>
              <span className='text-3xl font-semibold text-gray-900'>25M+</span> AI creations and automations executed.
            </li>
          </ul>
        </div>
      </section>

      <section className='mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {principles.map((principle) => (
          <article
            key={principle.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <principle.icon className='h-9 w-9 text-indigo-500' />
            <h3 className='mt-4 text-lg font-semibold'>{principle.title}</h3>
            <p className='mt-2 text-sm text-gray-600'>{principle.description}</p>
          </article>
        ))}
      </section>

      <section className='mt-16 rounded-3xl border border-gray-200 bg-white p-10 shadow-sm'>
        <h2 className='text-2xl font-semibold md:text-3xl'>Milestones</h2>
        <div className='mt-8 space-y-6'>
          {milestones.map((milestone) => (
            <div key={milestone.year} className='flex flex-col gap-3 border-l-2 border-indigo-200 pl-6'>
              <span className='text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500'>{milestone.year}</span>
              <h3 className='text-lg font-semibold text-gray-900'>{milestone.title}</h3>
              <p className='text-sm text-gray-600'>{milestone.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default About

