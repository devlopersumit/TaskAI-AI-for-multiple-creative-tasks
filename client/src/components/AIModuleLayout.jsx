import React from 'react'

const AIModuleLayout = ({
  title,
  description,
  badge,
  actions,
  sidebar,
  children,
  info,
  className = ''
}) => {
  return (
    <div className='space-y-10 pb-16 text-gray-900'>
      <section className='border-b border-gray-200 bg-white px-4 py-10 sm:px-16 xl:px-24'>
        <div className='mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='max-w-3xl'>
            {badge && (
              <span className='inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600'>
                {badge}
              </span>
            )}
            <h1 className='mt-4 text-3xl font-semibold sm:text-4xl'>{title}</h1>
            {description && <p className='mt-3 text-sm text-gray-600 sm:text-base'>{description}</p>}
          </div>
          {actions && <div className='flex flex-wrap gap-3'>{actions}</div>}
        </div>
      </section>

      <div className={`px-4 sm:px-16 xl:px-24 ${className}`}>
        <div className='mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row'>
          {sidebar && (
            <aside className='order-2 rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600 lg:order-1 lg:w-72'>
              {sidebar}
            </aside>
          )}

          <section className={`flex-1 space-y-8 ${sidebar ? 'order-1 lg:order-2' : ''}`}>{children}</section>
        </div>
      </div>

      {info && (
        <div className='px-4 sm:px-16 xl:px-24'>
          <div className='mx-auto max-w-6xl rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 text-sm text-gray-600'>
            {info}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIModuleLayout

