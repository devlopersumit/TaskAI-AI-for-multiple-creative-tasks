import React, { useState } from 'react'
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { UserButton, useUser, useClerk } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
    Sparkles,
    SquarePen,
    Hash,
    Image as ImageIcon,
    Eraser,
    Scissors,
    FileText,
    Users,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const sidebarTools = [
        { name: 'Dashboard', path: '/ai', icon: Sparkles },
        { name: 'Write Article', path: '/ai/write-article', icon: SquarePen },
        { name: 'Blog Titles', path: '/ai/blog-titles', icon: Hash },
        { name: 'Generate Images', path: '/ai/generate-images', icon: ImageIcon },
        { name: 'Remove Background', path: '/ai/remove-background', icon: Eraser },
        { name: 'Remove Object', path: '/ai/remove-object', icon: Scissors },
        { name: 'Review Resume', path: '/ai/review-resume', icon: FileText },
        { name: 'Community', path: '/ai/community', icon: Users },
    ];

    return (
        <div className='flex min-h-screen flex-col bg-gray-50'>
            <Navbar />

            <div className='flex flex-1 pt-[73px]'>
                {user && (
                    <aside
                        className={`fixed left-0 top-[73px] z-40 h-[calc(100vh-73px)] border-r border-gray-200 bg-white transition-all duration-300
                        ${isSidebarOpen ? 'w-64' : 'w-16'}`}
                    >
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className='absolute -right-3 top-4 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm'
                        >
                            {isSidebarOpen ?
                                <ChevronLeft className='h-4 w-4 text-gray-600' /> :
                                <ChevronRight className='h-4 w-4 text-gray-600' />
                            }
                        </button>

                        <div className='flex h-full flex-col overflow-hidden'>
                            <nav className='flex-1 space-y-1 overflow-y-auto px-3 py-6'>
                                {sidebarTools.map((tool) => {
                                    const isActive = location.pathname === tool.path;
                                    return (
                                        <Link
                                            key={tool.path}
                                            to={tool.path}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                                }`}
                                        >
                                            <tool.icon className='h-5 w-5 flex-shrink-0' />
                                            {isSidebarOpen && <span className='font-medium'>{tool.name}</span>}
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className='border-t border-gray-200 px-3 py-4'>
                                <div className='flex items-center gap-3'>
                                    <UserButton
                                        afterSignOutUrl='/'
                                        appearance={{ elements: { rootBox: 'scale-90' } }}
                                    />
                                    {isSidebarOpen && user && (
                                        <div className='min-w-0 flex-1'>
                                            <p className='truncate text-sm font-semibold text-gray-900'>{user.fullName}</p>
                                            <p className='truncate text-xs text-gray-500'>{user.primaryEmailAddress?.emailAddress}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                <main className={`flex-1 transition-all duration-300 ${user ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'}`}>
                    <div className='min-h-[calc(100vh-73px)] overflow-y-auto bg-gray-50 pt-6'>
                        {isLoaded ? (
                            user ? (
                                <Outlet />
                            ) : (
                                <div className='flex h-full flex-col items-center justify-center gap-6 px-6 text-center text-gray-600'>
                                    <div className='max-w-md space-y-3'>
                                        <h2 className='text-2xl font-semibold text-gray-900'>Sign in to continue</h2>
                                        <p className='text-sm'>
                                            Access the TaskAI workspace to create content, images, and more. You can sign in or create
                                            a free account in seconds.
                                        </p>
                                    </div>
                                    <div className='flex flex-wrap items-center justify-center gap-3 text-sm'>
                                        <button
                                            onClick={openSignIn}
                                            className='rounded-full bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-500'
                                        >
                                            Sign in / Sign up
                                        </button>
                                        <button
                                            onClick={() => navigate('/')}
                                            className='rounded-full border border-gray-300 px-6 py-2.5 font-semibold text-gray-700 transition hover:border-indigo-200 hover:text-indigo-600'
                                        >
                                            Back to home
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : null}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}

export default Layout
