import React from "react";
import { conf } from "../../server/config";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { serif } from "../styles/fonts";

const navCss = css({
  width: "100%",
  position: "relative",
  margin: 0,
  padding: 0,
  borderBottom: 0,
  listStyleType: "none",
  overflow: "hidden",
  zIndex: 2,
  background: "#fafafa",
  tableLayout: "fixed",
  gridTemplateColumns: "repeat(auto-fit, minmax(40%, 1fr))",
  gridColumnGap: "0.125rem",
  display: "grid",

  [minWidth.desktop]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(7.5rem, 1fr))"
  }
});

const navLinkCss = (local: boolean | undefined) =>
  css({
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    fontFamily: serif,
    display: "block",
    boxSizing: "border-box",
    minHeight: "36px",
    padding: "4px 6px 0",
    textAlign: "left",
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: local ? palette.white : palette.neutral["6"],
    color: "inherit"
  });

const navItemCss = (local: boolean | undefined) =>
  css({
    margin: 0,
    borderBottom: `0.0625rem solid ${
      local ? palette.white : palette.neutral["5"]
    }`,
    borderTop: `0.1875rem solid ${palette.neutral["6"]}`,
    display: "table-cell",
    width: "100%"
  });

export interface NavItem {
  title: string;
  link: string;
  local?: boolean;
}

export interface NavLinks {
  publicProfile: NavItem;
  accountDetails: NavItem;
  membership: NavItem;
  digiPack: NavItem;
  contributions: NavItem;
  emailPrefs: NavItem;
}

export const navLinks: NavLinks = {
  publicProfile: {
    title: "Public profile",
    link: "/public/edit"
  },
  accountDetails: {
    title: "Account details",
    link: "/account/edit"
  },
  membership: {
    title: "Membership",
    link: "/membership",
    local: true
  },
  digiPack: {
    title: "Digital Pack",
    link: "/digitalpack/edit"
  },
  contributions: {
    title: "Contributions",
    link: "/contribution/recurring/edit"
  },
  emailPrefs: {
    title: "Emails & marketing",
    link: "/email-prefs"
  }
};

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

export const qualifyLink = (navItem: NavItem) =>
  navItem.local ? navItem.link : `https://profile.${domain}${navItem.link}`;

export const Nav = () => (
  <ul role="tablist" className={navCss}>
    {Object.values(navLinks).map((navItem: NavItem) => (
      <li className={navItemCss(navItem.local)} key={navItem.title}>
        <a className={navLinkCss(navItem.local)} href={qualifyLink(navItem)}>
          {navItem.title}
        </a>
      </li>
    ))}
  </ul>
);
