import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, postUsers } from "../../RequestFunctions/UsersRequestFunctions";
import { useDispatch } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import { NavLink } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import styles from './Register.module.scss';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: users, isFetched } = useQuery({
        queryKey: ["auth"],
        queryFn: getUsers
    });

    const { mutateAsync } = useMutation({
        mutationFn: (payload) => postUsers(payload)
    })

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onRegister = async (event, email, password) => {
        event.preventDefault();
        const user = users.filter(user => user.email.toLowerCase() === email.toLowerCase())
        if (user) {
            setRegisterError(true);
            return;
        }
        try {
            await mutateAsync({ email, password });
            setEmail("");
            setPassword("");
            dispatch(login());
            navigate("/to-do", replace);
        } catch (error) {
            return <p>Unexpected error: {error.message}</p>;
        }
    }

    return (
        <div className={styles.Register}>
            <h1>Create your account</h1>
            <div className={styles.Register__form_container}>
                {isFetched ?
                    <form className={styles.Register__form} onSubmit={(event) => onRegister(event, email, password)}>
                        <label className={styles.label} htmlFor="register_email">Email</label>
                        <input className={styles.input} onChange={(event) => onEmailChange(event)} name="register_email" id="register_email" type="email" placeholder="example@example.com" />
                        <label className={styles.label} htmlFor="register_password">Password</label>
                        <input className={styles.input} onChange={(event) => onPasswordChange(event)} name="register_password" id="register_password" type="password" placeholder="Your password" />
                        <button className={styles.button} type="submit">Sign up</button>
                    </form> : <ThreeDots color="gray" />
                }
                {registerError ? <><p>User already exists, please sign in </p> <NavLink to="/login">here</NavLink></> :
                    <></>
                }
            </div>
        </div>
    )
}

export default Register;