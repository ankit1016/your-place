import { bool } from 'prop-types';
import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  const { asOverlay } = props;
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  asOverlay: bool.isRequired,
};

export default LoadingSpinner;
