import React, { useMemo, useCallback } from 'react';
import Vec from 'victor';

import { ArcButtonBuilder, ArcButtonConfigProps } from '../../utils/calcArcButtonConfig';

import styles from './ArcButton.module.sass';

export interface ArcButtonProps extends ArcButtonConfigProps {
  id: number,
  
  onHover: (center: Vec) => void,
};

export const ArcButton = ({ onHover, height, aperture, inRad, angle, gap, borderRadius }: ArcButtonProps) => {

  // Calc shape
  const { center, path, iconSize } = useMemo(
    () => {
      return new ArcButtonBuilder({height, aperture, inRad, angle, gap, borderRadius })
        .build();
    }, [height, aperture, inRad, angle, gap, borderRadius]
  );

  const handleMouseOver = useCallback(
    () => onHover(center.clone().normalize().multiply(new Vec(10,10))),
    [center, onHover],
  );

  const handleMouseOut = useCallback(
    () => onHover(new Vec(0,0)),
    [onHover],
  );
  return (
    <g
      className={styles.container}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <path d={path}/>
      <circle cx={center.x} cy={center.y} r={iconSize*.7/2}></circle>
    </g>
  )
}

ArcButton.defaultProps = {
  height: 100,
  aperture: 60,
  inRad: 100,
  angle: 0,
  gap: 2,
  borderRadius: 10,
}

export default ArcButton;