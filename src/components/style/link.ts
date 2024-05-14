import { tv } from "tailwind-variants";

const LinkStyle = tv({
  compoundVariants: [
    {
      class: "hocus:text-blue-600/60 dark:hocus:text-blue-400/75",
      color: "primary",
    },
    {
      class: "hocus:text-blue-600/80 dark:hocus:text-blue-400",
      color: "neutral",
      hoverColor: "primary",
    },
    {
      class:
        "hocus:text-custom-little-light dark:hocus:text-custom-little-dark",
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
      primary: "text-blue-500 dark:text-blue-400",
    },
    decoration: {
      none: "no-underline",
      underline: "underline underline-offset-4",
    },
    hoverColor: {
      neutral: "transition-colors duration-300",
      primary: "transition-colors duration-300",
    },
  },
});

export default LinkStyle;
