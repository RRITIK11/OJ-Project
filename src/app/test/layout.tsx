import React from 'react'
import Link from 'next/link'

function layout({children} :{
    children : React.ReactNode
}) {
  return (
    <div className='h-full w-full bg-cyan-900'>
        <nav className='bg-black text-white p-4 m-4 rounded-xl justify-between flex flex-row'>
            <Link href='/test/page1'>Page1</Link>
            <Link href='/test/page2'>Page2</Link>
            <Link href='/test/page3'>Page3</Link>
            <Link href='/test/compiler'>Compiler</Link>
        </nav>

        <div className='flex flex-row h-[70%] bg-blue-100 m-8 rounded-2xl gap-5 p-4 justify-between'>
            <div className='w-[50%] bg-[#333333] rounded-md '>
                {children}
            </div>
            <div className='w-[50%] bg-[#222222] rounded-lg'>
                {children}
            </div>
        </div>

        <footer className='bg-pink-300 m-4 p-4 rounded-xl text-black'>
            Footer
        </footer>

    </div>
  )
}

export default layout