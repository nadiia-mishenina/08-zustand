import { Metadata } from 'next';
import css from './page.module.css';


export const metadata: Metadata = {
    title: "404 - Page Not Found | NoteHub",
    description: "The page you are looking for does not exist on NoteHub. Return to the homepage to continue exploring your notes.",
    openGraph: {
        title: '404 - Page Not Found | NoteHub',
        description: 'The page you are looking for does not exist on NoteHub.',
        url: '/404',
        siteName: '404 - Page Not Found | NoteHub',
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Page NoteHub not-found",

            }
        ]
    }


}

const NotFound = () => {

    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.notfound}>Sorry, the page you are looking for does not exist.</p >
        </>
    )
}

export default NotFound
