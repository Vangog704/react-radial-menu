import React from 'react'

import styles from './TimeLine.module.sass'
import clsx from 'clsx'

export const Fragment = (props) => {
  const { id, width, active, className, last, first, onClick, alter } = props

  const classes = clsx({
    [styles.active]: active,
    [styles.first]: first,
    [styles.last]: last,
    [styles.alter]: alter,
  }, styles.fragment, className)

  return (
    <div className={classes} style={{ minWidth: `${width}%` }} onClick={() => onClick(id)}>
      {active ? 'MUDA' : 'ORA' }
    </div>
  )
}

export default Fragment;