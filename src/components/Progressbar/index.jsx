import React, { useCallback, useEffect, useState } from 'react'

import Style from './progressbar.module.scss'
/**
 * 控制播放条：
 * 1. 两种宽度：进度小数，预加载小数（非必需），父传子
 * 2. 事件触发：子传父
 * @returns
 */
function Progressbar(props) {
  let { curPercent, prePercent, maxValue, setCurrentPercent, setCurrentTime } =
    props

  const [value, setValue] = useState(0) //进度条的值
  const [pre, setPre] = useState(0) //预加载的值：小数
  const [isDrag, setIsDrag] = useState(false) //是否处于拖拽

  const max = maxValue ? maxValue : 1000 //进度条最大值

  useEffect(() => {
    if (!isDrag) {
      setValue(curPercent ? curPercent * max : 0)
    }
  }, [curPercent, max, isDrag])

  useEffect(() => {
    setPre(prePercent ? prePercent : 0)
  }, [prePercent])
  const handleClick = useCallback(
    (value, bool) => {
      setCurrentPercent && setCurrentPercent(value / max, bool)
    },
    [setCurrentPercent, max]
  )

  const handleChange = useCallback(
    (value, bool) => {
      setCurrentTime && setCurrentTime(value / max, bool)
    },
    [setCurrentTime, max]
  )

  return (
    <div
      className={Style.slider_container}
      style={{
        '--fill-width': `${(value / max) * 100}%`,
        '--pre-width': `${pre * 100}%`,
      }}
    >
      <div className={Style.progress}>
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          className={Style.slider_range}
          onChange={(evt) => {
            let value = evt.target.value
            setValue(value)
            setIsDrag(true)
            handleChange(value, true)
          }}
          onClick={(evt) => {
            setIsDrag(false)
            handleClick(evt.target.value, false)
          }}
        />
      </div>
    </div>
  )
}

export default Progressbar
