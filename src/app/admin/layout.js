// import Sidebar from '@/components/Sidebar'
// import React from 'react'

// function layout({children}) {
//   return (
//     <div className='grid grid-cols-2'>
//       <Sidebar/>
//       {children}
//     </div>
//   )
// }

// export default layout
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function layout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-[18rem_1fr]">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="p-6 bg-gray-50 overflow-y-auto">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}
