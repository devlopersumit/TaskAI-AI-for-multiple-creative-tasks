import React from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Rocket,
  Workflow,
  ShieldCheck,
  Boxes,
  Terminal,
  GaugeCircle,
  BrainCircuit
} from 'lucide-react'
import PageLayout from '../components/PageLayout'

const features = [
  {
    title: 'Context-Aware Suggestions',
    description: 'Get relevant code completions trained on modern frameworks and your project context.',
    icon: BrainCircuit
  },
  {
    title: 'Framework Blueprints',
    description: 'Generate production-ready scaffolds for REST, GraphQL, or serverless workloads in seconds.',
    icon: Boxes
  },
  {
    title: 'Instant Refactors',
    description: 'Upgrade legacy codebases or migrate between libraries with safe, AI-assisted refactors.',
    icon: Rocket
  },
  {
    title: 'Secure by Design',
    description: 'Automatic linting, dependency scanning, and remediation suggestions built into every generation.',
    icon: ShieldCheck
  }
]

const workflows = [
  {
    title: 'Describe the task',
    detail: 'Outline the feature, bug fix, or refactor you need in natural language.',
    icon: Workflow
  },
  {
    title: 'Review generated code',
    detail: 'Compare AI suggestions side-by-side with inline tests and best-practice hints.',
    icon: Code2
  },
  {
    title: 'Deploy with confidence',
    detail: 'Commit clean diffs backed by automated checks, runtime validations, and roll-back guards.',
    icon: GaugeCircle
  }
]

const accelerators = [
  {
    title: 'Autonomous terminal agent',
    description: 'Execute shell commands in a safe sandbox to bootstrap projects or run migrations.',
    icon: Terminal
  },
  {
    title: 'Design-to-code bridge',
    description: 'Translate Figma frames into responsive React, Next.js, or Flutter components instantly.',
    icon: Boxes
  },
  {
    title: 'Live pair-programmer',
    description: 'Collaborate with an AI pair that remembers context, answers questions, and writes tests.',
    icon: BrainCircuit
  }
]

const Code = () => {
  return (
    <PageLayout
      eyebrow='AI for engineers'
      title='Build reliable software faster with QuickAI Code'
      description='Ship features, fix bugs, and modernize systems with an AI co-developer that understands your stack, style, and standards.'
      actions={
        <>
          <Link
            to='/ai'
            className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
          >
            Explore AI Workspace
          </Link>
          <a
            href='#workflow'
            className='rounded-full border border-indigo-200 px-5 py-2 text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50'
          >
            See workflow
          </a>
        </>
      }
    >
      <section className='grid gap-6 md:grid-cols-2'>
        {features.map((feature) => (
          <article
            key={feature.title}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
          >
            <feature.icon className='h-10 w-10 text-indigo-500' />
            <h2 className='mt-5 text-xl font-semibold'>{feature.title}</h2>
            <p className='mt-3 text-sm text-gray-600'>{feature.description}</p>
          </article>
        ))}
      </section>

      <section id='workflow' className='mt-16 rounded-3xl border border-indigo-100 bg-white p-10 shadow-sm'>
        <h2 className='text-2xl font-semibold text-indigo-600 md:text-3xl'>End-to-end workflow</h2>
        <p className='mt-2 max-w-2xl text-sm text-gray-600'>
          QuickAI Code integrates directly with your repositories, issue tracker, and CI/CD pipeline to take ideas from
          specification to deployment without losing momentum.
        </p>

        <div className='mt-10 grid gap-6 md:grid-cols-3'>
          {workflows.map((step, index) => (
            <div key={step.title} className='relative rounded-2xl border border-gray-200 bg-gray-50 p-6'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm'>
                <step.icon className='h-5 w-5 text-indigo-500' />
              </div>
              <p className='mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500'>
                Step {index + 1}
              </p>
              <h3 className='mt-3 text-lg font-semibold text-gray-900'>{step.title}</h3>
              <p className='mt-3 text-sm text-gray-600'>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-16 grid gap-8 md:grid-cols-3'>
        {accelerators.map((item) => (
          <div key={item.title} className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <item.icon className='h-8 w-8 text-indigo-500' />
            <h3 className='mt-4 text-lg font-semibold'>{item.title}</h3>
            <p className='mt-2 text-sm text-gray-600'>{item.description}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  )
}

export default Code

