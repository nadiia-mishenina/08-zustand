import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
    title: "Create Note – NoteHub",
    description: "Create a new note quickly and easily in the NoteHub.",
    openGraph: {
        title: "Create Note – NoteHub",
        description: "Page for creating a new note in the NoteHub.",
        url: 'https://notehub.com/notes/action/create',
        siteName: 'NoteHub',
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub",
                type: 'website',
            }
        ]
    }
}


const CreateNote = () => {



    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>

    )
}

export default CreateNote;