'use client'
import Link from 'next/link';
import css from './TagsMenu.module.css'
import { useState } from 'react';
import { tagNames } from '@/lib/tags';

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}>
                Notes ▾
            </button>
            {isOpen && <ul className={css.menuList}>
                {tagNames.map((tag) => <li className={css.menuItem} key={tag} >
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                        {tag}
                    </Link>
                </li>)}

            </ul>}

        </div>

    )
}

export default TagsMenu