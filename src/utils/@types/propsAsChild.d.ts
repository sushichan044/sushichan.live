import type { SlotProps } from "@radix-ui/react-slot"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

// https://qiita.com/ygkn/items/9a3ca4769c3ba7a24191
export type PropsWithAsChild<
  // コンポーネント独自の props
  Props,
  // asChild がない時の HTML 要素 or コンポーネント
  DefaultElement extends ElementType,
> =
  | // asChild が指定なし or false の時
  // DelautElement の ref 以外の props が指定できる
  (ComponentPropsWithoutRef<DefaultElement> &
      Props & {
        asChild?: false
      }) // asChild が true の時
  // Slot の Props が指定できる
  | (SlotProps &
      Props & {
        asChild: true
        // asChild が true の時は children を必須にしておく
        children: ReactNode
      })
