"use client";
import type { ComponentProps } from "react";
import type React from "react";

import * as NavMenu from "@radix-ui/react-navigation-menu";

import LinkStyle from "../../../style/link";
import styles from "./styles.module.scss";

type NavLinkProps = ComponentProps<typeof NavMenu.Link> & {
  topPath: string;
};
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
