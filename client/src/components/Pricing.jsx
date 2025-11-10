import React from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Pricing = ({
    showHeading = true,
    className = '',
    heading = {
        title: 'Simple, Transparent Pricing',
        description: 'Choose the perfect plan for your AI needs'
    }
}) => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "0",
            tagline: "Test-drive TaskAI with two core tools to spark ideas.",
            features: [
                "Generate 3 images per day with the basic model",
                "Create or refine 2 blog outlines each day"
            ],
            popular: false,
            buttonText: "Start for free",
        },
        {
            name: "Pro",
            price: "20",
            tagline: "Unlock the full TaskAI toolkit for serious builders.",
            features: [
                "Unlimited image generation with HD upscaling",
                "Blog, article, and copywriting workflows",
                "Background and object remover with exports",
                "Code generation & reusable prompt library",
                "Team workspaces, version history, and priority support"
            ],
            popular: true,
            buttonText: "Upgrade to Pro",
        }
    ];

    return (
        <section
            id='pricing'
            className={`px-4 sm:px-20 xl:px-32 ${showHeading ? 'py-24' : ''} ${className}`}
        >
            {showHeading && (
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{heading.title}</h2>
                    <p className="mt-4 text-gray-500">{heading.description}</p>
                </div>
            )}

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                {plans.map((plan, index) => {
                    const isPopular = plan.popular;
                    return (
                        <div
                            key={index}
                            className={`relative mx-auto flex w-full max-w-sm flex-col rounded-2xl border bg-white p-8 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg ${isPopular ? 'border-indigo-500 shadow-indigo-100' : 'border-gray-200'
                                }`}
                        >
                            {isPopular && (
                                <div className="absolute right-6 top-6 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                                    Most loved
                                </div>
                            )}

                            <div className='flex h-full flex-col'>
                                <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${isPopular ? 'text-indigo-500' : 'text-gray-500'}`}>
                                    {plan.name}
                                </span>
                                <div className="mt-6 flex items-baseline gap-2">
                                    <span className='text-4xl font-semibold text-gray-900'>${plan.price}</span>
                                    <span className='text-sm font-medium text-gray-500'>/month</span>
                                </div>
                                <p className='mt-4 text-sm text-gray-500'>{plan.tagline}</p>

                                <ul className="mt-8 flex flex-1 flex-col gap-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className='flex items-start gap-3 text-sm leading-relaxed text-gray-600'>
                                            <span className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full ${isPopular ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                                <Check className="h-3.5 w-3.5" />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${isPopular
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                                    onClick={() => navigate('/signup')}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Pricing