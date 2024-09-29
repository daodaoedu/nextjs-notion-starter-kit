import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

const NAV_LINK = [
  {
    name: "找資源",
    link: "https://www.daoedu.tw/search",
    target: "_blank",
  },
  {
    name: "找夥伴",
    link: "https://www.daoedu.tw/partner",
    target: "_blank",
  },
  {
    name: '找揪團',
    link: 'https://www.daoedu.tw/group',
    target: '_blank',
  },
  {
    name: "找故事",
    link: "/",
    target: "self",
  },
  {
    name: "加入社群",
    link: "https://www.daoedu.tw/join",
    target: "_blank",
  }
];

const LinkListWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  li {
    margin: 0 20px;
    cursor: pointer;
    font-weight: 400;
    color: #fff;
  }
  @media (max-width: 767px) {
    display: none;
  }
`
const List = () => {
  return (
    <LinkListWrapper>
      {NAV_LINK.map(({ name, link, target }) => (
        <li key={name}>
          {target === '_self' ? (
            <Link href={link}>{name}</Link>
          ) : (
            <a href={link} target={target} rel='noopener noreferrer'>
              {name}
            </a>
          )}
        </li>
      ))}
    </LinkListWrapper>
  )
}

export default List
