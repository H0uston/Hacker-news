import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
    return (
        <header className={styles.headerComponent}>
            Hacker News
        </header>
    )
};

export default Header;