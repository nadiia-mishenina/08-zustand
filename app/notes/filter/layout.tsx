import css from './LayoutNotes.module.css'

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

const LayoutNotes = ({ children, sidebar }: Props) => {

    return (
        <div className={css.container}>
            <div className={css.sidebar}>{sidebar}</div>
            <div className={css.notesWrapper}>{children}</div>

        </div>
    )
}

export default LayoutNotes
