import React, { useState } from "react"
import { NavBar as Nav } from "./Nav"
import { Search } from "./aiSearch/Search"
import { getNavigationProps } from "./getNavigationProps"
import { useNavBar } from "./useNavBar/useNavBar"
import styles from "./scroll.module.css"

export const NavBar = ({ path, showSearch = true }: { path: string; showSearch?: boolean }) => {
  const navRef = React.useRef(null)

  const { setNavBarInfo } = useNavBar()

  const onHideChange = (hidden: boolean) => {
    if (navRef.current) {
      /* This method calculate the height required for the sticky headers within the page content.
      / - The height is determined by two different factors:
      / - if the page has been scrolled down and the header is hidden
      / - if the page is a inner doc page or part of the "pathWithoutDocNav" or not
      */
      const pathWithoutDocNav = ["/quickstarts/"]
      const shouldAddDocNavigation = !pathWithoutDocNav.some((p) => path.includes(p))
      const innerDocNavHeight = 56
      let height = (navRef.current as HTMLElement).clientHeight
      let baseHeightNoNav = 0
      if (shouldAddDocNavigation) {
        height += innerDocNavHeight
        baseHeightNoNav += innerDocNavHeight
      }
      const elements = document.body.querySelectorAll("[data-sticky]")
      elements.forEach((e: HTMLElement) => {
        if (!e.classList.contains(styles.animateTop)) {
          e.classList.add(styles.animateTop)
        }
        e.style.top = `${hidden ? baseHeightNoNav : height}px`
      })
      setNavBarInfo({ hidden, height })
    }
  }

  return (
    <span ref={navRef}>
      <Nav
        {...getNavigationProps()}
        path={path}
        searchTrigger={showSearch ? <Search /> : undefined}
        onHideChange={onHideChange}
      />
    </span>
  )
}
