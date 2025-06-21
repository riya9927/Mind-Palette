'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const respone = await axios.get('/api/email');
            setEmails(respone.data.emails)
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteEmail = async (mongoId) => {
        const response = await axios.delete('/api/email', {
            params: {
                id: mongoId
            }
        })
        if (response.data.success) {
            toast.success(response.data.msg);
            fetchEmails();
        }
        else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchEmails()
    }, [])

    return (
        <div className="min-h-screen  p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-3">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            All Subscriptions
                        </h1>
                    </div>


                    {/* Stats */}
                    <div className="ml-8 mt-4 flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Total: {emails.length} subscribers</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Last updated: Just now</span>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Subscriber Database</h3>
                                    <p className="text-sm text-gray-600">Manage and monitor email subscriptions</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={fetchEmails}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh
                                </button>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-gray-600 font-medium">Loading subscriptions...</span>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-slate-100">
                                    <tr>
                                        <th scope='col' className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                                <span>Email Subscription</span>
                                            </div>
                                        </th>
                                        <th scope='col' className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Date</span>
                                            </div>
                                        </th>
                                        <th scope='col' className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                                <span>Action</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {emails.length > 0 ? (
                                        emails.map((item, index) => (
                                            <SubsTableItem
                                                key={item._id || index}
                                                mongoId={item._id}
                                                email={item.email}
                                                date={item.date}
                                                deleteEmail={deleteEmail}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center space-y-3">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-center">
                                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No subscriptions found</h3>
                                                        <p className="text-gray-500">Get started by adding your first subscriber</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Table Footer */}
                    {!loading && emails.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">Total:</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        {emails.length} subscribers
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50" disabled>
                                        Previous
                                    </button>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md font-medium">1</span>
                                    <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50" disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page

// 'use client'
// import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const page = () => {
//     const [emails,setEmails]=useState([]);
//     const fetchEmails=async()=>{
//         const respone=await axios.get('/api/email');
//         setEmails(respone.data.emails)
//     }
//     useEffect(()=>{
//         fetchEmails()
//     },[])
//   return (
//     <div>
//       <h1>All Subscription</h1>
//       <div>
//         <table>
//             <thead>
//                 <tr>
//                     <th scope='col'>Email Subscription</th>
//                     <th scope='col'>Date</th>
//                     <th scope='col'>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     emails.map((item,index)=>{
//                         return <SubsTableItem key={index} mongoId={item._id} email={item.email} date={item.date} />
//                     })
//                 }
//             </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default page
