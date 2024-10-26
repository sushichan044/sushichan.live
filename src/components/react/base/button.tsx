"use client";

import type React from "react";
import type { VariantProps } from "tailwind-variants";

import ButtonStyle from "@/components/style/button";

type ButtonProps = {
  role: React.HTMLAttributes<HTMLButtonElement>["role"];
} & Omit<React.ComponentProps<"button">, "role">;

type ButtonVariantProps = VariantProps<typeof ButtonStyle>;

type Props = {
  children: React.ReactNode;
  variants?: ButtonVariantProps;
} & ButtonProps;

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
  );
};

export default Button;
