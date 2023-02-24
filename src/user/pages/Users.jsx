import React, { useEffect, useState } from 'react';
import useAxios from '../../shared/hooks/useAxios';

import UsersList from '../components/UsersList';

const Users = () => {
  const [userData, setuserData] = useState([]);
  const axiosApi = useAxios();
  useEffect(() => {
    axiosApi('user').then((res) => { setuserData(res.users); });
  }, []);

  return (

    <UsersList items={userData} />

  );
};

export default Users;
