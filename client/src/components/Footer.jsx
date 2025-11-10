import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react'

const Footer = () => {
    const footerLinks = {
        product: [
            { name: 'Features', path: '/features' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'API', path: '/api' },
            { name: 'Documentation', path: '/docs' },
        ],
        tools: [
            { name: 'Code Generation', path: '/code' },
            { name: 'Image Creation', path: '/images' },
            { name: 'Content Writer', path: '/content' },
            { name: 'AI Chat', path: '/chat' },
        ],
        company: [
            { name: 'About', path: '/about' },
            { name: 'Blog', path: '/blog' },
            { name: 'Careers', path: '/careers' },
            { name: 'Contact', path: '/contact' },
        ],
        legal: [
            { name: 'Privacy', path: '/privacy' },
            { name: 'Terms', path: '/terms' },
            { name: 'Security', path: '/security' },
        ]
    }

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-20 xl:px-32 pt-16 pb-8">
                <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
                    {/* Company Info */}
                    <div className="col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-[#5044E5]" />
                            <span className="text-xl font-bold">TaskAI</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 max-w-xs">
                            Empowering creators with AI-driven tools for code, content, and design.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5044E5]">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5044E5]">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5044E5]">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="col-span-1">
                            <h3 className="text-gray-900 font-semibold capitalize mb-4">{title}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-600 hover:text-[#5044E5] text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-gray-400 text-sm text-center">
                        © {new Date().getFullYear()} TaskAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer