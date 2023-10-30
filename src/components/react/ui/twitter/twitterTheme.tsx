import { Slot } from "@radix-ui/react-slot"
import React from "react"

import { type PropsWithAsChild } from "@/utils/@types/propsAsChild"

type TwitterThemeProps = {
  theme: "light" | "dark"
}

const TwitterTheme = ({
  theme,
  asChild,
  ...props
}: PropsWithAsChild<TwitterThemeProps, "div">) => {
  const Component = asChild ? Slot : "div"
  return <Component date-theme={theme} {...props} />
}

export { TwitterTheme }
