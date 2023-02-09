import React, { useState } from 'react'
import { connect } from 'react-redux'

import search from '@/store/search'

const SearchPage = ({ searchDispatch }) => {
  const [keywords, setKeywords] = useState('')
  return (
    <div>
      <input
        type="text"
        value={keywords}
        onChange={(e) => {
          setKeywords(e.target.value)
        }}
      />
      <button
        onClick={() => {
          searchDispatch(keywords)
        }}
      >
        提交
      </button>
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

const mapDispatchToProps = {
  searchDispatch: search.asyncActions.search,
}

export default connect(null, mapDispatchToProps)(SearchPage)
