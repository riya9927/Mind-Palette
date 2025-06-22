'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const toggleMobile = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleMobile}
            ></div>
            
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50 
                ${isCollapsed ? 'w-20' : 'w-72'} 
                lg:w-72 
                bg-white dark:bg-gray-800 
                border-r border-gray-300 dark:border-gray-600
                shadow-xl lg:shadow-none
                transition-all duration-300 ease-in-out
                transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                flex flex-col
            `}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-600">
                    <Link href='/admin' className="flex items-center gap-3 group">
                        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-xl group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
                            <Image 
                                src={assets.logo} 
                                alt='Logo' 
                                className="h-8 w-8"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">BlogPanel</span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Admin Dashboard</span>
                            </div>
                        )}
                    </Link>
                    
                    {/* Collapse Toggle - Hidden on mobile */}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isCollapsed ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <Link 
                        href='/admin/addProduct'
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                        <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                            <Image 
                                src={assets.add_icon} 
                                alt="Add"
                                className="w-5 h-5"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">Create Blog</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">Write new article</p>
                            </div>
                        )}
                    </Link>

                    <Link 
                        href='/admin/bloglist'
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                        <div className="flex-shrink-0 p-2 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-700 transition-colors">
                            <Image 
                                src={assets.blog_icon} 
                                alt="Blog"
                                className="w-5 h-5"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">All Blogs</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">Manage content</p>
                            </div>
                        )}
                    </Link>

                    <Link 
                        href='/admin/subscriptions'
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                        <div className="flex-shrink-0 p-2 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors">
                            <Image 
                                src={assets.email_icon} 
                                alt="Email"
                                className="w-5 h-5"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">Subscribers</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">Email list</p>
                            </div>
                        )}
                    </Link>

                    <Link 
                        href='/admin'
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                    >
                        <div className="flex-shrink-0 p-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">Settings</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">Configuration</p>
                            </div>
                        )}
                    </Link>
                </nav>

                {/* Footer */}
                {!isCollapsed && (
                    <div className="p-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">System Online</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Blog management system is active and ready for content creation.
                            </p>
                        </div>
                    </div>
                )}

                {/* Collapsed Footer */}
                {isCollapsed && (
                    <div className="p-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMobile}
            >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </>
    )
}

export default Sidebar

// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Sidebar = () => {
//     return (
//         <div className="min-h-screen w-72 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

//             {/* Content */}
//             <div className="relative z-10 flex flex-col h-full">
//                 {/* Logo Section */}
//                 <div className="p-8 border-b border-white/10">
//                     <Link href='/admin' className="block group">
//                         <div className="bg-white/10 backdrop-blur-sm rounded-1xl p-2 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
//                             <Image 
//                                 src={assets.logo} 
//                                 alt='Logo' 
//                                 className="h-14"
//                             />
//                         </div>
//                     </Link>
//                 </div>

//                 {/* Navigation Section */}
//                 <nav className="flex-1 py-8 px-6">
//                     <div className="space-y-4">
//                         <Link 
//                             href='/admin/addProduct'
//                             className="group relative block"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                                 <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
//                                     <Image 
//                                         src={assets.add_icon} 
//                                         alt="Add"
//                                         className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="font-semibold text-sm tracking-wide">Add Blogs</p>
//                                     <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Create new content</p>
//                                 </div>
//                                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                 </div>
//                             </div>
//                         </Link>

//                         <Link 
//                             href='/admin/bloglist'
//                             className="group relative block"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                                 <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
//                                     <Image 
//                                         src={assets.blog_icon} 
//                                         alt="Blog"
//                                         className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="font-semibold text-sm tracking-wide">All Blogs</p>
//                                     <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Manage posts</p>
//                                 </div>
//                                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                 </div>
//                             </div>
//                         </Link>

//                         <Link 
//                             href='/admin/subscriptions'
//                             className="group relative block"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
//                                 <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
//                                     <Image 
//                                         src={assets.email_icon} 
//                                         alt="Email"
//                                         className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="font-semibold text-sm tracking-wide">Subscriptions</p>
//                                     <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Email subscribers</p>
//                                 </div>
//                                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                 </div>
//                             </div>
//                         </Link>
//                     </div>
//                 </nav>

//                 {/* Decorative Bottom Section */}
//                 <div className="p-6 border-t border-white/10">
//                     <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-sm"></div>
//                         <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
//                             <div className="flex items-center justify-center gap-2 mb-2">
//                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                                 <span className="text-xs text-white/70 font-medium tracking-wider">ADMIN PANEL</span>
//                             </div>
//                             <div className="flex justify-center gap-1">
//                                 <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
//                                 <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-100"></div>
//                                 <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-200"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Sidebar = () => {
//     return (
//         <div>
//             <Link href='/admin'>
//                 <Image src={assets.logo} alt='' />
//             </Link>
//             <div>
//                 <div>
//                     <Link href='/admin/addProduct'>
//                         <Image src={assets.add_icon} /><p>Add blogs</p>
//                     </Link>
//                     <Link href='/admin/bloglist'>
//                         <Image src={assets.blog_icon} /><p>All blogs</p>
//                     </Link>
//                     <Link href='/admin/subscriptions'>
//                         <Image src={assets.email_icon} /><p>Subscritions</p>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar
