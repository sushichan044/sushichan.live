"use client"

import type { VariantProps } from "tailwind-variants"

import ButtonStyle from "@/components/style/button"
import React from "react"

type ButtonProps = Omit<React.ComponentProps<"button">, "role"> & {
  role: React.HTMLAttributes<HTMLButtonElement>["role"]
}

type ButtonVariantProps = VariantProps<typeof ButtonStyle>

type Props = ButtonProps & {
  children: React.ReactNode
  variants?: ButtonVariantProps
}

const Button = ({
  children,
  className,
  onClick,
  variants,
  ...props
}: Props) => {
  return (
    <button
      className={ButtonStyle({ ...variants, className })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
