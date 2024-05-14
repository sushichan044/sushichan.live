"use client";

import type { VariantProps } from "tailwind-variants";

import ButtonStyle from "@/components/style/button";
import React from "react";

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
