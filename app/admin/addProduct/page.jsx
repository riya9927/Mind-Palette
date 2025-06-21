'use client'
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const page = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        content:"",
        category: "",
        author: "Riya Patel",
        authImg: "/author_img.png"
    });
    const [categories, setCategories] = useState([
        "Lifestyle", "Motivation", "Technology", "Startup"
    ]);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // Function to format content into paragraphs
    const formatContentToParagraphs = (content) => {
        // Split by double line breaks (paragraph breaks) and single line breaks
        return content
            .split('\n\n') // Split by double line breaks for paragraphs
            .map(paragraph => paragraph.trim()) // Remove extra whitespace
            .filter(paragraph => paragraph.length > 0) // Remove empty paragraphs
            .join('\n\n'); // Rejoin with consistent paragraph breaks
    };

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            try {
                const response = await axios.post('/api/categories', { 
                    name: newCategory.trim() 
                });

                if (response.data.success) {
                    setCategories([...categories, newCategory.trim()]);
                    setData(prev => ({ ...prev, category: newCategory.trim() }));
                    setNewCategory('');
                    setShowAddCategory(false);
                    toast.success('Category added successfully!');
                } else {
                    toast.error('Failed to add category');
                }
            } catch (error) {
                console.error('Error adding category:', error);
                toast.error('Error adding category');
            }
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Format the content to ensure proper paragraph structure
            const formattedContent = formatContentToParagraphs(data.content);
            
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', formattedContent); // Use formatted content
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('authImg', data.authImg);
            formData.append('image', image);
            
            const response = await axios.post('/api/blog', formData);
            
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(false);
                setData({
                    title: "",
                    description: "",
                    content:"",
                    category: "",
                    author: "Riya Patel",
                    authImg: "/author_img.png"
                });
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
            toast.error("Error submitting blog");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="relative min-h-screen h-full overflow-auto">
            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-sm"></div>
                        <div className="relative text-center bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 bg-clip-text text-transparent tracking-tight">
                                Create New Blog Post
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">Share your thoughts with the world</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className="space-y-6 sm:space-y-8">
                    {/* Upload Section */}
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    Upload Thumbnail
                                </label>
                                <label htmlFor='image' className="group/upload cursor-pointer block">
                                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors duration-300 bg-gray-50/50 hover:bg-purple-50/50">
                                        <Image 
                                            src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                                            alt="Upload preview"
                                            width={150}
                                            height={30}
                                            className="w-full h-48 sm:h-64 object-cover group-hover/upload:scale-105 transition-transform duration-300"
                                        />
                                        {!image && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center p-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover/upload:scale-110 transition-transform">
                                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-gray-600">Click to upload thumbnail</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <input 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    type='file' 
                                    id='image' 
                                    hidden 
                                    required 
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title Section */}
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    Blog Title
                                </label>
                                <input 
                                    name='title' 
                                    onChange={onChangeHandler} 
                                    value={data.title}
                                    type='text' 
                                    placeholder='Enter an engaging title...' 
                                    required 
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Blog Description
                                </label>
                                <textarea 
                                    name='description' 
                                    onChange={onChangeHandler} 
                                    value={data.description}
                                    placeholder='Write your amazing description here...' 
                                    rows={4}
                                    required 
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none text-sm sm:text-base sm:rows-8"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Enhanced for paragraph formatting */}
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
                                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    Blog Content
                                </label>
                                <div className="mb-2">
                                    <p className="text-xs text-gray-600">
                                        💡 Tip: Use double line breaks (press Enter twice) to create new paragraphs
                                    </p>
                                </div>
                                <textarea 
                                    name='content' 
                                    onChange={onChangeHandler} 
                                    value={data.content}
                                    placeholder={`Write your thoughtful content here...\n\nStart a new paragraph here by pressing Enter twice.\n\nEach double line break will create a new paragraph when displayed.`}
                                    rows={12}
                                    required 
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none text-sm sm:text-base leading-relaxed"
                                    style={{
                                        whiteSpace: 'pre-wrap', // Preserve line breaks in textarea
                                        lineHeight: '1.6'
                                    }}
                                />
                                {/* Live Preview */}
                                {data.content && (
                                    <div className="mt-4 p-3 bg-gray-50/50 rounded-lg border border-gray-200">
                                        <p className="text-xs font-medium text-gray-600 mb-2">Preview:</p>
                                        <div className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                                            {data.content.split('\n\n').map((paragraph, index) => (
                                                paragraph.trim() && (
                                                    <p key={index} className="mb-2 last:mb-0">
                                                        {paragraph.trim()}
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Category Section */}
                    <div className="group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                        Blog Category
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCategory(true)}
                                        className="group/btn relative overflow-hidden px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg self-start sm:self-auto"
                                    >
                                        <span className="relative z-10">+ Add Category</span>
                                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                </div>
                                
                                <select 
                                    name='category' 
                                    onChange={onChangeHandler} 
                                    value={data.category}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 text-sm sm:text-base"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button 
                            type='submit'
                            disabled={isSubmitting}
                            className="group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-sm sm:text-base">Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        <span className="text-sm sm:text-base">Publish Blog</span>
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </div>
                </form>

                {/* Add Category Modal */}
                {showAddCategory && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl sm:rounded-2xl blur-sm"></div>
                            <div className="relative bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/50">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    Add New Category
                                </h3>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Enter category name..."
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 mb-4 sm:mb-6 text-sm sm:text-base"
                                    autoFocus
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                />
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => {
                                            setShowAddCategory(false);
                                            setNewCategory('');
                                        }}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddCategory}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                                    >
                                        Add Category
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page
// 'use client'
// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const page = () => {
//     const [image, setImage] = useState(false);
//     const [data, setData] = useState({
//         title: "",
//         description: "",
//         content:"",
//         category: "",
//         author: "Riya Patel",
//         authImg: "/author_img.png"
//     });
//     const [categories, setCategories] = useState([
//         "Lifestyle", "Motivation", "Technology", "Startup"
//     ]);
//     const [showAddCategory, setShowAddCategory] = useState(false);
//     const [newCategory, setNewCategory] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data => ({ ...data, [name]: value }));
//         console.log(data);
//     }

//     const handleAddCategory = async () => {
//         if (newCategory.trim()) {
//             try {
//                 const response = await axios.post('/api/categories', { 
//                     name: newCategory.trim() 
//                 });

//                 if (response.data.success) {
//                     setCategories([...categories, newCategory.trim()]);
//                     setData(prev => ({ ...prev, category: newCategory.trim() }));
//                     setNewCategory('');
//                     setShowAddCategory(false);
//                     toast.success('Category added successfully!');
//                 } else {
//                     toast.error('Failed to add category');
//                 }
//             } catch (error) {
//                 console.error('Error adding category:', error);
//                 toast.error('Error adding category');
//             }
//         }
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         try {
//             const formData = new FormData();
//             formData.append('title', data.title);
//             formData.append('content',data.content);
//             formData.append('description', data.description);
//             formData.append('category', data.category);
//             formData.append('author', data.author);
//             formData.append('authImg', data.authImg);
//             formData.append('image', image);
            
//             const response = await axios.post('/api/blog', formData);
            
//             if (response.data.success) {
//                 toast.success(response.data.msg);
//                 setImage(false);
//                 setData({
//                     title: "",
//                     description: "",
//                     content:"",
//                     category: "",
//                     author: "Riya Patel",
//                     authImg: "/author_img.png"
//                 });
//             } else {
//                 toast.error("Error");
//             }
//         } catch (error) {
//             console.error('Error submitting blog:', error);
//             toast.error("Error submitting blog");
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//     return (
//         <div className="relative min-h-screen h-full overflow-auto">
//             {/* Main Content */}
//             <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Header */}
//                 <div className="mb-6 sm:mb-8">
//                     <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl sm:rounded-2xl blur-sm"></div>
//                         <div className="relative text-center bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30">
//                             <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 bg-clip-text text-transparent tracking-tight">
//                                 Create New Blog Post
//                             </h1>
//                             <p className="text-gray-600 mt-2 text-sm sm:text-base">Share your thoughts with the world</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={onSubmitHandler} className="space-y-6 sm:space-y-8">
//                     {/* Upload Section */}
//                     <div className="group">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
//                                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                                     Upload Thumbnail
//                                 </label>
//                                 <label htmlFor='image' className="group/upload cursor-pointer block">
//                                     <div className="relative overflow-hidden rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors duration-300 bg-gray-50/50 hover:bg-purple-50/50">
//                                         <Image 
//                                             src={!image ? assets.upload_area : URL.createObjectURL(image)} 
//                                             alt="Upload preview"
//                                             width={150}
//                                             height={30}
//                                             className="w-full h-48 sm:h-64 object-cover group-hover/upload:scale-105 transition-transform duration-300"
//                                         />
//                                         {!image && (
//                                             <div className="absolute inset-0 flex items-center justify-center">
//                                                 <div className="text-center p-4">
//                                                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover/upload:scale-110 transition-transform">
//                                                         <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                                         </svg>
//                                                     </div>
//                                                     <p className="text-xs sm:text-sm text-gray-600">Click to upload thumbnail</p>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </label>
//                                 <input 
//                                     onChange={(e) => setImage(e.target.files[0])} 
//                                     type='file' 
//                                     id='image' 
//                                     hidden 
//                                     required 
//                                     accept="image/*"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Title Section */}
//                     <div className="group">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
//                                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                     Blog Title
//                                 </label>
//                                 <input 
//                                     name='title' 
//                                     onChange={onChangeHandler} 
//                                     value={data.title}
//                                     type='text' 
//                                     placeholder='Enter an engaging title...' 
//                                     required 
//                                     className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 text-sm sm:text-base"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Description Section */}
//                     <div className="group">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
//                                     <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                                     Blog Description
//                                 </label>
//                                 <textarea 
//                                     name='description' 
//                                     onChange={onChangeHandler} 
//                                     value={data.description}
//                                     placeholder='Write your amazing description here...' 
//                                     rows={4}
//                                     required 
//                                     className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none text-sm sm:text-base sm:rows-8"
//                                 />
//                             </div>
//                         </div>
//                     </div>


//                     <div className="group">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
//                                 <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
//                                     <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                                     Blog Content
//                                 </label>
//                                 <textarea 
//                                     name='content' 
//                                     onChange={onChangeHandler} 
//                                     value={data.content}
//                                     placeholder='Write your thoughful content here...' 
//                                     rows={10}
//                                     required 
//                                     className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none text-sm sm:text-base sm:rows-8"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Category Section */}
//                     <div className="group">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                             <div className="relative bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 hover:bg-white/60 hover:border-white/50 transition-all duration-300">
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
//                                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                                         <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                                         Blog Category
//                                     </label>
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowAddCategory(true)}
//                                         className="group/btn relative overflow-hidden px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg self-start sm:self-auto"
//                                     >
//                                         <span className="relative z-10">+ Add Category</span>
//                                         <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
//                                     </button>
//                                 </div>
                                
//                                 <select 
//                                     name='category' 
//                                     onChange={onChangeHandler} 
//                                     value={data.category}
//                                     className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-800 text-sm sm:text-base"
//                                 >
//                                     <option value="">Select category</option>
//                                     {categories.map((category, index) => (
//                                         <option key={index} value={category}>{category}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-center pt-4">
//                         <button 
//                             type='submit'
//                             disabled={isSubmitting}
//                             className="group relative overflow-hidden w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                         >
//                             <span className="relative z-10 flex items-center justify-center gap-2">
//                                 {isSubmitting ? (
//                                     <>
//                                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                                         <span className="text-sm sm:text-base">Publishing...</span>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                                         </svg>
//                                         <span className="text-sm sm:text-base">Publish Blog</span>
//                                     </>
//                                 )}
//                             </span>
//                             <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                         </button>
//                     </div>
//                 </form>

//                 {/* Add Category Modal */}
//                 {showAddCategory && (
//                     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                         <div className="relative w-full max-w-md">
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl sm:rounded-2xl blur-sm"></div>
//                             <div className="relative bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/50">
//                                 <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                                     <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
//                                     Add New Category
//                                 </h3>
//                                 <input
//                                     type="text"
//                                     value={newCategory}
//                                     onChange={(e) => setNewCategory(e.target.value)}
//                                     placeholder="Enter category name..."
//                                     className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/70 backdrop-blur-sm border border-white/30 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 mb-4 sm:mb-6 text-sm sm:text-base"
//                                     autoFocus
//                                     onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
//                                 />
//                                 <div className="flex flex-col sm:flex-row gap-3">
//                                     <button
//                                         onClick={() => {
//                                             setShowAddCategory(false);
//                                             setNewCategory('');
//                                         }}
//                                         className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleAddCategory}
//                                         className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
//                                     >
//                                         Add Category
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default page
// 'use client'
// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'

// const page = () => {
//     const [image, setImage] = useState(false);
//     const [data, setData] = useState({
//         title: "",
//         description: "",
//         category: "Startup",
//         author: "Riya Patel",
//         authImg: "/author_img.png"
//     })
//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data => ({ ...data, [name]: value }));
//         console.log(data);

//     }
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('description', data.description);
//         formData.append('category', data.category);
//         formData.append('author', data.author);
//         formData.append('authImg', data.authImg);
//         formData.append('image', image);
//         const respone = await axios.post('/api/blog', formData);
//         if (respone.data.success) {
//             toast.success(respone.data.msg);
//             setImage(false);
//             setData({
//                 title: "",
//                 description: "",
//                 category: "Startup",
//                 author: "Riya Patel",
//                 authImg: "/author_img.png"
//             })
//         } else {
//             toast.error("Error");
//         }
//     }
//     return (
//         <>
//             <form onSubmit={onSubmitHandler}>
//                 <p>Upload thumbnail</p>
//                 <label htmlFor='image'>
//                     <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} />
//                 </label>
//                 <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
//                 <p>Blog title</p>
//                 <input name='title' onChange={onChangeHandler} value={data.title} type='text' placeholder='Type here' required />
//                 <p>Blog description</p>
//                 <textarea name='description' onChange={onChangeHandler} value={data.description} type='text' placeholder='write content here' rows={8} required />
//                 <p>Blog category</p>
//                 <select name='category' onChange={onChangeHandler} value={data.category}>
//                     <option value="">Select category</option>
//                     <option value="Lifestyle">Lifestyle</option>
//                     <option value="Motivation">Motivation</option>
//                     <option value="Technology">Technology</option>
//                     <option value="Startup">Startup</option>
//                 </select>
//                 <br />
//                 <button type='submit'>Add</button>
//             </form>
//         </>
//     )
// }

// export default page
