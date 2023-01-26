import React, { useEffect, useState } from 'react'

import Style from './glasscover.module.scss'

/**
 * 由于不同浏览器存在功能差异，目前 firefox 体验较好
 * 
 * 1. 没有图片url，使用默认背景颜色
 * 2. 有图片url，加载图片
 * @param {*} props {gc_url、sameUrled}
 * @returns
 */
function Glasscover(props) {
  let { gc_url, sameUrled, uploadSameUrl } = props //背景图片
  const [isActived, setIsActived] = useState(false) //遮罩
  const [swaped, setSwaped] = useState(false) // 背景替换
  const [currentUrl, setCurrentUrl] = useState('') //当前图片源
  const [targetUrl, setTargetUrl] = useState('') //目标图片源
  useEffect(() => {
    if (sameUrled === false) {
      let picImg = new Image()
      if (gc_url === '') {
        setTargetUrl(gc_url)
        setSwaped(true)
        setTimeout(() => {
          setCurrentUrl(gc_url)
          uploadSameUrl(true)
          setSwaped(false)
        }, 1000)
        setTimeout(() => {
          setIsActived(false)
        }, 3100)
      } else {
        picImg.onload = () => {
          setIsActived(true)

          setTargetUrl(gc_url)
          setSwaped(true) // 目标源替换现在源的动画
          setTimeout(() => {
            setCurrentUrl(gc_url) //替换当前源，动画还原，并发送action 修改 状态
            uploadSameUrl(true)
            setSwaped(false)
          }, 1000)
        }
      }
      picImg.src = gc_url
    } else {
      if (gc_url === '') {
        setIsActived(false)
      } else {
        setIsActived(true)
      }
      setCurrentUrl(gc_url)
    }
  }, [gc_url, sameUrled, uploadSameUrl])

  return (
    <div
      className={[Style.glass_cover_bg, isActived ? Style.bg_active : ''].join(
        ' '
      )}
    >
      {/* currentUrl */}
      <div
        className={[Style.glass_bg, swaped ? Style.glass_hide : ''].join(' ')}
        style={{
          backgroundImage: `url(${currentUrl})`,
        }}
      ></div>
      {/* targetUrl */}
      <div
        className={[Style.glass_bg, swaped ? Style.glass_show : ''].join(' ')}
        style={{
          backgroundImage: `url(${targetUrl})`,
        }}
      ></div>
    </div>
  )
}

export default Glasscover
