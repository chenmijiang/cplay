import React, { useState } from 'react'

import styled from 'styled-components'

import Icon from '@/components/common/IconSvg'

const SearchInput = React.memo(({ getKeywords }) => {
  const [keywords, setKeywords] = useState('')
  return (
    <SearchInputWrapper keywords={keywords}>
      <div className="searchbox">
        {/* 搜索图标 */}
        <div
          className="search_btn"
          onClick={() => {
            getKeywords && getKeywords(keywords)
          }}
        >
          <Icon name="search" />
        </div>
        {/* 搜索框 */}
        <input
          className="search_input"
          type="text"
          maxLength="100"
          placeholder="搜索音乐..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        {/* 清除操作图标 */}
        <div
          className="search_clear"
          onClick={() => setKeywords('')}
        >
          <Icon name="clear" />
        </div>
      </div>
    </SearchInputWrapper>
  )
})

const SearchInputWrapper = styled.div`
  border-bottom: 1px solid var(--bg-gray-100);
  background-color: var(--bg-white-100);
  position: sticky;
  top: 20px;
  left: 0;
  .searchbox {
    width: 670px;
    height: 46px;
    display: flex;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);
    border-radius: 26px;
    margin: 20px 0px;
    &:hover {
      box-shadow: 0 0 0 1px rgb(0 0 0 / 10%), 0 2px 4px 1px rgb(0 0 0 / 18%);
    }
  }
  .search_input {
    flex: 1;
    font-size: 16px;
    color: var(--font-gray-200);
  }
  .search_btn svg,
  .search_clear svg {
    width: 30px;
    height: 30px;
    margin: 8px 10px;
    border-radius: 50%;
    fill: var(--bg-gray-100);
    cursor: pointer;
  }
  .search_clear svg {
    width: 20px;
    margin: 8px 16px;
  }
  .search_clear {
    visibility: ${({ keywords }) => (keywords !== '' ? 'visible' : 'hidden')};
  }
`

export default SearchInput
