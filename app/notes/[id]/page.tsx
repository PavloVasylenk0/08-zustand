import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Note } from "@/types/note";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    return {
      title: note.title || "Note Details",
      description: note.content.substring(0, 160),
    };
  } catch {
    return {
      title: "Note not found",
      description: "The requested note does not exist.",
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });

    const note = queryClient.getQueryData<Note>(["note", id]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} initialNote={note || null} />
      </HydrationBoundary>
    );
  } catch {
    notFound();
  }
}
