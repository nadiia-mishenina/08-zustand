'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import type { Note } from '../../types/note'
import css from './NoteList.module.css'
import { deleteNote } from '@/lib/api';

interface NoteListProps {
    notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (noteId: string) => deleteNote(noteId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['notes'],
            })
        }
    })

    const handleDeleteClick = (id: string) => {
        mutation.mutate(id)
    }

    return (
        <ul className={css.list}>
            {notes.map((note) => {
                const { id, title, content, tag } = note;
                return (
                    <li className={css.listItem} key={id}>
                        <h2 className={css.title}>{title}</h2>
                        <p className={css.content}>{content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{tag}</span>
                            <Link href={`/notes/${id}`}>View details </Link>
                            <button onClick={() => handleDeleteClick(id)} type='button' className={css.button}>Delete</button>
                        </div>
                    </li>
                )
            })}

        </ul>

    )
}