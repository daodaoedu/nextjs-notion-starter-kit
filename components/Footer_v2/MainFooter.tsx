import React from 'react'
import styled from '@emotion/styled'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import IntroList from './IntroList'
import IconList from './IconList'

const FOOTER_LINK = [
  {
    name: '找資源',
    link: 'https://www.daoedu.tw/search',
    target: '_blank'
  },
  {
    name: '找活動',
    link: 'https://www.daoedu.tw/activities',
    target: '_blank'
  },
  {
    name: '加入社群',
    link: 'https://www.facebook.com/groups/2237666046370459',
    target: '_blank'
  },
  {
    name: '教育場域',
    link: 'https://www.daoedu.tw/locations',
    target: '_blank'
  },
  {
    name: '隱私權政策',
    link: 'https://www.daoedu.tw/privacypolicy',
    target: '_blank'
  }
]

const MainFooterWrapper = styled.div`
  height: 100%;
  background-color: #536166;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  font-size: 16px;
  letter-spacing: 0.08em;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`

const LogoWrapper = styled.div`
  margin: 0 10px;
  cursor: pointer;
`

const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`

const aboutDaoConfig = [
  {
    name: '關於島島',
    link: '/about',
    target: '_self'
  },
  {
    name: '體驗問卷',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeyU9-Q-kIWp5uutcik3h-RO4o5VuG6oG0m-4u1Ua18EOu3aw/viewform',
    target: '_blank'
  }
]

const iconListConfig = [
  {
    icon: <FaInstagram size='18' />,
    link: 'https://www.instagram.com/daodao_edu/',
    alt: 'instagram'
  },
  {
    icon: <FaFacebook size='18' />,
    link: 'https://www.facebook.com/daodao.edu',
    alt: 'facebook'
  }
]

const SubFooter = () => {
  return (
    <MainFooterWrapper>
      <BlockWrapper>
        {/* //img */}
        <LogoWrapper>
          <img src='/logo.png' alt='daodao' width='106' height='50' />
        </LogoWrapper>
      </BlockWrapper>
      <BlockWrapper>
        {/* 連結 */}
        <IntroList list={aboutDaoConfig} />
        <IntroList list={FOOTER_LINK} />
      </BlockWrapper>
      <BlockWrapper>
        {/* 追蹤島島 */}
        <IconList title='追蹤島島' list={iconListConfig} />
      </BlockWrapper>
    </MainFooterWrapper>
  )
}

export default SubFooter
