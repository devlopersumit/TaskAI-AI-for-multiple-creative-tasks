import React from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "0",
            features: [
                "5 AI Image Generations/day",
                "3 Code Assists/day",
                "Basic Content Writing",
                "Community Support",
                "Basic Chat Access"
            ],
            popular: false,
            buttonText: "Get Started",
            bgGradient: "from-gray-50 to-gray-100"
        },
        {
            name: "Pro",
            price: "19",
            features: [
                "50 AI Image Generations/day",
                "Unlimited Code Assists",
                "Advanced Content Writing",
                "Priority Support",
                "Advanced Chat Features",
                "API Access",
                "Custom Templates"
            ],
            popular: true,
            buttonText: "Try Pro",
            bgGradient: "from-indigo-50 to-blue-50"
        },
        {
            name: "Enterprise",
            price: "49",
            features: [
                "Unlimited AI Generations",
                "Dedicated Support",
                "Custom AI Models",
                "Team Collaboration",
                "Advanced Analytics",
                "Custom Integration",
                "SLA Guarantee"
            ],
            popular: false,
            buttonText: "Contact Sales",
            bgGradient: "from-purple-50 to-indigo-50"
        }
    ];

    return (
        <div className="py-24 px-4 sm:px-20 xl:px-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
                <p className="mt-4 text-gray-500">Choose the perfect plan for your AI needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl bg-gradient-to-b ${plan.bgGradient} p-8 shadow-sm border border-gray-200 flex flex-col
                            ${plan.popular ? 'ring-2 ring-indigo-600 scale-105' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                                <span className="ml-1 text-sm font-semibold text-gray-500">/month</span>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-4 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex gap-2 items-center text-gray-600">
                                    <Check className="h-5 w-5 text-indigo-600" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold shadow-sm
                                ${plan.popular
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'}`}
                            onClick={() => navigate('/signup')}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pricing