import React from 'react'
import PageLayout from '../components/PageLayout'

const sections = [
  {
    title: '1. Acceptance of terms',
    content:
      'By accessing or using TaskAI, you agree to be bound by these Terms of Service. If you are using the platform on behalf of an organization, you represent that you have authority to bind that organization.'
  },
  {
    title: '2. Account responsibilities',
    content:
      'You are responsible for maintaining the confidentiality of your credentials and all activity that occurs under your account. Notify us immediately of any unauthorized use or security incident.'
  },
  {
    title: '3. Permitted use',
    content:
      'TaskAI may be used to create, collaborate, and automate workflows in compliance with applicable law. You may not misuse the service to generate harmful, discriminatory, or unlawful content.'
  },
  {
    title: '4. Intellectual property',
    content:
      'You retain ownership of the content you create. TaskAI and its licensors retain all rights to the software, features, and branding. Use of any marks requires prior written consent.'
  },
  {
    title: '5. Service availability',
    content:
      'We strive for 99.9% uptime. Planned maintenance and emergency updates will be communicated in advance whenever possible. Credits may be provided for extended outages affecting paid plans.'
  },
  {
    title: '6. Termination',
    content:
      'We may suspend or terminate access if the Terms are violated or if usage threatens platform integrity. You may cancel your account at any time via the billing dashboard.'
  },
  {
    title: '7. Liability',
    content:
      'To the fullest extent allowed by law, TaskAI is provided “as is.” We are not liable for indirect, incidental, or consequential damages arising from your use of the service.'
  }
]

const Terms = () => {
  return (
    <PageLayout
      eyebrow='Legal'
      title='TaskAI Terms of Service'
      description='These terms outline your rights, responsibilities, and the rules that govern your use of TaskAI.'
      contentClassName='space-y-10'
    >
      {sections.map((section) => (
        <section key={section.title} className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-900 md:text-xl'>{section.title}</h2>
          <p className='mt-3 text-sm leading-relaxed text-gray-600'>{section.content}</p>
        </section>
      ))}

      <section className='rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900 md:text-xl'>Questions?</h2>
        <p className='mt-3 text-sm text-gray-600'>
          Contact us at <a href='mailto:legal@quickai.app' className='text-indigo-600 underline'>legal@quickai.app</a>{' '}
          for clarifications or to request a signed copy of these Terms.
        </p>
      </section>
    </PageLayout>
  )
}

export default Terms

