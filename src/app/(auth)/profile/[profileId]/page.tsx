import React from 'react'

function UserProfile({params} : any) {
  return (
    <div>
        <div>Profile page</div>
        <h2>{params.profileId}</h2>
    </div>
  )
}

export default UserProfile