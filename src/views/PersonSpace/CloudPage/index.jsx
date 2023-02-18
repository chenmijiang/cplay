import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { pageVariant } from '@/variants'

const CloudPage = () => {
  return (
    <CloudPageWrapper
      variants={pageVariant}
      initial="enter"
      animate="show"
      transition="transition"
      exit="exit"
      key="historyPage"
    >
      welcome to cloud page
    </CloudPageWrapper>
  )
}

const CloudPageWrapper = styled(motion.div)`
  width: 95%;
  margin: 0 auto;
  text-align: center;
  line-height: calc(100vh - 164px);
`

export default CloudPage
