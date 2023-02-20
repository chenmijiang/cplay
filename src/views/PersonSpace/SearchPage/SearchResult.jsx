import React from 'react'

import SongsDisplay from '@/components/SongsDisplay'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const SearchResult = React.memo(({ searchHandler }) => {
  const songs = useSelector((state) => state.search.songs)
  const [searchParams] = useSearchParams()
  const scrollToBottom = (callback) => {
    if (songs.length <= 60) {
      console.log(searchParams.get('keywords'))
      console.log('加载更多数据')
      callback({ loading: false, isError: false })
    }
  }
  return (
    <div>
      <SongsDisplay
        songs={songs}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
})

export default SearchResult
