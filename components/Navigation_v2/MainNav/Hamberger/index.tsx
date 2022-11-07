import React, { useState } from 'react'
import styled from '@emotion/styled'
import MenuButton from './MenuButton'
import MenuList from './MenuList'

const NAV_LINK_MOBILE = [
  {
    name: "找資源",
    link: "https://www.daoedu.tw/search",
    target: "_blank",
  },
  {
    name: "找活動",
    link: "https://www.daoedu.tw/activities",
    target: "_blank",
  },
  {
    name: "找故事",
    link: "/",
    target: "self",
  },
  {
    name: "加入社群",
    link: "https://www.facebook.com/groups/2237666046370459",
    target: "_blank",
  },
  {
    name: "教育場域",
    link: "https://www.daoedu.tw/locations",
    target: "_blank",
  },
];

const MobileLinkListWrapper = styled.ul`
  display: none;
  @media (max-width: 767px) {
    display: block;
    position: relative;
    ul {
      display: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
      position: absolute;
      top: 0;
    }

    li {
      flex: none;
      width: 100%;
      border-bottom: solid 1px white;
    }

    svg[type='menu']:checked + ul {
      display: block;
      width: 100%;
      background: #999;
    }

    label {
      display: block;
    }

    svg[type='menu']:checked + ul li:nth-of-type(1) {
      background: #777;
      color: #fff;
    }
  }
`

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <MobileLinkListWrapper>
      <MenuList
        open={isMenuOpen}
        onCloseMenu={() => setIsMenuOpen(false)}
        list={NAV_LINK_MOBILE}
      />
      <MenuButton
        open={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        color='white'
      />
    </MobileLinkListWrapper>
  )
}

export default MainNav
