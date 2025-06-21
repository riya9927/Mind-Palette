'use client'
import { use } from 'react';
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios'
import BlogContentDisplay from '@/Components/BlogContentDisplay'; // Import the new component

const page = ({ params }) => {
    // const { id } = use(params);
    const [data, setData] = useState(null);
    
    const fetchBlogData = async () => {
        const response=await axios.get('/api/blog',{
            params:{
                id:params.id
            }
        })
        setData(response.data)
    }
    
    useEffect(() => {
        fetchBlogData();
    }, [])
    
    return ( data ? 
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
                <Link href='/' className="flex items-center">
                    <Image
                        src={assets.logo}
                        alt='Logo'
                        className="h-12 w-auto"
                    />
                </Link>
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-md">
                    Get Started
                </button>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 md:px-8 py-12">
            {/* Article Header */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Hero Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                    <Image 
                        src={data.image} 
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
                        {data.title}
                    </h1>

                    {/* Author Section */}
                    <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-100">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image 
                                src={data.authImg} 
                                alt={data.author}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{data.author}</p>
                            <p className="text-sm text-gray-500">Published on {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">At a Glance</h2>
                        <BlogContentDisplay content={data.description} />
                    </div>
                    
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Deep Dive</h2>
                        <BlogContentDisplay content={data.content} />
                    </div>

                    {/* Social Share */}
                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Share this article
                        </h3>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                                <Image 
                                    src={assets.facebook_icon} 
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                    
                                />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors duration-200">
                                <Image 
                                    src={assets.twitter_icon} 
                                    alt="Twitter"
                                    width={20}
                                    height={20}
                                    
                                />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200">
                                <Image 
                                    src={assets.googleplus_icon} 
                                    alt="Google Plus"
                                    width={20}
                                    height={20}
                                    
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Back to Blog Button */}
            <div className="mt-12 text-center">
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to all articles
                </Link>
            </div>
        </main>

        <Footer />
    </div>
    :
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
        </div>
    </div>
    )
}

export default page
// 'use client'
// import { use } from 'react';
// import { assets, blog_data } from '@/Assets/assets';
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
// import Footer from '@/Components/Footer';
// import Link from 'next/link';

// const page = ({ params }) => {
//     const { id } = use(params);
//     const [data, setData] = useState(null);
//     const fetchBlogData = () => {
//         for (let i = 0; i < blog_data.length; i++) {
//             if (Number(params.id) === blog_data[i].id) {
//                 setData(blog_data[i]);
//                 console.log(blog_data[i]);
//                 break;
//             }
//         }
//     }
//     useEffect(() => {
//         fetchBlogData();
//     }, [])
//     return ( data ? <>
//     <div>
//             <div className="flex items-center justify-between px-6 md:px-12 py-6">
//                 <div className="flex items-center">
//                     <Link href='/'>
//                     <Image
//                         src={assets.logo}
//                         alt='Logo'
//                         className="h-16 w-auto"
//                     />
//                     </Link>
//                 </div>
//                 <button className="flex items-center gap-2  bg-gray-800 hover:bg-gray-900 text-yellow-100 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
//                     Get Started
//                 </button>
//             </div>
//             <div>
//                 <h1>{data.title}</h1>
//                 <Image src={data.author_img} />
//                 <p>{data.author}</p>
//             </div>
//         </div>
//         <div>
//             <Image src={data.image} />
//             <h1>Introduction:</h1>
//             <p>{data.description}</p>
//             <div>
//                 <p>Share this article in social media.</p>
//                 <div>
//                     <Image src={assets.facebook_icon} />
//                     <Image src={assets.twitter_icon} />
//                     <Image src={assets.googleplus_icon} />
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </>
//     :
//     <></>
//     )
// }

// export default page
