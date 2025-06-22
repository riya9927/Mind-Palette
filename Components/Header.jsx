import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const Header = () => {

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50">
      <div
        className="w-full h-fit bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      >
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center">
          <Image
            src={assets.logo}
            alt='Logo'
            className="h-16 w-auto"
          />
        </div>
        <button className="flex items-center gap-2  bg-gray-800 hover:bg-gray-900 text-yellow-100 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
          Get Started
        </button>
      </div>
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <div className="bg-white/40 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Latest <span className="text-blue-600">Blogs</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover insightful articles, expert opinions, and trending topics that matter to you.
              Stay informed with our carefully curated content.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header

{/* <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Latest <span className="text-blue-600">Blogs</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover insightful articles, expert opinions, and trending topics that matter to you. Stay informed with our carefully curated content.
        </p>
      </div> */}
{/* <div
        className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center relative"
        style={{
          backgroundImage: `url('/bg.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Latest <span className="text-blue-600">Blogs</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover insightful articles, expert opinions, and trending topics that matter to you. Stay informed with our carefully curated content.
          </p>
        </div>
      </div> */}