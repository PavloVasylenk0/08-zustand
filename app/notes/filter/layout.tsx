import { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function LayoutNotes({ sidebar, children }: LayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
