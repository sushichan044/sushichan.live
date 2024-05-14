import type { HTMLAttributes, HTMLTag } from "astro/types";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export type JSXProps<
  T extends ElementType | HTMLTag,
  Framework extends "astro" | "react" = "react",
> = Framework extends "react" ? ReactProps<T> : AstroProps<T>;

export type AstroProps<T extends HTMLTag> = HTMLAttributes<T>;

export type ReactProps<T extends ElementType> = ComponentPropsWithoutRef<T>;
