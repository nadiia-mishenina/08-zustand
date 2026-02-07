import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};


export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0] ?? "All";
  const isAll = tag === "All";

  return {
    title: isAll
      ? "NoteHub — All notes"
      : `NoteHub — ${tag} notes`,
    description: isAll
      ? "Browse all notes in NoteHub."
      : `Browse notes tagged with "${tag}" in NoteHub.`,
  };
}


const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;

  const queryClient = new QueryClient();
  const currentPage = 1;
  const searchQuery = "";

  const tagName = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, searchQuery, tagName],
    queryFn: () => fetchNotes(currentPage, searchQuery, tagName),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagName} />
    </HydrationBoundary>
  );
};

export default NotesByTag;
