import type { HTMLAttributes, HTMLTag } from "astro/types"
import type { ComponentPropsWithoutRef, ElementType } from "react"

export type PropsWithoutStyle<
  T extends ElementType | HTMLTag,
  Framework extends "react" | "astro" = "react",
> = Framework extends "react"
  ? Omit<ComponentPropsWithoutRef<T>, "className" | "style">
  : Omit<HTMLAttributes<T>, "class" | "style" | "class:list">
