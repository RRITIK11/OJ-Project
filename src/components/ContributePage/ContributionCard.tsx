import { ContributionInterface } from '@/app/(sections)/contribute/page'
import { Verification } from '@/config/constants'
import React from 'react'

function ContributionCard({contribution, key} : {
    contribution : ContributionInterface,
    key : any
}) {
  return (
    <div className='border-2 p-2 bg-[#A59D90] rounded-xl text-black flex flex-col'>
        <div className='font-bold'>{contribution.title}</div>
        <div className='text-gray-800 text-lg'>Verification status : {contribution.verification}</div>
        <div className='flex flex-row justify-between'>
        {
            contribution._approvedBy &&
            <div className='text-sm text-gray-600'>Approved by : {contribution._approvedBy}</div>
        }
        {
            contribution._rejectedBy &&
            <div className='text-sm text-gray-600'>Rejected by : {contribution._rejectedBy}</div>
        }

        </div>
    </div>
  )
}

export default ContributionCard