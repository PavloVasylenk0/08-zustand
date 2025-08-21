"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const tags = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
] as const;

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const getTagUrl = (tag: string) => {
    if (tag === "All") return "/notes/filter/All";
    return `/notes/filter/${tag}`;
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={handleMenuToggle}
        onBlur={handleMenuClose}
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={getTagUrl(tag)}
                className={css.menuLink}
                onClick={handleLinkClick}
                scroll={false}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
