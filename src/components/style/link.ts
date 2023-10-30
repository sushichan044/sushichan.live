import { tv } from "tailwind-variants"

const LinkStyle = tv({
  variants: {
    color: {
      primary: "text-blue-500",
      neutral: "text-light dark:text-dark",
    },
    hoverColor: {
      primary: "transition-colors duration-200",
      neutral: "transition-colors duration-200",
    },
    decoration: {
      underline: "underline",
      none: "no-underline",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      class: "hover:text-blue-600",
    },
    {
      color: "neutral",
      hoverColor: "primary",
      class: "hover:text-blue-500",
    },
    {
      color: "neutral",
      hoverColor: "neutral",
      class:
        "hover:text-custom-little-light dark:hover:text-custom-little-dark",
    },
  ],
  defaultVariants: {
    color: "neutral",
    decoration: "underline",
    hoverColor: "primary",
  },
})

export default LinkStyle
