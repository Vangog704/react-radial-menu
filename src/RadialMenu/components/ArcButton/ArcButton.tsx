import React, { useMemo, useCallback } from 'react';
import Vec from 'victor';

import { buildArcButton, ArcButtonConfigProps } from '../../utils/calcArcButtonConfig';

import styles from './ArcButton.module.sass';

interface ArcButtonProps extends ArcButtonConfigProps {
  id: number,
  
  onHover: (center: Vec) => void,
};

export const ArcButton = ({ id, onHover, ...rest }: ArcButtonProps) => {

  // Calc shape
  const { center, path, iconSize } = useMemo(
    () => buildArcButton({...rest}),
    [rest]
  );

  const handleMouseOver = useCallback(
    () => onHover(center.clone().normalize().multiply(new Vec(12,12))),
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
      <circle cx={center.x} cy={center.y} r={iconSize/2}></circle>
    </g>
  )
}

ArcButton.defaultProps = {
  height: 100,
  aperture: 60,
  inRad: 100,
  angle: 0,
  gap: 3,
}

export default ArcButton;