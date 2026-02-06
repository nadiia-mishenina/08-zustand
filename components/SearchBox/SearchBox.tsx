'use client'

import css from './SearchBox.module.css';

interface SearchBoxProps {
    searchValue: string;
    onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ searchValue, onSearch }: SearchBoxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value)
    }

    return (
        <input value={searchValue} onChange={handleChange}
            className={css.input}
            type="text"
            placeholder="Search notes"
        />

    )
}