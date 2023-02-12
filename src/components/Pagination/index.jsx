import React, { useState } from 'react'
import styled from 'styled-components'

const Pagination = React.memo(
  ({ page, itemsPerPage, totalItems, onChangePage }) => {
    const [currentPage, setCurrentPage] = useState(page)
    function handlePageClick(page) {
      setCurrentPage(page)
      onChangePage(page)
    }
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    let showList = limitedPageList(pageNumbers, currentPage, 8)

    return (
      <PaginationWrapper>
        <ul className="pagination">
          {currentPage !== 1 && (
            <li className="page-item">
              <button
                className="page-pre"
                onClick={() => handlePageClick(currentPage - 1)}
              >
                上一页
              </button>
            </li>
          )}
          {showList.map((page, index) => (
            <li
              key={index}
              className="page-item"
            >
              {page === '...' ? (
                page
              ) : (
                <button
                  className="page-link"
                  onClick={() => handlePageClick(page)}
                  style={{
                    backgroundColor:
                      page === currentPage
                        ? 'var(--bg-gray-100)'
                        : 'var(--bg-white-100)',
                    color: page === currentPage ? 'var(--font-white-100)' : '',
                  }}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
          {currentPage !== totalPages && (
            <li className="page-item">
              <button
                className="page-next"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                下一页
              </button>
            </li>
          )}
        </ul>
      </PaginationWrapper>
    )
  }
)

const limitedPageList = (pageList, currentPage, limit) => {
  let leftCount = Math.floor(limit / 2)
  let rightCount = Math.ceil(limit / 2) - 1
  let showList = []
  if (pageList.length <= limit) {
    showList = pageList
  } else {
    if (currentPage <= leftCount) {
      showList = pageList.slice(0, limit - 1).concat(['...'])
    } else if (currentPage >= pageList[pageList.length - 1] - rightCount) {
      showList = ['...'].concat(pageList.slice(-limit + 1))
    } else {
      showList = ['...']
        .concat(
          pageList.slice(currentPage - leftCount, currentPage + rightCount)
        )
        .concat(['...'])
    }
  }
  return showList
}

const PaginationWrapper = styled.div`
  height: 100px;
  .pagination {
    display: flex;
    height: inherit;
    align-items: center;
    .page-pre,
    .page-next {
      background-color: var(--bg-gray-100);
      color: var(--font-white-100);
    }
    .page-item {
      color: var(--font-gray-200);
    }
    .page-link,
    .page-pre,
    .page-next {
      padding: 5px 7px;
      margin: 10px;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }
  }
`

export default Pagination
