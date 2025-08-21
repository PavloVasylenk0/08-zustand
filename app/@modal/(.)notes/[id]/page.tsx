import NotePreviewClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return <NotePreviewClient note={note} />;
  } catch {
    notFound();
  }
}
