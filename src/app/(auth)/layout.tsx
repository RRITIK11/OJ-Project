import Navigation from '@/components/HomePage/Navigation'
import React from 'react'

function Layout({children } : any) {
  return (
    <div className='h-full flex flex-col w-full overflow-x-hidden gap-4'>
        <Navigation/>
        <div className='grow flex h-full justify-center items-center'>
            {children}
        </div>
    </div>
  )
}

export default Layout