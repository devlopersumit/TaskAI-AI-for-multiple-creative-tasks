import React from 'react'
import PageLayout from '../components/PageLayout'

const policies = [
  {
    title: '1. Information we collect',
    items: [
      'Account data you provide such as name, email, and workspace details.',
      'Usage data including prompts, activity logs, device and browser information.',
      'Optional integrations data when you connect third-party tools (e.g., Slack, GitHub).'
    ]
  },
  {
    title: '2. How we use data',
    items: [
      'To operate and improve TaskAI, including personalization and feature development.',
      'To provide support, security alerts, and product updates relevant to your workspace.',
      'To generate aggregate insights that do not identify you or your organization.'
    ]
  },
  {
    title: '3. Data retention & deletion',
    items: [
      'Workspace owners control retention settings for prompts, generations, and audit logs.',
      'Deleted data is removed from active systems within 30 days and from backups within 90 days.',
      'You may request expedited deletion or export by contacting privacy@quickai.app.'
    ]
  },
  {
    title: '4. Security',
    items: [
      'Encryption in transit (TLS 1.2+) and at rest (AES-256) across all services.',
      'Role-based access control, SSO, and SCIM to manage user permissions.',
      'Regular penetration testing, vulnerability scanning, and compliance audits.'
    ]
  },
  {
    title: '5. Your choices',
    items: [
      'Manage notification preferences and connected integrations from your account settings.',
      'Opt out of marketing communications at any time via the unsubscribe link.',
      'Exercise data subject rights by emailing privacy@quickai.app.'
    ]
  }
]

const Privacy = () => {
  return (
    <PageLayout
      eyebrow='Privacy policy'
      title='Protecting your data and trust'
      description='We are committed to transparency, security, and giving you control over how TaskAI handles your information.'
      contentClassName='space-y-10'
    >
      {policies.map((policy) => (
        <section key={policy.title} className='rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-900 md:text-xl'>{policy.title}</h2>
          <ul className='mt-4 space-y-3 text-sm text-gray-600'>
            {policy.items.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className='rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900 md:text-xl'>International transfers</h2>
        <p className='mt-3 text-sm text-gray-600'>
          TaskAI may process data in the United States and the European Union. We rely on Standard Contractual
          Clauses, Data Processing Agreements, and regional hosting to maintain compliance.
        </p>
      </section>
    </PageLayout>
  )
}

export default Privacy

