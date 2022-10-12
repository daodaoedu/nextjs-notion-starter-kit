import * as React from 'react'
import styled from '@emotion/styled'
import SubFooter from './SubFooter'
import MainFooter from './MainFooter'

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #536166;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Footer: React.FC = () => {
  return (
    // <footer className={styles.footer}>
    <FooterWrapper>
      <MainFooter />
      <SubFooter />
    </FooterWrapper>
    // </footer>
  )
}

