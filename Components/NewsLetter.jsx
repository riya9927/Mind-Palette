import React from 'react'

const NewsLetter = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-24 px-6 md:px-12">
            <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Stay Updated
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Get the latest posts delivered directly to your inbox
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="relative">
                            <input
                                type='email'
                                placeholder='Enter Your Email'
                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white shadow-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-yellow-100 py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
                        >
                            Subscribe Now
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                            No spam, unsubscribe at any time
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter