import { useState, useRef } from 'react'

import { formatLyrics } from '@/utils/file_parser'

export default function useLyricsContent() {
  const [lyrics, setLyrics] = useState([])
  const [timeShaft, setTimeShaft] = useState([])
  const [isLyricsEmpty, setIsLyricsEmpty] = useState(false)
  const lyricsContentRef = useRef()

  function lyricsContentListener() {
    let content = lyricsContentRef.current.value.trim()
    if (content !== '') {
      content = formatLyrics(content)
      setLyrics(content)
      setTimeShaft(new Array(content.length).fill(0))
      setIsLyricsEmpty(true)
    }
  }

  return [
    [lyrics, timeShaft, isLyricsEmpty],
    lyricsContentRef,
    lyricsContentListener
  ]
}