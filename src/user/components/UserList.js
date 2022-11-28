import React from 'react'
import UserItem from './UserItem'

const UserList = ({list}) => {
    if(list?.length===0){
        return <h2>No User Found</h2>
    }
  return (
    <>
       {list?.map(user=><UserItem key={user?.id} user={user} />)}
    </>
    // Returns a UserItem based on a user list.
  )
}

export default UserList