import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { tagNames } from '@/lib/tags';

const SidebarNotes = () => {

    return (
        <ul className={css.menuList}>
            {tagNames.map((tag) => <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                    {tag}
                </Link>
            </li>)}

        </ul>

    )
}

export default SidebarNotes