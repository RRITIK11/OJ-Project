"use client"
import ContributionCard from '@/components/ContributePage/ContributionCard';
import { Difficulty, Verification } from '@/config/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface ContributionInterface {
  _id : string,
  title : string,
  difficulty : Difficulty,
  number : string,
  verification : Verification,
  _approvedBy? : string | undefined | null,
  _rejectedBy? : string | undefined | null
}

export default function Contribute() {
  const router = useRouter();
  const [contributions, setContributions] = useState<ContributionInterface[]>([]);

  async function fetchContribution(){
    const response = await axios.get("/api/contribution");
    console.log(response.data.contributions);
    setContributions(response.data.contributions);
  }

  function clickHandler(e : any){
    e.preventDefault();
    router.push(`contribute/${choice}`)
    return 0;
  }

  useEffect(()=>{
    fetchContribution();
  },[])

  const [choice, setChoice] = useState("question");
  return (
    <div className='flex h-screen bg-[#a59d90] flex-row text-xl'>
      <div className='w-[60%]  flex flex-col justify-center items-end  m-20 text-right'>
        <h1 className='text-7xl text-black font-extrabold'>Want to contribute?</h1>
        <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores labore, alias cumque necessitatibus corrupti dolores tempora saepe recusandae officiis. Vitae cumque ratione nam error!</p>
        <br />
        <p className='text-gray-700'><b>Contribute a question:</b>  +1000🪙 upon approval + publication</p>
        <p className='text-gray-700'><b>Contribute a testcase:</b> +100🪙 upon approval</p>
        <br />

        <div className='flex flex-row gap-4' >
          <select className='text-black px-4 py-2 rounded-xl text-left' onChange={(e : any)=>{
            console.log(e.target.value);
            setChoice(e.target.value);
          }}>
            <option value="question" >Contribute a question</option>
            <option value="testcase">Contribute a testcase</option>
          </select>
          <button className='h-10 w-10 bg-[#756d61] rounded-full' onClick={clickHandler} >
            {`->`}
          </button>
        </div>

      </div>
      <div className='w-[40%] bg-[#8e816d] flex p-20 flex-col justify-center'>
        {
          contributions.length > 0 ? 
              <div className='flex flex-col gap-2'>
                {
                  contributions.map((contribution : ContributionInterface)=>{
                    return <ContributionCard contribution ={contribution} key={contribution._id} />
                  })
                }
              </div>
            :
          <div className='text-[#a59d90] text-4xl font-extrabold text-left'>
            Your contributions will be displayed here.
          </div>
        }

      </div>
    </div>
  )
}
