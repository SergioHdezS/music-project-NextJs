import React from 'react'
import { MdOutlineShortText } from "react-icons/md";
import styles from '../styles/search.module.css';

function Search({search, setSearch}) {
    return (
        <div className={styles.searchBar}>
            {/* <div className={styles.searchIcon}/> */}
            <input 
                type='text' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className={styles.searchBarInput} 
                placeholder="Search..." 
            />
        </div>
    )
}

export default Search