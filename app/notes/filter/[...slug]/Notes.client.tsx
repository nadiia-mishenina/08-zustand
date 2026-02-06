"use client";

import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import css from "./page.module.css";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  tag?: string;
};

const NotesClient = ({ tag }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch, tag],
    queryFn: () => fetchNotes(currentPage, debouncedSearch, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (isSuccess && data?.notes?.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchValue={searchQuery} onSearch={setSearchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            onChange={setCurrentPage}
            total_page={totalPages}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      <Toaster />

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
