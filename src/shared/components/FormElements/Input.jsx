import { array, func, oneOfType, string } from 'prop-types';
import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const { initialValue, initialValid, id, onInput, validators, element, type, placeholder, rows, label, errorText } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const ele = element === 'input' ? (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value || initialValue}
    />
  ) : (
    <textarea
      id={id}
      rows={rows || 3}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value || initialValue}
    />
  );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched
        && 'form-control--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {ele}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

Input.propTypes = {
  id: string.isRequired,
  initialValue: string.isRequired,
  initialValid: string.isRequired,
  element: string.isRequired,
  type: string.isRequired,
  onInput: func.isRequired,
  errorText: string.isRequired,
  validators: oneOfType([string, func, array]).isRequired,
  placeholder: string.isRequired,
  rows: string.isRequired,
  label: string.isRequired,

};

export default Input;
