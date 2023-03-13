/** @format */

import { useRef } from 'react'

import { formatLyrics } from '@/utils/file_parser'

export default function useLyricsContent() {
  const lyrics = useRef([])
  const timeShaft = useRef([])
  const isLyricsEmpty = useRef(false)
  const lyricsContentRef = useRef()

  function lyricsContentListener() {
    let content = lyricsContentRef.current.innerText.trim()
    if (content !== '') {
      content = formatLyrics(content)
      lyrics.current = content
      timeShaft.current = new Array(content.length).fill('00:00.000')
      isLyricsEmpty.current = true
    }
  }

  return [[lyrics, timeShaft, isLyricsEmpty], lyricsContentRef, lyricsContentListener]
}
