import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { pageVariant } from '@/variants'

const HostoryPage = () => {
  return (
    <HistoryPageWrapper
    variants={pageVariant}
    initial="enter"
    animate="show"
    transition="transition"
    exit="exit"
      key="historyPage"
    >
      welcome to history page
    </HistoryPageWrapper>
  )
}

const HistoryPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
  text-align: center;
  line-height: calc(100vh - 164px);
`

export default HostoryPage
