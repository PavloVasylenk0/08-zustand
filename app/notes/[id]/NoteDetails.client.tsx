"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";

interface NoteDetailsClientProps {
  id: string;
  initialNote?: Note | null;
}

export default function NoteDetailsClient({
  id,
  initialNote = null,
}: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => {
      if (!id) throw new Error("Note ID is required");
      return fetchNoteById(id);
    },
    initialData: initialNote ?? undefined,
    staleTime: 60 * 1000,
    retry: 2,
  });

  if (!id) {
    return <div className={css.error}>Invalid note ID</div>;
  }

  if (isLoading) {
    return <div className={css.loading}>Loading note details...</div>;
  }

  if (isError) {
    return (
      <div className={css.error}>
        Failed to load note: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (!note) {
    return <div className={css.error}>Note not found</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <p className={css.date}>
            Last updated: {new Date(note.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
