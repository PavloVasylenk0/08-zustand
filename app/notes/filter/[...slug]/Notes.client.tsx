"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import css from "./Notes.module.css";

const PER_PAGE = 12;

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: NoteTag;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
        tag,
      }),
    placeholderData:
      page === 1 && debouncedSearch === "" && !tag ? initialData : undefined,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            pageCount={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <div className={css.notesListContainer}>
        {isLoading && <div className={css.loading}>Loading notes...</div>}
        {isError && (
          <div className={css.error}>
            Failed to load notes
            <button
              onClick={() => window.location.reload()}
              className={css.retry}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {data?.notes?.length ? (
              <NoteList notes={data.notes} />
            ) : (
              <div className={css.empty}>No notes found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
