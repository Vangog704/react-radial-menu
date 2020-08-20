import React from 'react'

import styles from './TimeLine.module.sass'
import Fragment from './Fragment'
import clsx from 'clsx'

export const TimeLine = (props) => {
  const { items, onFragmentClick } = props

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {items.map((item, idx) => {
          const last = item.active && !items[1+idx]?.active
          const first = item.active && !items[idx-1]?.active
          return (<Fragment {...item} key={item.id} first={first} last={last} onClick={onFragmentClick}/> )
        })}
      </div>
      <span className={styles.timeline}></span>
    </div>
  )
}

export default TimeLine;