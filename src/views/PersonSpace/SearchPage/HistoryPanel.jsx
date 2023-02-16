import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { clearHistory } from '@/store/search.slice'
import Icon from '@/components/common/IconSvg'

const HistoryPanel = React.memo(({ restoreHistory }) => {
  const { history } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const restoreHandler = (e) => {
    if (e.target.className !== 'history_item') return
    let keywords = e.target.innerText
    restoreHistory(keywords)
  }
  const clearHistoryHandler = () => {
    dispatch(clearHistory())
  }
  return (
    <HistoryPanelWrapper>
      {history.length === 0 ? (
        <p>暂无搜索历史</p>
      ) : (
        <>
          <div
            className="history_items"
            onClick={restoreHandler}
          >
            {history.map((item, index) => (
              <div
                className="history_item"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="history_handle">
            <div
              className="clear_history"
              onClick={clearHistoryHandler}
            >
              <Icon name="garbage" />
              <span>清除历史</span>
            </div>
          </div>
        </>
      )}
    </HistoryPanelWrapper>
  )
})

const HistoryPanelWrapper = styled.div`
  width: 800px;
  & > p {
    color: var(--font-gray-200);
    font-size: 15px;
    margin: 20px;
    text-align: center;
  }
  .history_item,
  .clear_history {
    display: inline-block;
    padding: 5px 7px;
    background-color: var(--bg-gray-100);
    margin: 10px;
    color: var(--font-white-100);
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
  }
  .history_handle {
    width: 100%;
    height: 50px;
  }
  .clear_history {
    float: right;
    padding: 5px 10px;
    font-size: 15px;
    svg {
      width: 14px;
      height: 14px;
      fill: var(--bg-white-100);
      margin-right: 3px;
    }
  }
`

export default HistoryPanel
