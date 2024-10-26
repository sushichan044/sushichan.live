"use client";
import type { ComponentProps } from "react";
import type React from "react";

import styles from "@/components/react/layout/navigation/styles.module.scss";
import LinkStyle from "@/components/style/link";
import * as NavMenu from "@radix-ui/react-navigation-menu";

type NavLinkProps = {
  topPath: string;
} & ComponentProps<typeof NavMenu.Link>;
const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  topPath,
  ...props
}) => {
  const isActive = topPath === href;

  return (
    <NavMenu.Link
      active={isActive}
      asChild
      className={styles.indicator}
      {...props}
    >
      <a
        className={LinkStyle({ color: "neutral", decoration: "none" })}
        href={href}
      >
        {children}
      </a>
    </NavMenu.Link>
  );
};

const NavigationMenu = ({ topPath }: { topPath: string }) => {
  return (
    <NavMenu.Root className={styles["menu-root"]}>
      <NavMenu.List className={styles["menu-list"]}>
        <NavMenu.Item>
          <NavLink href="/about" topPath={topPath}>
            <p>About</p>
          </NavLink>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavLink href="/blog" topPath={topPath}>
            <p>Blog</p>
          </NavLink>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavLink href="/portfolio" topPath={topPath}>
            <p>Portfolio</p>
          </NavLink>
        </NavMenu.Item>
      </NavMenu.List>
    </NavMenu.Root>
  );
};

export default NavigationMenu;
