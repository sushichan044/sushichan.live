import type { HTMLAttributes } from "astro/types"

type Experience = {
  description: string
  time: {
    attr: HTMLAttributes<"time">["datetime"]
    label: string
  }
  title: string
}

const EXPERIENCES = [
  {
    description:
      "チャットアプリ上で使うBotの作成をきっかけに、書いたものが動いて人の助けになることに魅力を感じ、プログラミングを学ぶようになりました。",
    time: {
      attr: "2022-04",
      label: "2022年4月",
    },
    title: "プログラミングに出会う",
  },
  {
    description:
      "完成には至りませんでしたが、なにもないところからアプリケーションやAPIを組んでいく楽しさを知りました。この頃から本格的に色々な学習をするようになりました。",
    time: {
      attr: "2022-10",
      label: "2022年10月",
    },
    title: "初めてハッカソンに挑戦する",
  },
  {
    description:
      "Webフロントエンドの開発に触れ、作ったものが世界中どこからでも見れる/使えることに感動しました。この頃から主にフロントエンドの学習や開発をしています。",
    time: {
      attr: "2023-01",
      label: "2023年1月",
    },
    title: "Webフロントエンドに出会う",
  },
] as const satisfies Experience[]

export { EXPERIENCES }
export type { Experience }
