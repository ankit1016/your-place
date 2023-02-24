import { object, string } from 'prop-types';
import React from 'react';

import './Avatar.css';

const Avatar = (props) => {
  const { className, style, image, alt, width } = props;

  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width, height: width }}
      />
    </div>
  );
};

Avatar.defaultProps = {
  className: '',
  style: {},
  width: '',
};

Avatar.propTypes = {
  className: string,
  style: object,
  image: string.isRequired,
  alt: string.isRequired,
  width: string,

};

export default Avatar;
