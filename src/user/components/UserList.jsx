import { array } from 'prop-types';
import React from 'react';
import UserItem from './UserItem';

const UserList = ({ list }) => {
  if (list?.length === 0) {
    return <h2>No User Found</h2>;
  }
  return (
      // Returns a UserItem based on a user list.
<>
    {list.map((user) => <UserItem key={user?.id} user={user} />)}
</>
  );
  };

  UserList.defaultProps={
    list: [],
  };

UserList.propTypes = {
  list: array,
};
export default UserList;