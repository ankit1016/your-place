/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import useAxios from '../../shared/hooks/useAxios';

const NewPlace = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const axiosApi = useAxios();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false,
  );

  const placeSubmitHandler = (event) => {
    const { userId } = auth;
    event.preventDefault();
    // console.log(formState.inputs); // send this to the backend!
    const formData = new FormData();
    formData.append('title', formState.inputs.title.value);
    formData.append('description', formState.inputs.description.value);
    formData.append('address', formState.inputs.address.value);
    formData.append('creator', userId);
    formData.append('image', formState.inputs.image.value);
    axiosApi.post('http://localhost:5000/api/places/', formData).then(() => { navigate('/'); });
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(6)]}
        errorText="Please enter a valid description (at least 6 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
