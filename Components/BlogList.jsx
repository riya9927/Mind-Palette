import { blog_data } from '@/Assets/assets'
import React, { useState } from 'react'
import BlogItem from './BlogItem'

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    
    const categories = ['All', 'Lifestyle', 'Motivation', 'Technology', 'Startup'];
    
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            {/* Filter Buttons Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Explore Our <span className="text-blue-600">Blog Categories</span>
                </h2>
                
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {categories.map((category) => (
                        <button 
                            key={category}
                            onClick={() => setMenu(category)} 
                            className={`
                                px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105
                                ${menu === category 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-md'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid Section */}
            <div >
                <div className="text-center mb-6">
                    <p className="text-gray-600">
                        {menu === 'All' 
                            ? `Showing all ${blog_data.length} articles` 
                            : `Showing ${blog_data.filter(item => item.category === menu).length} articles in ${menu}`
                        }
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center items-start gap-6">
                    {blog_data
                        .filter((item) => menu === 'All' ? true : item.category === menu)
                        .map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-sm">
                                <BlogItem 
                                    image={item.image} 
                                    title={item.title} 
                                    description={item.description} 
                                    category={item.category} 
                                />
                            </div>
                        ))
                    }
                </div>
                
                {/* Empty State */}
                {blog_data.filter((item) => menu === 'All' ? true : item.category === menu).length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                        <p className="text-gray-500">There are no articles in the {menu} category yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogList
// import { blog_data } from '@/Assets/assets'
// import React, { useState } from 'react'
// import BlogItem from './BlogItem'

// const BlogList = () => {
//     const [menu,setMenu] = useState("All");
//   return (
//     <div>
//       <div>
//         <button onClick={()=>setMenu('All')} className={menu== 'All' ? 'bg-blue-600 text-white py-1 px-4 rounded-sm':''}>All</button>
//         <button onClick={()=>setMenu('LifeStyle')} className={menu== 'LifeStyle' ? 'bg-blue-600 text-white py-1 px-4 rounded-sm':''}>LifeStyle</button>
//         <button onClick={()=>setMenu('Motivation')} className={menu== 'Motivation' ? 'bg-blue-600 text-white py-1 px-4 rounded-sm':''}>Motivation</button>
//         <button onClick={()=>setMenu('Technology')} className={menu== 'Technology' ? 'bg-blue-600 text-white py-1 px-4 rounded-sm':''}>Technology</button>
//         <button onClick={()=>setMenu('Startup')} className={menu== 'Startup' ? 'bg-blue-600 text-white py-1 px-4 rounded-sm':''}>Startup</button>
//       </div>
//       <div>
//         {blog_data.filter((item)=>menu=='All'?true:item.category==menu).map((item,index)=>{
//             return <BlogItem key={index} image={item.image} title={item.title} description={item.description} category={item.category} />
//         })}
//       </div>
//     </div>
//   )
// }

// export default BlogList
