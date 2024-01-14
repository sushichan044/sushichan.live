import type { HTMLAttributes } from "astro/types"

type Experience = {
  description: string
  time:
    | {
        data: {
          attr: HTMLAttributes<"time">["datetime"]
          label: string
        }
        range: false
      }
    | {
        data: {
          from: {
            attr: HTMLAttributes<"time">["datetime"]
            label: string
          }
          to?: {
            attr: HTMLAttributes<"time">["datetime"]
            label: string
          }
        }
        range: true
      }
  title: string
}

const EXPERIENCES = [
  {
    description:
      "チャットアプリ上で使うBotの作成をきっかけに、書いたものが動いて人の助けになることに魅力を感じ、プログラミングを学ぶようになりました。",
    time: {
      data: {
        attr: "2022-03",
        label: "2022年3月",
      },
      range: false,
    },
    title: "プログラミングに出会う",
  },
  {
    description: "",
    time: {
      data: {
        attr: "2022-04",
        label: "2022年4月",
      },
      range: false,
    },
    title: "電気通信大学 入学",
  },
  {
    description:
      "完成には至りませんでしたが、なにもないところからアプリケーションやAPIを組んでいく楽しさを知りました。この頃から本格的に色々な学習をするようになりました。",
    time: {
      data: {
        attr: "2022-10",
        label: "2022年10月",
      },
      range: false,
    },
    title: "初めてハッカソンに挑戦する",
  },
  {
    description:
      "Webフロントエンドの開発に触れ、作ったものが世界中どこからでも見れる/使えることに感動しました。この頃から主にフロントエンドの学習や開発をしています。",
    time: {
      data: {
        attr: "2023-01",
        label: "2023年1月",
      },
      range: false,
    },
    title: "Webフロントエンドに出会う",
  },
  {
    description:
      "第73回調布祭実行委員会に所属し、新歓特設サイトや調布祭公式サイトの制作を主導しました。あわせてインフラ基盤の刷新も行い、大幅な高速化・省力化に成功しました。",
    time: {
      data: {
        from: {
          attr: "2023-04",
          label: "2023年4月",
        },
        to: {
          attr: "2023-11",
          label: "2023年11月",
        },
      },
      range: true,
    },
    title: "調布祭実行委員会 技術担当",
  },
  {
    description:
      "調布祭実行委員会での経験を活かし、Webサイトの改修やクラウド基盤の更新による費用削減に取り組んでいます。",
    time: {
      data: {
        from: {
          attr: "2023-11",
          label: "2023年11月",
        },
      },
      range: true,
    },
    title: "バーチャルライブ研究会",
  },
] as const satisfies Experience[]

export { EXPERIENCES }
export type { Experience }
