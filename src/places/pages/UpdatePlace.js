import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';


import { AuthContext } from '../../shared/context/auth-context';
import useAxios from '../../shared/hooks/useAxios';




const UpdatePlace = () => {
  const auth=useContext(AuthContext)
 
  const[loadedPlace,setLoadedPlace]=useState()
 
  const placeId = useParams().placeId;
 const navigate=useNavigate()
 const axiosApi=useAxios()
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    axiosApi.get(`api/places/${placeId}`).then((res)=>{
      // console.log(res)
      setFormData(
        {
          title: {
            value: res.place.title,
            isValid: true
          },
          description: {
            value: res.place.description,
            isValid: true
          }
        },
        true
      );
    })
  
 
  }, [placeId]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    const body={title:formState.inputs.title.value,
                description:formState.inputs.description.value                 
    }
    console.log(body)
    axiosApi.patch(`api/places/${placeId}`,body).then((res)=>{console.log(res);navigate('/')})
  };

  if (!placeId) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

 

  return (
    <>

    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
    </>
  );
};

export default UpdatePlace;
