"use server";

import { createNote } from "@/lib/api";
import type { NewNote } from "@/types/note";

export async function createNoteAction(data: NewNote) {
  await createNote(data);
}
