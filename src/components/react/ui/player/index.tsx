import type { YouTubeConfig } from "react-player/youtube";

import { useId } from "react";
import ReactPlayer from "react-player";

import { declareLet } from "../../../../utils/declareLet";

type Props = {
  muted?: boolean;
  url: string;
};

const videoRegex = /https:\/\/www\.youtube\.com\/watch\?.*v=(?<id>[^&]+)/;
const playlistRegex =
  /https:\/\/www\.youtube\.com\/playlist\?.*list=(?<id>[^&]+)/;

// add lazy load
const Player = ({ muted = true, url }: Props) => {
  const twitchPlayerId = useId();
  const youtubePlayerOptions = declareLet<YouTubeConfig>(() => {
    const baseConfig: YouTubeConfig = {
      embedOptions: {
        autoplay: 0,
        cc_lang_pref: "ja",
      },
    };

    if (videoRegex.test(url)) {
      return baseConfig;
    }

    if (playlistRegex.test(url)) {
      const { groups } = playlistRegex.exec(url) ?? {};

      return {
        ...baseConfig,
        playerVars: { list: groups?.["id"], listType: "playlist" },
      };
    }

    return baseConfig;
  });
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
      url={url}
      width="100%"
      {...(muted ? { muted: true } : { muted: false, volume: 0.05 })}
    />
  );
};

export default Player;
