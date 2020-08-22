import React, { useState, useCallback } from 'react'
import _throttle from 'lodash/throttle'
import styles from './Waves.module.sass'

export const Waves = (props) => {
  const [drops, setDrops] = useState([])

  const handleDrop = useCallback(
    _throttle((e) => {
      const { clientX: x, clientY: y } = e
      const id = Date.now()
      if (!x || !y) return
      console.log(drops)
      setTimeout(() => {
        setDrops((prev) => prev.filter((it) => it.id !== id))
      }, 1500)
      setDrops((prev) => [
        ...prev,
        { id, style: { top: `${y}px`, left: `${x}px` } }
      ])
    }, 100),
    []
  )

  return (
    <div className={styles.container} onMouseMove={handleDrop}>
      {drops.map((item) => (
        <span className={styles.wave} {...item} key={item.id} />
      ))}
    </div>
  )
}

export default Waves
