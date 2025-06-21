import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'

const BlogTableItem = ({ authImg, title, author,date,deleteBlog,mongoId, onEdit }) => {
    const BlogDate=new Date(date);
  const validImage = authImg && authImg.trim() !== "" ? authImg : assets.profile_icon;

  return (
    <tr className="group hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={validImage}
              alt="Author profile image"
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {author ? author : "No author"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="max-w-xs">
          <p className="text-sm text-gray-800 font-medium leading-relaxed line-clamp-2 group-hover:text-gray-900 transition-colors duration-200">
            {title ? title : "No title"}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
          {BlogDate.toDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex space-x-2  group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onEdit}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-200"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={()=>deleteBlog(mongoId)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;

// import { assets } from '@/Assets/assets'
// import Image from 'next/image'
// import React from 'react'

// const BlogTableItem = ({ authImg, title,author }) => {
//   const validImage = authImg && authImg.trim() !== "" ? authImg : assets.profile_icon;

//   return (
//     <tr>
//       <th scope="row">
//         <Image 
//           src={validImage} 
//           alt="Author profile image" 
//           width={40} 
//           height={40} 
//           style={{ borderRadius: '50%' }}
//         />
//         <p>{author?author:"No author"}</p>
//       </th>
//       <td>{title ? title : "No title"}</td>
//       <td>11 Feb 2025</td>
//       <td>X</td>
//     </tr>
//   );
// }

// export default BlogTableItem;
