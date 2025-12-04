import { Outlet, NavLink } from "react-router-dom";

import styles from './Layout.module.scss';

const Layout = () => {

    return (
        <div className={styles.Layout}>
            <header className={styles.Layout__header}>
                <nav>
                    <ul className={styles.Layout__ul}>
                        <li><NavLink to="/" className={styles.link}>Home</NavLink></li>
                        <li><NavLink to="/to-do" className={styles.link}>To-Do</NavLink></li>
                        <li><NavLink to="/about" className={styles.link}>About</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main className={styles.Layout__main}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;