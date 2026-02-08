import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `NoteHub — ${note.title}`;
    const description = note.content
      ? note.content.slice(0, 140)
      : `Details for note "${note.title}"`;

    const url = `/notes/${encodeURIComponent(id)}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  } catch {
    const title = "NoteHub — Note not found";
    const description = "The requested note does not exist.";
    const url = `/notes/${encodeURIComponent(id)}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
