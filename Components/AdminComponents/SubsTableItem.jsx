import React from 'react'

const SubsTableItem = ({email,mongoId,date,deleteEmail,onEdit }) => {
    const emailDate=new Date(date);
  return (
    <tr className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100 hover:border-indigo-200">
      <th scope='row' className="px-6 py-4 text-left font-medium text-gray-900 group-hover:text-indigo-900 transition-colors duration-200">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="truncate max-w-xs">
            {email ? email : 'No Email'}
          </span>
        </div>
      </th>
      <td className="px-6 py-4 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">{emailDate.toDateString()}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <button onClick={()=>deleteEmail(mongoId)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:scale-110 group-hover:shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button onClick={() => onEdit(mongoId, email)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group-hover:bg-indigo-100">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      </td>
      
    </tr>
  )
}

export default SubsTableItem

// import React from 'react'

// const SubsTableItem = ({email}) => {
//   return (
//     <tr>
//         <th scope='row'>
//             {email?email:'No Email'}
//         </th>
//         <td>{"11 feb 2025"}</td>
//         <td>X</td>
//         <td>edit</td>
//     </tr>
//   )
// }

// export default SubsTableItem
