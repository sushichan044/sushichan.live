import React from "react"

import { TweetBase } from "@/components/react/ui/twitter/tweetBase"
import { TwitterTheme } from "@/components/react/ui/twitter/twitterTheme"
import type { TweetProps } from "@/components/react/ui/twitter/types"
import s from "@/components/ui/twitter/tweet.module.scss"

const Tweet = ({ id, theme }: TweetProps) => {
  return (
    <>
      {theme === undefined ? (
        <div className={s.root}>
          <TweetBase id={id} />
        </div>
      ) : (
        <TwitterTheme asChild theme={theme}>
          <div className={s.root}>
            <TweetBase id={id} />
          </div>
        </TwitterTheme>
      )}
    </>
  )
}

export { Tweet }
