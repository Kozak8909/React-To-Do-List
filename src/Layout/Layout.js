import { Outlet, NavLink, Link, useNavigate, replace } from "react-router-dom";

import styles from './Layout.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { authSelector } from "../redux/auth/authSelector";

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(authSelector);

    const onLogout = () => {
        dispatch(logout());
        navigate("/login", replace);
    }

    return (
        <div className={styles.Layout}>
            <header className={styles.Layout__header}>
                <nav>
                    <ul className={styles.Layout__ul}>
                        <li><NavLink to="/" className={styles.link}>Home</NavLink></li>
                        {isAuthenticated ?
                            <>
                                <li><NavLink to="/to-do" className={styles.link}>To-Do</NavLink></li>
                                <li><NavLink to="/about" className={styles.link}>About</NavLink></li>
                                <li><Link onClick={onLogout} className={styles.link}>Logout</Link></li>
                            </> :
                            <li><NavLink to="/login" className={styles.link}>Login</NavLink></li>
                        }
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}

export default Layout;