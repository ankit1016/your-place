/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../shared/hooks/useAxios';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const axiosApi = useAxios();
  const { userId } = useParams();
  // const fetch=(userId)=>{axiosApi.get(`api/places/user/${userId}`).then((res)=>{setLoadedPlaces(res);})}

  // const data=useSyncExternalStore(fetch)
  //  console.log(data)

  useEffect(() => {
    console.log('ankit kumar');
    axiosApi.get(`api/places/user/${userId}`).then((res) => { setLoadedPlaces(res); });
  }, [userId]);

  return (
    <PlaceList items={loadedPlaces} />
  );
};

export default UserPlaces;
