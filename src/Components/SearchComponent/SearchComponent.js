import styles from "./SearchComponent.module.scss";

const SearchComponent = ({ filter, setFilter, taskNameFilter, setTaskNameFilter }) => {
    const selectOptions = [
        { id: 1, value: "All" },
        { id: 2, value: "Done" },
        { id: 3, value: "In progress" }
    ]

    const onChangeFilterHandler = (event) => {
        const value = event.target.value;
        setFilter(value);
    }

    const onChangeSearchHandler = (event) => {
        const value = event.target.value;
        setTaskNameFilter(value);
    }

    return (
        <div className={styles.SearchBlock}>
            <label className={styles.SearchBlock__label} htmlFor="input-search">
                Search:
            </label>
            <input className={styles.input} name="input-search" id="input-search" type="text" placeholder="Task name" value={taskNameFilter} onChange={onChangeSearchHandler} />
            <label className={styles.SearchBlock__label} htmlFor="filter-select">
                Filter:
            </label>
            <select className={styles.select} name="filter-select" id="filter-select" value={filter} onChange={onChangeFilterHandler}>
                {selectOptions.map(option => <option key={option.id}>{option.value}</option>)}
            </select>
        </div>
    );
}

export default SearchComponent;