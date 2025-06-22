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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">
                            Create New Blog Post
                        </h1>
                        <p className="text-slate-600">Share your thoughts with the world</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className="space-y-6">
                    {/* Upload Section */}
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <label className="block text-sm font-semibold text-slate-700 mb-4">
                            Upload Thumbnail
                        </label>
                        <label htmlFor='image' className="cursor-pointer block">
                            <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-blue-300 hover:border-indigo-400 transition-colors duration-300 bg-blue-50 hover:bg-indigo-50">
                                <Image 
                                    src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                                    alt="Upload preview"
                                    width={150}
                                    height={30}
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                {!image && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-4">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-slate-600">Click to upload thumbnail</p>
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

                    {/* Title Section */}
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <label className="block text-sm font-semibold text-slate-700 mb-4">
                            Blog Title
                        </label>
                        <input 
                            name='title' 
                            onChange={onChangeHandler} 
                            value={data.title}
                            type='text' 
                            placeholder='Enter an engaging title...' 
                            required 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
                        />
                    </div>

                    {/* Description Section */}
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <label className="block text-sm font-semibold text-slate-700 mb-4">
                            Blog Description
                        </label>
                        <textarea 
                            name='description' 
                            onChange={onChangeHandler} 
                            value={data.description}
                            placeholder='Write your amazing description here...' 
                            rows={4}
                            required 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500 resize-none"
                        />
                    </div>

                    {/* Content Section - Enhanced for paragraph formatting */}
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <label className="block text-sm font-semibold text-slate-700 mb-4">
                            Blog Content
                        </label>
                        <div className="mb-3">
                            <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-200">
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
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500 resize-none leading-relaxed"
                            style={{
                                whiteSpace: 'pre-wrap', // Preserve line breaks in textarea
                                lineHeight: '1.6'
                            }}
                        />
                        {/* Live Preview */}
                        {data.content && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <p className="text-xs font-semibold text-slate-600 mb-2">Preview:</p>
                                <div className="text-sm text-slate-700 max-h-32 overflow-y-auto">
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

                    {/* Category Section */}
                    <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-lg shadow-blue-100/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <label className="text-sm font-semibold text-slate-700">
                                Blog Category
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowAddCategory(true)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors duration-300 hover:scale-105 self-start sm:self-auto"
                            >
                                + Add Category
                            </button>
                        </div>
                        
                        <select 
                            name='category' 
                            onChange={onChangeHandler} 
                            value={data.category}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-slate-800"
                            required
                        >
                            <option value="">Select category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button 
                            type='submit'
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        <span>Publish Blog</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>

                {/* Add Category Modal */}
                {showAddCategory && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-md bg-white rounded-xl p-8 border border-blue-200 shadow-xl">
                            <h3 className="text-xl font-bold text-slate-800 mb-4">
                                Add New Category
                            </h3>
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Enter category name..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500 mb-6"
                                autoFocus
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                            />
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        setShowAddCategory(false);
                                        setNewCategory('');
                                    }}
                                    className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCategory}
                                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
                                >
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page
