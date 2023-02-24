import { number, object, string } from 'prop-types';
import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom, className, style } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    const marker = new window.google.maps.Marker({ position: center, map });
    marker();
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={style}
    />
  );
};
Map.defaultProps = {
  className: '',
  style: {},
};

Map.propTypes = {
  className: string,
  style: object,
  center: number.isRequired,
  zoom: number.isRequired,
};

export default Map;
