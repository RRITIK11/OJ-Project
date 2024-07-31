"use client"
import React from 'react'
import Link from 'next/link'
function ProblemDescription({problem} :any) {

  return (     
      <div className='flex flex-col p-2 overflow-auto h-full'>
          <div>
            {problem?.number}. {problem?.title}
          </div>

          <div className='flex flex-row gap-2 text-sm'>
            <div className={`bg-[#333333] py-1 px-2 rounded-xl`}>{problem?.difficulty}</div>
            <button className='bg-[#333333] py-1 px-2 rounded-xl'>Topics</button>
            <button className='bg-[#333333] py-1 px-2 rounded-xl'>Companies</button>
            <button className='bg-[#333333] py-1 px-2 rounded-xl'>Hint</button>
          </div>

          <div>
            {problem?.description?.text}
          </div>
          <br/>
          <br></br>

          {
            problem?.example?.map((element : any, index : any)=>(
              <div className='' key={element._id}>
                <div>Example {index+1}:</div>
                <div>
                  Input: <span>{element.input}</span>
                </div>
                <div>
                  Output: <span>{element.output}</span>
                </div>
                { element?.explanation?.text?.length!=0 ? <></>:<div>
                  Explanation: <span>{element.explanation.text}</span>
                </div>
                }

              </div>
            ))
          
          
          }
          {
            problem?.constraints?.length!=0 && 
            <div>
              <h1>Constraints:</h1>{
                problem?.constraints?.map((element : any, index : any)=>(
                  <div className='' key={element._id}>
                    <div>Example {index+1}:</div>
                    <div>
                      Input: <span>{element.input}</span>
                    </div>
                    <div>
                      Output: <span>{element.output}</span>
                    </div>
                    { element?.explanation?.text?.length!=0 ? <></>:<div>
                      Explanation: <span>{element.explanation.text}</span>
                    </div>
                    }
    
                  </div>
                ))
              }
            </div>
          }

          {
            problem?.followUp?.length!=0 && 
            <div>Follow up : {problem?.followUp}</div>
          }

          <div className='w-full border-b-[0.5px] border-b-slate-200 py-2'></div>

        
      </div>
  )
}

export default ProblemDescription