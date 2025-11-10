import React, { useState } from 'react'
import AIModuleLayout from '../components/AIModuleLayout'
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react'

const criteria = [
  { label: 'Clarity & formatting', hint: 'Is the layout easy to scan with clear sections?' },
  { label: 'Achievements & metrics', hint: 'Do bullets emphasise outcomes with numbers?' },
  { label: 'Skills alignment', hint: 'Does experience match the target role keywords?' },
  { label: 'Tone & grammar', hint: 'Are verbs strong and consistent? Any typos?' }
]

const ReviewResume = () => {
  const [resumeNotes, setResumeNotes] = useState('')
  const [report, setReport] = useState(null)

  const handleAnalyse = () => {
    setReport({
      highlights: [
        'Strong project leadership with measurable results.',
        'Clear mention of cross-functional collaboration.'
      ],
      improvements: [
        'Add outcomes for the latest role to show impact.',
        'Include relevant tools/tech in the skills section.'
      ]
    })
  }

  return (
    <AIModuleLayout
      badge='Career tools'
      title='Resume reviewer'
      description='Upload your resume or paste key points. TaskAI highlights strengths and offers tangible suggestions to refine it.'
      sidebar={
        <div className='space-y-4 text-xs text-gray-600'>
          <div>
            <h3 className='text-sm font-semibold text-gray-900'>Before you run analysis</h3>
            <ul className='mt-3 space-y-2'>
              <li>• Target a specific role or industry for better guidance.</li>
              <li>• Mention the top three skills you want to highlight.</li>
              <li>• Keep the resume to two pages for best readability.</li>
            </ul>
          </div>
          <div className='rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4'>
            Pro tip: upload multiple versions to compare feedback on tailored resumes for each job application.
          </div>
        </div>
      }
      info={
        <div className='text-sm text-gray-600'>
          All analyses stay private to your workspace. We never use your resume content to train models.
        </div>
      }
    >
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Upload resume</h2>
        <div className='mt-4 grid gap-6 lg:grid-cols-[1.2fr_1fr]'>
          <label className='flex h-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center transition hover:border-indigo-300 hover:bg-white'>
            <Upload className='h-8 w-8 text-indigo-500' />
            <span className='mt-4 text-sm font-semibold text-gray-900'>Drop PDF or DOCX</span>
            <span className='mt-2 text-xs text-gray-500'>Max 5MB · Supports .pdf, .docx</span>
            <input type='file' accept='.pdf,.docx' className='hidden' />
          </label>
          <div>
            <label className='text-sm font-medium text-gray-700' htmlFor='resume-notes'>
              Notes for the reviewer (optional)
            </label>
            <textarea
              id='resume-notes'
              value={resumeNotes}
              onChange={(event) => setResumeNotes(event.target.value)}
              rows={6}
              placeholder='e.g. Applying for Product Designer role. Focus feedback on leadership experience.'
              className='mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            />
          </div>
        </div>
        <button
          type='button'
          className='mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500'
          onClick={handleAnalyse}
        >
          Analyse resume
        </button>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Checklist</h2>
        <ul className='mt-4 space-y-3 text-sm text-gray-700'>
          {criteria.map((item) => (
            <li key={item.label} className='flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3'>
              <CheckCircle2 className='mt-0.5 h-4 w-4 text-indigo-500' />
              <div>
                <p className='font-semibold text-gray-900'>{item.label}</p>
                <p className='text-xs text-gray-500'>{item.hint}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Feedback</h2>
          <p className='text-xs text-gray-500'>We highlight what works well and what to improve.</p>
        </div>
        {!report ? (
          <p className='mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500'>
            Upload your resume and click “Analyse” to generate personalised feedback.
          </p>
        ) : (
          <div className='mt-4 grid gap-4 md:grid-cols-2'>
            <div className='rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 text-sm text-emerald-700'>
              <h3 className='flex items-center gap-2 text-base font-semibold text-emerald-800'>
                <CheckCircle2 className='h-4 w-4' />
                Highlights
              </h3>
              <ul className='mt-3 space-y-2'>
                {report.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className='rounded-2xl border border-orange-100 bg-orange-50/80 p-5 text-sm text-orange-700'>
              <h3 className='flex items-center gap-2 text-base font-semibold text-orange-800'>
                <AlertCircle className='h-4 w-4' />
                Opportunities
              </h3>
              <ul className='mt-3 space-y-2'>
                {report.improvements.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </AIModuleLayout>
  )
}

export default ReviewResume
