"use client";

import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, 
    refetchOnMount: false,
  });

  const handleClosePreview = () => {
    router.back();
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  const formattedData = data.updatedAt
    ? `Updated at: ${data.updatedAt}`
    : `Created at: ${data.createdAt}`;

  return (
    <Modal onClose={handleClosePreview}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{formattedData}</p>
        </div>

        <button type="button" className={css.button} onClick={handleClosePreview}>
          Close
        </button>
      </div>
    </Modal>
  );
}
