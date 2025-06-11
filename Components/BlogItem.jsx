import Image from 'next/image'
import React from 'react'

const BlogItem = ({title, description, category, image}) => {
  return (
    <div className="w-full max-w-md mx-auto m-4 p-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group bg-white flex-grow" style={{ flexBasis: '45%', minWidth: '230px' }}>
      {/* Blog Image */}
      <div className="relative overflow-hidden mb-3 rounded-b-lg">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/10 transition-all duration-300 z-10"></div>
        
        <Image 
          src={image} 
          alt={title}
          width={400}
          height={250}
          className="w-full h-auto object-cover transition-transform duration-300 transform scale-100 group-hover:scale-110 saturate-75 group-hover:saturate-100"
        />
        
        {/* Category Badge - positioned over the image */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="overflow-hidden">
        <h1 className="text-xl font-bold text-gray-800 mb-5 relative group-hover:text-gray-900 transition-colors duration-300">
          {title}
          {/* Animated Underline */}
          <span className="absolute left-0 top-full w-0 h-0.5 bg-yellow-600 transition-all duration-1000 group-hover:w-1/3 animate-underline"></span>
        </h1>
        
        <p className="text-base text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Read More Button */}
        <div className="mt-4">
          <button className="w-full bg-gray-800 hover:bg-gray-900 text-yellow-100 font-bold py-2 px-4 rounded transition-colors duration-300">
            <a href="#" className="block text-yellow-100 no-underline">
              Read More
            </a>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes move-to-right {
          0% { left: -50%; }
          40% { left: 50%; }
          70% { left: -20%; }
          100% { left: 0; }
        }
        .group:hover .animate-underline {
          animation: move-to-right 1s forwards;
        }
      `}</style>
    </div>
  )
}

export default BlogItem

// import { assets, blog_data } from '@/Assets/assets'
// import Image from 'next/image'
// import React from 'react'

// const BlogItem = ({title,description,category,image}) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
//       {/* Blog Image */}
//       <div className="relative overflow-hidden">
//         <Image 
//           src={image} 
//           alt={title}
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
//         />
        
//         {/* Category Badge */}
//         <div className="absolute top-4 left-4">
//           <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
//             {category}
//           </span>
//         </div>
//       </div>

//       {/* Blog Content */}
//       <div className="p-6">
//         <h5 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
//           {title}
//         </h5>
        
//         <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
//           {description}
//         </p>

//         {/* Read More Button */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-200">
//             <span>Read More</span>
//             <Image 
//               src={assets.arrow} 
//               alt='Read more arrow'
//               className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
//             />
//           </div>
          
//           {/* Optional: Add reading time or date */}
//           <div className="text-xs text-gray-400">
//             5 min read
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BlogItem