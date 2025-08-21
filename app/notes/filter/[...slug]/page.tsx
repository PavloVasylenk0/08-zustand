import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";
import type { NoteTag } from "@/types/note";

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Валидация тега
const isValidTag = (tag: string | undefined): tag is NoteTag | undefined => {
  if (!tag) return true;
  const validTags: NoteTag[] = [
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Todo",
  ];
  return validTags.includes(tag as NoteTag);
};

export default async function NotesPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const searchParamsObj = await searchParams;

  const tag = slug?.[0] === "All" ? undefined : slug?.[0];
  const search =
    typeof searchParamsObj.search === "string" ? searchParamsObj.search : "";
  const page =
    typeof searchParamsObj.page === "string"
      ? parseInt(searchParamsObj.page)
      : 1;

  if (!isValidTag(tag)) {
    notFound();
  }

  try {
    const initialData = await fetchNotes({
      page,
      perPage: 12,
      search,
      tag: tag as NoteTag | undefined,
    });

    return (
      <NotesClient initialData={initialData} tag={tag as NoteTag | undefined} />
    );
  } catch (error) {
    console.error("Error fetching notes:", error);
    notFound();
  }
}
