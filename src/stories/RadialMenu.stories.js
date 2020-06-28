import React from 'react';
import RadialMenu from '../RadialMenu/RadialMenu';

export default {
  title: 'RadialMenu',
  component: RadialMenu,
};

export const RadialMenuStates = () => (
  <div>
    <RadialMenu count={10}/>
    <RadialMenu count={3} height={70} inRad={30}/>
    <RadialMenu count={6} height={100}/>
  </div>
);