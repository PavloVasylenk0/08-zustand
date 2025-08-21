import css from "./SidebarNotes.module.css";

const tags = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
] as const;

export default function SidebarNotes() {
  const getTagUrl = (tag: string) => {
    if (tag === "All") return "/notes/filter/All";
    return `/notes/filter/${tag}`;
  };

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a href={getTagUrl(tag)} className={css.menuLink}>
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
