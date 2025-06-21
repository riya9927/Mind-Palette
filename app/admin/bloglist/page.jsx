'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/blog');
            setBlogs(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (mongoId) => {
        const response = await axios.delete('/api/blog', {
            params: {
                id: mongoId
            }
        })
        toast.success(response.data.msg);
        fetchBlogs();
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                All Blogs
                            </h1>
                            <p className="text-gray-600">
                                Manage and organize your blog posts
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                                <span className="text-sm font-medium text-gray-700">
                                    Total: {blogs.length} blogs
                                </span>
                            </div>
                            <Link href='/admin/addProduct'>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                                    Add New Blog
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                                <span className="text-gray-600">Loading blogs...</span>
                            </div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                            <p className="text-gray-500 mb-6">Get started by creating your first blog post.</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                                Create Blog
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Author
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Blog Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {blogs.map((item, index) => {
                                        return (
                                            <BlogTableItem
                                                key={item._id || index}
                                                mongoId={item._id}
                                                title={item.title}
                                                author={item.author}
                                                authImg={item.authImg}
                                                date={item.date}
                                                deleteBlog={deleteBlog}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                {blogs.length > 0 && (
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                        <div>
                            Showing {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page

// 'use client'
// import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const [blogs,setBlogs]=useState([]);
//     const fetchBlogs = async () => {
//         const response = await axios.get('/api/blog');
//         setBlogs(response.data);
//         console.log(response.data);
//     };
//     useEffect(() => {
//         fetchBlogs();
//     }, [])
//   return (
//     <div>
//       <h1>All Blogs</h1>
//       <div>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Author name</th>
//                     <th>Blog Title</th>
//                     <th>Date</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                 blogs.map((item,index)=>{
//                     return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authImg={item.authImg} date={item.date}/>
//                 })
//                 }
//             </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default page
