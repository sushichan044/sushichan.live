import { tv } from "tailwind-variants"

const ButtonStyle = tv({
  base: "text-light duration-200 dark:text-dark",
  variants: {
    color: {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-gray-500 hover:bg-gray-700",
      transparent:
        "border border-solid border-custom-theme-light bg-inherit hover:opacity-75 dark:border-custom-theme-dark",
    },
    size: {
      small: "rounded px-2 py-1 text-sm",
      medium: "rounded-md px-3 py-2 text-base",
      large: "rounded-lg px-4 py-3 text-lg",
      xl: "rounded-xl px-5 py-4 text-xl",
      "2xl": "rounded-2xl px-6 py-5 text-2xl",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
  },
  compoundVariants: [
    {
      color: ["primary", "secondary"],
      class: "transition-colors",
    },
    {
      color: ["transparent"],
      class: "transition-opacity",
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "medium",
    disabled: false,
  },
})

export default ButtonStyle
