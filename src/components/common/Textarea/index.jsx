/** @format */

import React, { forwardRef } from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

// 使用 contenteditable 属性 代替 textarea
// 修改滚动条样式
// 模拟 placeholder
const Textarea = forwardRef(({ placeholder, scrollbarName = 'scrollbar', ...props }, ref) => {
  return (
    <CustomTextarea {...props}>
      <SimpleBar className={scrollbarName} style={{ height: 'inherit' }}>
        <div
          className="custom-textarea"
          contentEditable="true"
          placeholder={placeholder}
          ref={ref}
          // onChange={onChange}
        ></div>
      </SimpleBar>
    </CustomTextarea>
  )
})

const CustomTextarea = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid var(--bg-gray-100);
  background-color: var(--bg-white-100);
  .custom-textarea {
    height: 600px;
    width: 100%;
    padding: 4px 36px 4px 5px;
    box-sizing: border-box;
    border: none;
    font-size: 12px;
    font-family: inherit;
    outline: none;
    color: var(--font-gray-200);
  }
  .custom-textarea[contenteditable]:empty::before {
    content: attr(placeholder);
    color: var(--bg-gray-100);
  }
`

export default Textarea
