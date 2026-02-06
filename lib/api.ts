import axios from "axios";
import type { NewNote, Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";


if (myKey) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Params = {
    page,
    perPage: 10,
    search,
    ...(tag ? { tag } : {}),
  };

  const response = await axios.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${noteId}`);
  return res.data;
};
