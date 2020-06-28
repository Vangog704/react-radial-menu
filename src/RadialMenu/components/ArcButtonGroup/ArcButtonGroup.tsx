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
    <g>
      {options.map(
        ({ aperture, angle, height, id, inRad }) => 
          <ArcButton
            aperture={aperture}
            angle={angle}
            height={height}
            inRad={inRad}
            onHover={onHover}
            key={id}
            id={id}
          />
      )}
    </g>
  )
}

ArcButtonGroup.defaultProps = {
  options: [],
}

export default ArcButtonGroup;