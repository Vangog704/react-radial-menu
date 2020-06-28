import React from 'react';
import Vec from 'victor';

import { ArcButton } from '../ArcButton/ArcButton';

// import styles from './ArcButtonGroup.module.sass';

interface ArcButtonProps {
  id: number,
  height?: number,
  aperture?: number,
  inRad?: number,
  angle?: number,
  gap?: number,
};

interface ArcButtonGroupProps {
  id: number,
  options: Array<ArcButtonProps>,

  onHover: (vector: Vec) => void,
};

export const ArcButtonGroup = ({ options, onHover }: ArcButtonGroupProps) => {

  return (
    <>
      {options.map(
        ({ aperture, angle, height, id }) => 
          <ArcButton
            aperture={aperture}
            angle={angle}
            height={height}
            onHover={onHover}
            key={id}
            id={id}
          />
      )}
    </>
  )
}

ArcButtonGroup.defaultProps = {
  options: [],
}

export default ArcButtonGroup;