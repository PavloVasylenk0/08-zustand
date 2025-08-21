import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function NoteList({
  notes,
  onDelete,
  isDeleting = false,
}: NoteListProps) {
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
          </div>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              <Link
                href={`/notes/${note.id}`}
                className={css.link}
                scroll={false}
              >
                View
              </Link>
              {onDelete && (
                <button
                  className={css.button}
                  onClick={(e) => handleDelete(note.id, e)}
                  disabled={isDeleting}
                  title="Delete note"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
