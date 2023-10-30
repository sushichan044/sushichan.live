import type React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import type { PropsWithoutStyle } from "@/utils/@types/propsWithoutStyle"

const style = tv({})

export type ButtonVariants = VariantProps<typeof style>

type ButtonProps = Omit<PropsWithoutStyle<"button", "react">, "role"> & {
  role: React.HTMLAttributes<HTMLButtonElement>["role"]
}
type Props = ButtonProps & {
  variants?: ButtonVariants
  children: React.ReactNode
}

const Button = ({ children, onClick, ...props }: Props) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
