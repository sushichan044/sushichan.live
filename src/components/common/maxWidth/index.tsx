import React, { type ComponentPropsWithoutRef } from "react"
import { tv } from "tailwind-variants"

type MaxWidth = "content" | "full"
type Props = ComponentPropsWithoutRef<"div"> & {
  type?: MaxWidth
}

const style = tv({
  defaultVariants: {
    maxWidth: "content",
  },
  variants: {
    maxWidth: {
      content: "max-w-screen-md",
      full: "max-w-full",
    },
  },
})

const MaxWidth = ({ children, type, ...props }: Props) => {
  return (
    <div className={style({ maxWidth: type })} {...props}>
      {children}
    </div>
  )
}

export default MaxWidth
