"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose} showCloseButton={false}>
      {" "}
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>

          <div className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
            <br />
            Last updated: {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>
    </Modal>
  );
}
