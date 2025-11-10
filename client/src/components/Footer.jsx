import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const Footer = () => {
    const footerLinks = [
        { name: 'Terms', path: '/terms' },
        { name: 'Privacy', path: '/privacy' },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 py-4">
            <div className="mx-auto px-4 sm:px-20 xl:px-32">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#5044E5]" />
                        <span className="text-sm text-gray-600">
                            © {new Date().getFullYear()} TaskAI
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm text-gray-500 hover:text-[#5044E5]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer