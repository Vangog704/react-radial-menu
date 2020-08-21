import React, { useState } from 'react';
import TimeLine from '../Timeline/TimeLine';

export default {
  title: 'TimeLine',
  component: TimeLine,
};

const items = [
  { id: 1, active: false, width: 20 },
  { id: 2, active: true },
  { id: 3, active: false, width: 5 },
  { id: 4, active: true, alter: true },
  { id: 5, active: true },
  { id: 6, active: false, width: 10 },
  { id: 7, active: true, width: 15 },
  { id: 8, active: false, alter: true },
  { id: 9, active: true, alter: true },
  { id: 10, active: false, alter: true },
]

export const TimeLineStates = () => {
  const [itemsState, setItemsState] = useState(items)

  const handleClick = (id) => {
    setItemsState((items) => {
      const itemIdx = items.findIndex(it => it.id === id)
      const result = [ ...items ]
      result[itemIdx] = { ...items[itemIdx], active: !items[itemIdx].active }
      return result
    })
  }

  return (
  <div style={{ backgroundColor: '#555', padding: '20px', height: '500px'}}>
    <TimeLine items={itemsState} onFragmentClick={handleClick} />
  </div>
)};