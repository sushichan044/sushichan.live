import React, { useId } from "react"
import ReactPlayer from "react-player"

type Props = {
  url: string
}
// add lazy load
const Player = ({ url }: Props) => {
  const twitchPlayerId = useId()
  const youtubePlayerOptions = (() => {
    const videoRegex = /https:\/\/www\.youtube\.com\/watch\?.*v=(?<id>[^&]+)/
    const playlistRegex =
      /https:\/\/www\.youtube\.com\/playlist\?.*list=(?<id>[^&]+)/

    const baseConfig = {
      embedOptions: {
        autoplay: 0,
        cc_lang_pref: "ja",
      },
    }

    if (videoRegex.test(url)) {
      return baseConfig
    }

    if (playlistRegex.test(url)) {
      const { groups } = playlistRegex.exec(url) ?? {}

      return {
        ...baseConfig,
        playerVars: { list: groups?.id, listType: "playlist" },
      }
    }

    return baseConfig
  })()
  return (
    <ReactPlayer
      className="aspect-16/9 rounded-lg [&>*]:rounded-lg [&_iframe]:rounded-lg"
      config={{
        soundcloud: {
          options: {
            autoplay: false,
          },
        },
        twitch: {
          options: {
            autoplay: false,
          },
          playerId: twitchPlayerId,
        },
        youtube: { ...youtubePlayerOptions },
      }}
      controls
      height="100%"
      light
      muted
      url={url}
      volume={0.5}
      width="100%"
    />
  )
}

export default Player
