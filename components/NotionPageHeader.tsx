import * as React from 'react'
import * as types from 'notion-types'
import { Box } from '@mui/material'

// import cs from 'classnames'
// import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
// import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
// import { Header, Breadcrumbs, Search, useNotionContext } from 'react-notion-x'

// import { useDarkMode } from 'lib/use-dark-mode'
// import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'

// import styles from './styles.module.css'

// const ToggleThemeButton = () => {
//   const [hasMounted, setHasMounted] = React.useState(false)
//   const { isDarkMode, toggleDarkMode } = useDarkMode()

//   React.useEffect(() => {
//     setHasMounted(true)
//   }, [])

//   const onToggleTheme = React.useCallback(() => {
//     toggleDarkMode()
//   }, [toggleDarkMode])

//   return (
//     <div
//       className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
//       onClick={onToggleTheme}
//     >
//       {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
//     </div>
//   )
// }

const NAV_LINK = [
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
    name: "加入社群",
    link: "https://www.facebook.com/groups/2237666046370459",
    target: "_blank",
  },
  {
    name: "部落格",
    link: null,
    target: null,
  },
];

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = () => {
  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "auto 0" }}>
          <img src="/logo.png" alt="logo" width={108} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {
              NAV_LINK.map(({ name, link, target }) => (
                <Box
                  key={name}
                  sx={{
                    // fontWeight: '500',
                    margin: "0 24px",
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {link && target
                    ? (<a href={link} target={target}>{name}</a>)
                    : (<Box sx={{ borderBottom: "2px solid #fff", paddingBottom: "1px" }}>{name}</Box>)
                  }
                </Box>
              ))
            }
          </Box>
          <Box
            sx={{
              fontSize: '16px',
              lineHeight: '140%',
              color: "#fff",
              cursor: "pointer",
            }}
          >
            新增資源
          </Box>
        </Box>
      </div>
    </header >
  )
}
