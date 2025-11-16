'use client'
import { UserProfile } from '@clerk/clerk-react'
import React from 'react'

function Profile() {
  return (
    <div className='p-10 flex justify-center'>
        <UserProfile /> 
    </div>
  )
}

export default Profile
