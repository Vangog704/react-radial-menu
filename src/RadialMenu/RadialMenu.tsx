import React, { useState, useCallback } from 'react';
import Vec from 'victor';

import styles from './RadialMenu.module.sass';
import { ArcButtonGroup } from './components/ArcButtonGroup/ArcButtonGroup';

type RadialMenuProps = {
  count: number,
}

function rotateStyle(v: Vec) {
  return `rotateX(${v.y}deg) rotateY(${-v.x}deg) translate(${-v.x}px, ${-v.y}px)`
}

export const RadialMenu = ({ count }: RadialMenuProps) => {

  const [options, setOptions] = useState(Array.from({ length: count }, () => 360/count)
    .map((aperture, idx) => ({
      id: idx,
      aperture,
      angle: idx*aperture,
      height:(1+idx)*10 + 50
    }))
  );
  const [rotVector, setRotVector] = useState(new Vec(0, 0));
  const svgStyle = { transform: rotateStyle(rotVector) }

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
          <ArcButtonGroup 
            id={1}
            options={options}
            onHover={setRotVector}
            key={'main_arc_btn_group'}
          />
        </g>
      </svg>
    </div>
  )
}

RadialMenu.defaultProps = {
  count: 6,
}

export default RadialMenu;