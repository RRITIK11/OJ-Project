import React from 'react'
import Link from 'next/link';


const page = () => {
 
  return (
    <div className="w-full flex flex-row text-black">
      {/* left-section */}
      <div className="w-[60%] relative">
        <div className="p-8 py-24">
          <h1 className="font-bold text-3xl">Create test cases*</h1>
          <div className="text-lg mb-2">
          What does the input/output look like?
          </div>
          <textarea name="" id="" className='w-full h-[30em] resize-none p-2 border-2 border-gray-600' placeholder='Input your test cases here'></textarea>
        </div>

        <div className=" absolute bottom-6 w-full">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/solution">
              <div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white">
                {"<"}
              </div>
            </Link>
            <Link href="/contribute">
              <div className="flex justify-center items-center p-2 px-4 bg-[#756D61] rounded-full font-bold text-white">
                Submit
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          
          <div className="font-bold">Sample</div>
          <br />
          <div>
          Input: nums = [2, 7, 11, 15], target = 9
          </div>
          <div>Output: [0, 1]</div>
          <br />
          <div>
          Input: nums=[-3, 4, 3, 90], target = 0
          </div>
          <div>Output: [0, 2]</div>
        </div>
      </div>
    </div>
  );
};

export default page;
