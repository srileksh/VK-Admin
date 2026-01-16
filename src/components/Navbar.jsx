import React from 'react'
import { IoIosSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

function Navbar() {
  return (
    <div className='flex justify-between items-center px-10 py-8'>
        <div>
            <h1 className='text-[30px] text-[#4F4F4F]'>Welcome, John</h1>
        </div>
        <div className='flex justify-center gap-[50px]'>
            <button className='text-[#606060] flex justify-center items-center gap-[3px]'><IoIosSettings  className='size-[29px]'/> Settings</button>
            <button className='text-[#606060] flex justify-center items-center gap-[3px]'><IoLogOutSharp className='size-[29px]'/> Logout</button>
        </div>
    </div>
  )
}

export default Navbar