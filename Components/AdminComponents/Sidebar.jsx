import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className="min-h-screen w-72 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Logo Section */}
                <div className="p-8 border-b border-white/10">
                    <Link href='/admin' className="block group">
                        <div className="bg-white/10 backdrop-blur-sm rounded-1xl p-2 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
                            <Image 
                                src={assets.logo} 
                                alt='Logo' 
                                className="h-14"
                            />
                        </div>
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 py-8 px-6">
                    <div className="space-y-4">
                        <Link 
                            href='/admin/addProduct'
                            className="group relative block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                                    <Image 
                                        src={assets.add_icon} 
                                        alt="Add"
                                        className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm tracking-wide">Add Blogs</p>
                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Create new content</p>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </Link>

                        <Link 
                            href='/admin/bloglist'
                            className="group relative block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                                    <Image 
                                        src={assets.blog_icon} 
                                        alt="Blog"
                                        className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm tracking-wide">All Blogs</p>
                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Manage posts</p>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </Link>

                        <Link 
                            href='/admin/subscriptions'
                            className="group relative block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative flex items-center gap-4 px-6 py-4 text-white/80 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <div className="flex-shrink-0 p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors duration-300">
                                    <Image 
                                        src={assets.email_icon} 
                                        alt="Email"
                                        className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm tracking-wide">Subscriptions</p>
                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Email subscribers</p>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </nav>

                {/* Decorative Bottom Section */}
                <div className="p-6 border-t border-white/10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-sm"></div>
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-white/70 font-medium tracking-wider">ADMIN PANEL</span>
                            </div>
                            <div className="flex justify-center gap-1">
                                <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-100"></div>
                                <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse delay-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

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
