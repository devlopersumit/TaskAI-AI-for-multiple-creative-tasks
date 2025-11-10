import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
    Sparkles,
    Code2,
    Image,
    MessageSquare,
    FileText,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useUser();

    const sidebarTools = [
        { name: 'AI Tools', path: '/ai', icon: Sparkles },
        { name: 'Code Generation', path: '/code', icon: Code2 },
        { name: 'Image Creation', path: '/images', icon: Image },
        { name: 'AI Chat', path: '/chat', icon: MessageSquare },
        { name: 'Content Writer', path: '/content', icon: FileText },
    ];

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex flex-grow mt-[73px]'>
                {/* Sidebar - Only shown for logged in users */}
                {user && (
                    <aside
                        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r border-gray-200 transition-all duration-300 z-40
                            ${isSidebarOpen ? 'w-64' : 'w-16'}`}
                    >
                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className='absolute -right-3 top-4 p-1.5 rounded-full bg-white border border-gray-200 shadow-sm'
                        >
                            {isSidebarOpen ?
                                <ChevronLeft className='w-4 h-4 text-gray-600' /> :
                                <ChevronRight className='w-4 h-4 text-gray-600' />
                            }
                        </button>

                        {/* Sidebar Content */}
                        <div className='p-4'>
                            <div className='space-y-2'>
                                {sidebarTools.map((tool) => (
                                    <Link
                                        key={tool.path}
                                        to={tool.path}
                                        className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#5044E5] transition-colors'
                                    >
                                        <tool.icon className='w-5 h-5' />
                                        {isSidebarOpen && (
                                            <span className='text-sm font-medium'>
                                                {tool.name}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className={`flex-grow ${user ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'} transition-all duration-300`}>
                    <div className='p-6'>
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}

export default Layout
