import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, replace, useNavigate } from "react-router-dom";
import { getUsers } from "../../RequestFunctions/UsersRequestFunctions";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";

import styles from './Login.module.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: users, isFetched } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onLogin = (event, email, password) => {
        event.preventDefault();
        const user = users.filter(user => user.email.toLowerCase() === email.toLowerCase())[0];
        if (!user || user.password !== password) {
            setAuthError(true);
            return;
        }
        dispatch(login());
        setEmail("");
        setPassword("");
        navigate("/to-do", replace);
    }

    return (
        <div className={styles.Login}>
            <h1>Log into your account</h1>
            <div className={styles.Login__form_container}>
                {isFetched ?
                    <form className={styles.Login__form} onSubmit={(event) => onLogin(event, email, password)}>
                        <label className={styles.label} htmlFor="login_email">Email</label>
                        <input className={styles.input} onChange={(event) => onEmailChange(event)} type="email" name="login_email" id="login_email" placeholder="example@example.com" value={email} />
                        <label className={styles.label} htmlFor="login_password">Password</label>
                        <input className={styles.input} onChange={(event) => onPasswordChange(event)} type="password" name="login_password" id="login_password" placeholder="Your password" value={password} />
                        <button className={styles.button} type="submit">Login</button>
                    </form> :
                    <p>Loading...</p>
                }
                {authError ? <p>Wrong email or password</p> : <></>}
                <NavLink className={styles.Register__link} to="/register">Don't have an account? Sign up here!</NavLink>
            </div>
        </div>
    );
}

export default Login;