import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dict/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <>
            <div className="flex min-h-screen overflow-auto">

                <ToastContainer theme="dark" />
                <Sidebar />
                
                {/* Main Content Area */}
                <div className="flex-1 relative overflow-hidden">
                   

                    {/* Header */}
                    <header className="relative z-10 border-b border-white/20 bg-white/70 backdrop-blur-xl">
                        <div className="px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="group">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 bg-clip-text text-transparent tracking-tight">
                                        Admin Panel
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500 font-medium tracking-wider">ONLINE</span>
                                    </div>
                                </div>

                                {/* Profile Section */}
                                <div className="group relative">
                                    <div className="relative flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl  group-hover:scale-110 transition-transform duration-300">
                                                <Image 
                                                    src={assets.profile_icon} 
                                                    alt="Profile"
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Administrator</p>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">Online now</p>
                                        </div>
                                        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    
                    <div className="min-h-[600px]">
                                    {children}
                                </div>

                    {/* Footer */}
                    <footer className="relative z-10 border-t border-white/20 bg-white/50 backdrop-blur-xl">
                        <div className="px-8 py-4">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-4">
                                    <span>© 2025 Admin Dashboard</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
// import { assets } from "@/Assets/assets";
// import Sidebar from "@/Components/AdminComponents/Sidebar";
// import Image from "next/image";

// export default function Layout({ children }) {
//     return (
//         <>
//             <div className="flex">
//                 <Sidebar />
//                 <div>
//                     <div>
//                         <h3>Admin Panel</h3>
//                         <Image src={assets.profile_icon} />
//                     </div>
//                     {children}
//                 </div>
//             </div>
            
//         </>
//     )
// }