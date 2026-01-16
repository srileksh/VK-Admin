import Sidebar from '@/components/Sidebar'
import React from 'react'

function layout({children}) {
  return (
    <div className='grid grid-cols-2'>
      <Sidebar/>
      {children}
    </div>
  )
}

export default layout