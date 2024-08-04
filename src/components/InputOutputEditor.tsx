import React from 'react'

function InputOutputEditor() {
  return (
    <div className='bg-[#212121] h-full rounded-[8px] overflow-hidden '>
        <header className='flex flex-row bg-[#333333] px-4 p-1 text-sm'>
        <div className='hover:bg-[#212121] p-2 px-4 rounded-xl'>✅ Test Case</div>
        <div className='hover:bg-[#212121] p-2 px-4 rounded-xl'><span className='text-green-400'>{` >_ `}</span> Test Result</div>
      </header>
    </div>
  )
}

export default InputOutputEditor