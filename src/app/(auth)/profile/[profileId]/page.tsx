import { UserInterface } from '@/models/user.model'
import React from 'react'

function UserProfile({params} : {params : UserInterface}) {
  return (
    <div>
        <div>Profile page</div>
        <h2>{params?.username}</h2>
        <h2>Admin : {params?.roles?.isAdmin}</h2>
        <h2>Moderator : {params?.roles?.isModerator}</h2>
    </div>
  )
}

export default UserProfile