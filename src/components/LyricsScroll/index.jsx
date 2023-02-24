import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

import { animate, checkTime } from '@/utils/common'
import { updateTime } from '@/store/lyrics.slice'
import useCopyState from '@/hooks/useCopyState'

import 'simplebar/dist/simplebar.min.css'
/**
 * 参数：歌词，滚动动画时间，当前激活歌词索引，
 *
 * 功能：
 * 1.歌词滚动（动画）
 * 2.歌词高亮
 * 3.歌词时间轴显示和隐藏
 * 4.歌词时间轴编辑
 * 5.歌词时间轴格式检测
 *
 */

const LyricsScroll = React.memo(
  ({
    lyrics, //歌词
    lyTimes, //歌词时间轴
    animate_time, //滚动动画时间
    currentIndex, //当前歌词索引
    edited, // 编辑模式
  }) => {
    // 1. 组件自身维护的时间轴，lyTimes改变了也会更新状态
    const [lytimes, setLytimes] = useCopyState(lyTimes)
    const dispatch = useDispatch()
    // 2. 处理时间轴自身的事件：更改、校验格式、更新 store
    const [clickIndex, setClickIndex] = useState(-1) // 可编辑预览模式，显示单行时间轴
    const [lytimeFormated, setLytimeFormated] = useState(true) //检测时间轴格式是否正确
    const [changed, setChanged] = useState(false) //检测时间是否改变
    const handleLytimeChange = (index) => {
      return (evt) => {
        setLytimes((pre) => {
          let lytimes = [...pre]
          let newTime = evt.target.value
          if (lytimes[index] !== newTime) {
            setClickIndex(index)
            setChanged(true)
            lytimes[index] = evt.target.value
          }
          return lytimes
        })
      }
    }
    const handleLytimeFormated = (index) => {
      return (evt) => {
        setLytimeFormated((pre) => {
          let right = checkTime(evt.target.value)
          if(right) {
            evt.target.blur()
          }
          return right
        })
      }
    }
    const updateLytimes = (time, index) => {
      return () => {
        //限流
        if (clickIndex === index && lytimeFormated && changed) {
          setChanged(false)
          setLytimeFormated(false)
          // 将数据同步到 store 上
          dispatch(updateTime({ time, index }))
        }
        if (clickIndex !== -1) {
          setClickIndex(-1)
        }
      }
    }
    // 3. 歌词滚动
    // 绑定滚动事件
    const scrollableNodeRef = useRef(null)
    //歌词滚动
    const [blockHeight, setBlockHeight] = useState(0)
    useEffect(() => {
      let contentWrapper = scrollableNodeRef.current
      //获取滚动可视高度
      let clientheight = contentWrapper.clientHeight
      // 当前滚动位置
      let currentHeight = contentWrapper.scrollTop
      setBlockHeight((pre) => {
        if (pre !== clientheight) {
          return clientheight
        }
        return pre
      })
      //需滚动到的位置
      let height = currentIndex * 39
      animate({
        duration: animate_time, // 默认 300ms
        timing: function (timeFraction) {
          return -timeFraction * timeFraction + 2 * timeFraction
        },
        draw: function (progress) {
          contentWrapper.scroll(
            0,
            height + (1 - progress) * (currentHeight - height)
          )
        },
      })
    }, [currentIndex, animate_time])
    return (
      <LyContent
        edited={edited}
        lyheight="39px"
        blockHeight={blockHeight}
      >
        <SimpleBar
          className="lyrics_list"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <div className="ly_block"></div>
          {lyrics.map((ly, index) => (
            <li
              key={index}
              className={`ly_item ${currentIndex === index ? 'active' : ''}`}
              onClick={() => !edited && setClickIndex(index)}
              onMouseLeave={updateLytimes(lytimes[index], index)}
            >
              <div
                className="ly_time"
                style={{
                  width:
                    edited || clickIndex === index ? 'max(120px, 20%)' : '0%',
                }}
              >
                <span>[</span>
                <input
                  type="text"
                  value={lytimes[index]}
                  onChange={handleLytimeChange(index)}
                  onMouseLeave={handleLytimeFormated(index)}
                />
                <span>]</span>
              </div>
              {ly}
            </li>
          ))}
          <div className="ly_block"></div>
        </SimpleBar>
      </LyContent>
    )
  }
)

const LyContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  .lyrics_list {
    height: 100%;
    width: 98%;
    position: relative;
    .simplebar-scrollbar::before {
      background-color: var(--bg-white-300) !important;
    }
  }
  .ly_item {
    list-style: none;
    color: var(--font-white-200);
    font-size: 20px;
    font-family: sans-serif;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: ${({ lyheight }) => lyheight};
    line-height: ${({ lyheight }) => lyheight};
    cursor: ${({ edited }) => (edited ? 'default' : 'pointer')};
    transition: font 0.1s;
    &.active {
      color: var(--font-white-100);
      font-size: 21px;
      font-weight: bold;
    }
  }
  .ly_time {
    width: max(120px, 20%);
    transition: width 0.2s;
    float: left;
    overflow: hidden;
    input {
      width: 90px;
      background-color: transparent;
      font-size: 18px;
      padding: 0;
      line-height: ${({ lyheight }) => lyheight};
      text-align: center;
      &:focus {
        border: none;
        outline: 0;
      }
    }
  }
  .ly_block {
    &:first-child {
      height: ${({ blockHeight }) => `${blockHeight / 2 - 100}px`};
    }
    height: ${({ blockHeight }) => `${blockHeight}px`};
  }
`

export default LyricsScroll
