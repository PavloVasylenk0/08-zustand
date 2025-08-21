import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  if (!isValidTag(tag)) {
    return {
      title: "Invalid Filter | NoteHub",
      description: "The requested filter is not valid.",
    };
  }

  const title = tag
    ? `Notes filtered by ${tag} | NoteHub`
    : "All Notes | NoteHub";
  const description = tag
    ? `Browse notes filtered by ${tag} tag`
    : "Browse all your notes";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag || "All"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

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

    return <NotesClient initialData={initialData} tag={tag} />;
  } catch {
    notFound();
  }
}
