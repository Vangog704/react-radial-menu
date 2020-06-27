import React, { useState } from 'react';
import Vec from 'victor';

import ArcButton from './components/ArcButton/ArcButton';

import styles from './RadialMenu.module.sass';

type RadialMenuProps = {
  count: number,
}

function rotateStyle(v: Vec) {
  return `rotateX(${v.y}deg) rotateY(${-v.x}deg) translate(${-v.x}px, ${-v.y}px)`
}

export const RadialMenu = ({ count }: RadialMenuProps) => {

  const [rotVector, setRotVector] = useState(new Vec(0, 0));
  const svgStyle = { transform: rotateStyle(rotVector) }
  console.log(svgStyle);
  return (
    <div className={styles.mainContainer}>
      <svg
        style={svgStyle}
        className={styles.svgContainer}
        viewBox="-210 -210 420 420"
      >
        {/* <circle cx={0} cy={0} r={200}></circle>
        <circle cx={0} cy={0} r={100}></circle> */}
        <g>
          {Array.from({ length: count }, () => 360/count).map(
            (aperture, idx) => 
              <ArcButton
                aperture={aperture}
                angle={idx*aperture}
                height={(1+idx)*10 + 50}
                onHover={setRotVector}
                key={idx}
                id={idx}
              />
            )}
        </g>
      </svg>
    </div>
  )
}

RadialMenu.defaultProps = {
  count: 6,
}

export default RadialMenu;