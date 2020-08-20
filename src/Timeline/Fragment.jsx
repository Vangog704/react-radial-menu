import React from 'react'

import styles from './TimeLine.module.sass'
import clsx from 'clsx'

export const Fragment = (props) => {
  const { id, width, active, className, last, first, label, onClick } = props

  const classes = clsx({
    [styles.active]: active,
    [styles.first]: first,
    [styles.last]: last,
  }, styles.fragment, className)

  return (
    <div className={classes} style={{ minWidth: `${width}%` }} onClick={() => onClick(id)}>
      {label}
    </div>
  )
}

export default Fragment;