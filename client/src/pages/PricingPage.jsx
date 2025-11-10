import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Pricing from '../components/Pricing'

const faqs = [
  {
    question: 'Can I try QuickAI before upgrading?',
    answer: 'Yes. Every workspace starts on the Free plan with access to core AI tools. Upgrade when you need higher limits or advanced governance.'
  },
  {
    question: 'Do you offer annual billing?',
    answer: 'We provide discounted annual plans across Pro and Enterprise tiers. Contact sales for tailored agreements or procurement documentation.'
  },
  {
    question: 'How does usage metering work?',
    answer: 'Each plan includes monthly credits shared across your workspace. Additional usage auto-scales at transparent overage rates with alerts.'
  },
  {
    question: 'Is my data secure with QuickAI?',
    answer: 'Absolutely. We encrypt data in transit and at rest, never train on your private content, and support region-specific data residency.'
  }
]

const PricingPage = () => {
  return (
    <PageLayout
      eyebrow='Plans & billing'
      title='Flexible pricing for teams of every size'
      description='Start for free, then scale with collaboration, compliance, and performance features when you need them.'
      actions={
        <>
          <Link
            to='/signup'
            className='rounded-full bg-indigo-600 px-5 py-2 text-white shadow-sm transition hover:bg-indigo-500'
          >
            Create workspace
          </Link>
          <a
            href='mailto:sales@quickai.app'
            className='rounded-full border border-indigo-200 px-5 py-2 text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50'
          >
            Talk to sales
          </a>
        </>
      }
      contentClassName='space-y-16'
    >
      <section className='rounded-3xl border border-gray-200 bg-white py-10 shadow-sm'>
        <Pricing showHeading={false} className='px-0 sm:px-0 xl:px-0' />
      </section>

      <section className='grid gap-10 md:grid-cols-[1fr_1.1fr]'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold md:text-3xl'>Enterprise-grade from day one</h2>
          <p className='text-sm text-gray-600'>
            The Enterprise plan unlocks dedicated support, custom model hosting, and advanced compliance tooling. We
            also offer private cloud and on-premise deployments for regulated industries.
          </p>
          <ul className='space-y-3 text-sm text-gray-600'>
            <li>• Dedicated success manager & solution architect</li>
            <li>• BYOK (bring your own key) and customer-managed keys</li>
            <li>• Custom security reviews and legal agreements</li>
          </ul>
        </div>
        <div className='rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm'>
          <h3 className='text-lg font-semibold text-indigo-600'>Compare plan highlights</h3>
          <div className='mt-5 grid gap-4 text-sm text-gray-600'>
            <div className='flex justify-between rounded-2xl bg-gray-50 p-4'>
              <span>Generations / month</span>
              <span>150 · 1,500 · Unlimited</span>
            </div>
            <div className='flex justify-between rounded-2xl bg-gray-50 p-4'>
              <span>User seats included</span>
              <span>1 · 10 · Unlimited</span>
            </div>
            <div className='flex justify-between rounded-2xl bg-gray-50 p-4'>
              <span>Governance & audit trails</span>
              <span>Basic · Advanced · Custom</span>
            </div>
            <div className='flex justify-between rounded-2xl bg-gray-50 p-4'>
              <span>Support response time</span>
              <span>Community · 24 hrs · 2 hrs</span>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-10 shadow-sm'>
        <h2 className='text-2xl font-semibold md:text-3xl'>Frequently asked questions</h2>
        <div className='mt-6 space-y-6'>
          {faqs.map((faq) => (
            <div key={faq.question} className='rounded-2xl border border-gray-200 bg-gray-50 p-6'>
              <h3 className='text-lg font-semibold text-gray-900'>{faq.question}</h3>
              <p className='mt-2 text-sm text-gray-600'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

export default PricingPage

