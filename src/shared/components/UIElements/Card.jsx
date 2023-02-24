import { node, object, string } from 'prop-types';
import React from 'react';

import './Card.css';

const Card = (props) => {
  const { className, style, children } = props;
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  className: '',
  style: {},
};

Card.propTypes = {
  children: node.isRequired,
  className: string,
  style: object,
};

export default Card;
