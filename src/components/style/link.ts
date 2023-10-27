import { tv } from "tailwind-variants"

const LinkStyle = tv({
  variants: {
    color: {
      primary: "text-blue-500",
      neutral: "text-light dark:text-dark",
    },
    hoverColor: {
      primary: "transition-colors duration-200 hover:text-blue-600",
      neutral: "transition-colors duration-200 hover:text-blue-600",
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

export default LinkStyle
