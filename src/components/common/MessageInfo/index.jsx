/** @format */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import message from '@/configs/message.md'

const MessageInfo = () => {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    fetch(message)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text)
      })
  }, [])
  return (
    <MessageContent
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></MessageContent>
  )
}

const MessageContent = styled.div`
  box-sizing: border-box;
  min-width: 200px;
  max-width: 85%;
  margin: 0 auto;
  padding: 45px;
  color: var(--font-gray-200);
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
`

export default MessageInfo
