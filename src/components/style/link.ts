import { tv } from "tailwind-variants"

const LinkStyle = tv({
  compoundVariants: [
    {
      class: "hover:text-blue-600",
      color: "primary",
    },
    {
      class: "hover:text-blue-500",
      color: "neutral",
      hoverColor: "primary",
    },
    {
      class:
        "hover:text-custom-little-light dark:hover:text-custom-little-dark",
      color: "neutral",
      hoverColor: "neutral",
    },
  ],
  defaultVariants: {
    color: "neutral",
    decoration: "underline",
    hoverColor: "primary",
  },
  variants: {
    color: {
      neutral: "text-light dark:text-dark",
      primary: "text-blue-500",
    },
    decoration: {
      none: "no-underline",
      underline: "underline underline-offset-[3px]",
    },
    hoverColor: {
      neutral: "transition-colors duration-200",
      primary: "transition-colors duration-200",
    },
  },
})

export default LinkStyle
