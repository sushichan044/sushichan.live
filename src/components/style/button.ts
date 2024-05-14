import { tv } from "tailwind-variants";

const ButtonStyle = tv({
  base: "text-light duration-200 dark:text-dark",
  compoundVariants: [
    {
      class: "transition-colors",
      color: ["primary", "secondary"],
    },
    {
      class: "transition-opacity",
      color: ["transparent"],
    },
  ],
  defaultVariants: {
    color: "primary",
    disabled: false,
    size: "medium",
  },
  variants: {
    color: {
      primary: "bg-blue-500 hocus:bg-blue-700",
      secondary: "bg-gray-500 hocus:bg-gray-700",
      transparent:
        "border border-solid border-custom-theme-dark bg-inherit hocus:opacity-75 dark:border-custom-theme-light",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
    size: {
      "2xl": "rounded-2xl px-6 py-5 text-2xl",
      "large": "rounded-lg px-4 py-3 text-lg",
      "medium": "rounded-md px-3 py-2 text-base",
      "small": "rounded px-2 py-1 text-sm",
      "xl": "rounded-xl px-5 py-4 text-xl",
    },
  },
});

export default ButtonStyle;
