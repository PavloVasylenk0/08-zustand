"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNote } from '@/lib/api';
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { draft, setDraft, clearDraft } = useNoteStore();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      setError(
        error instanceof Error ? error.message : "Failed to create note"
      );
    },
  });

  useEffect(() => {
  }, []);

  const handleInputChange = (field: keyof typeof draft, value: string) => {
    setDraft({ [field]: value });
  };

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    const noteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    createMutation.mutate(noteData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      {error && <div className={css.error}>{error}</div>}

      <div className={css.formGroup}>
        <label htmlFor="title" className={css.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className={css.input}
          required
          disabled={createMutation.isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content" className={css.label}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          className={css.textarea}
          rows={6}
          required
          disabled={createMutation.isPending}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => handleInputChange("tag", e.target.value as NoteTag)}
          className={css.select}
          disabled={createMutation.isPending}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
          disabled={createMutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Creating..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
