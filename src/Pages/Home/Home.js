import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    const navigate = useNavigate();

    return (
        <main>
            <section className={styles.hero}>
                <div className={styles.hero__container}>
                    <h1 className={styles.hero__h1}>Stay Organized. Stay Productive.</h1>
                    <p className={styles.hero__p}>Simple and fast To-Do manager built with React.</p>
                    <button onClick={() => navigate("/login")} className={styles.button}>Get Started</button>
                </div>
            </section>
            <section className={styles.features}>
                <ul className={styles.features__list}>
                    <li className={styles.features__item}>
                        <article className={styles.features__article}>
                            <h2 className={styles.features_article__title}>Create tasks easily</h2>
                            <p className={styles.features_article__text}>Add new tasks in seconds.</p>
                            <p className={styles.features_article__text}>Type, click, done — the fastest way to capture what matters.</p>
                        </article>
                    </li>
                    <li className={styles.features__item}>
                        <article className={styles.features__article}>
                            <h2 className={styles.features_article__title}>Track your progress</h2>
                            <p className={styles.features_article__text}>Stay on top of your productivity.</p>
                            <p className={styles.features_article__text}>Mark tasks as completed, revisit finished ones, and watch your goals come to life.</p>
                        </article>
                    </li>
                    <li className={styles.features__item}>
                        <article className={styles.features__article}>
                            <h2 className={styles.features_article__title}>Clean and intuitive UI</h2>
                            <p className={styles.features_article__text}>A simple, distraction-free interface.</p>
                            <p className={styles.features_article__text}>Filter, search, and manage your tasks with zero friction.</p>
                        </article>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default Home;