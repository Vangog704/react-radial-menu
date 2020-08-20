import React, { useState } from 'react';
import TimeLine from '../Timeline/TimeLine';

export default {
  title: 'TimeLine',
  component: TimeLine,
};

const items = [
  { id: 1, label: '123213', active: false },
  { id: 2, label: '123213', active: true },
  { id: 3, label: '123213', active: false, width: 5 },
  { id: 4, label: '123213', active: true },
  { id: 5, label: '123213', active: true },
  { id: 6, label: '123213', active: false, width: 10 },
  { id: 7, label: '123213', active: true, width: 15 },
  { id: 8, label: '123213', active: false },
  { id: 9, label: '123213', active: true },
  { id: 10, label: '123213', active: false },
  { id: 11, label: '123213', active: false },
  { id: 12, label: '123213', active: false },
  { id: 13, label: '123213', active: false },
  { id: 14, label: '123213', active: false },
  { id: 15, label: '123213', active: false },
  { id: 16, label: '123213', active: false },
  { id: 17, label: '123213', active: false },
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
  <div style={{ backgroundColor: 'white', padding: '20px', height: '500px'}}>
    <TimeLine items={itemsState} onFragmentClick={handleClick} />
  </div>
)};