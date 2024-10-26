"use client";

import type React from "react";
import type { VariantProps } from "tailwind-variants";

import ButtonStyle from "@/components/style/button";

type ButtonProps = {
  role: React.ButtonHTMLAttributes<HTMLButtonElement>["role"];
  type: Exclude<
    React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    undefined
  >;
} & Omit<React.ComponentProps<"button">, "role" | "type">;

type ButtonVariantProps = VariantProps<typeof ButtonStyle>;

type Props = {
  children: React.ReactNode;
  variants?: ButtonVariantProps;
} & ButtonProps;

const Button = ({
  children,
  className,
  onClick,
  role,
  type,
  variants,
  ...props
}: Props) => {
  return (
    <button
      className={ButtonStyle({ ...variants, className })}
      onClick={onClick}
      role={role}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
