import React from 'react';
import { func, string } from 'prop-types';
import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = (props) => {
  const { onClear, error } = props;
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  onClear: func.isRequired,
  error: string.isRequired,
};

export default ErrorModal;
