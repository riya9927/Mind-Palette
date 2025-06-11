import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src={assets.logo} 
              alt='MindPalette Logo' 
              width={120} 
              height={60}
              className="h-16 w-auto"
            />
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Inspiring minds through thoughtful content and creative storytelling.
            </p>
          </div>

          {/* Copyright Section */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              All rights reserved. Copyright © 2024 
              <span className="text-blue-400 font-semibold"> MindPalette</span>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="group p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Follow us on Facebook"
            >
              <Image 
                src={assets.facebook_icon} 
                alt='Facebook' 
                width={24} 
                height={24}
                className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
            </a>
            
            <a 
              href="#" 
              className="group p-3 bg-gray-800 rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-110"
              aria-label="Follow us on Twitter"
            >
              <Image 
                src={assets.twitter_icon} 
                alt='Twitter' 
                width={24} 
                height={24}
                className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
            </a>
            
            <a 
              href="#" 
              className="group p-3 bg-gray-800 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:scale-110"
              aria-label="Follow us on Google Plus"
            >
              <Image 
                src={assets.googleplus_icon} 
                alt='Google Plus' 
                width={24} 
                height={24}
                className="group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
            </a>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="mb-4 md:mb-0">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200 mr-4">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200 mr-4">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact Us</a>
            </div>
            <div>
              <p>Built with Next.js & Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;