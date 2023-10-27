import { tv } from "tailwind-variants"

export const LinkStyle = tv({
  variants: {
    color: {
      primary: "text-blue-500",
      neutral: "text-white",
    },
    hoverColor: {
      primary: "transition-colors duration-200 hover:text-blue-300",
      neutral: "transition-colors duration-200 hover:text-white",
    },
    decoration: {
      underline: "underline",
      none: "no-underline",
    },
  },
  defaultVariants: {
    color: "neutral",
    decoration: "underline",
    hoverColor: "primary",
  },
})
