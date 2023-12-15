"use client"

import styles from "@/components/react/utils/spoiler/spoiler.module.scss"
import { parseBoolean } from "@/utils/string"
import React, { useId, useRef } from "react"

type Props = {
  children: React.ReactNode
}

const Spoiler = ({ children }: Props) => {
  const id = useId()
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  const onClick = () => {
    if (!wrapperRef.current || !contentRef.current) {
      return
    }
    const wrapper = wrapperRef.current
    const content = contentRef.current

    wrapper.ariaExpanded = (!parseBoolean(wrapper.ariaExpanded)).toString()
    content.ariaHidden = (!parseBoolean(content.ariaHidden)).toString()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <span
      aria-controls={id}
      aria-expanded="false"
      aria-label="Spoiler"
      className={styles.root}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={wrapperRef}
      role="button"
      tabIndex={0}
      title="クリックして表示/非表示を切り替え"
    >
      <span aria-hidden className={styles.content} id={id} ref={contentRef}>
        {children}
      </span>
    </span>
  )
}

export default Spoiler
